import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Bounds, LngLat } from './mapModel';

const STYLE_URL = 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json';
const GUATEMALA_CENTER: LngLat = [-90.3, 14.8];
const FAR_ZOOM = 9.3; // below this, small stops shrink and lose their labels

export interface DrawnLeg {
  key: string;
  coords: LngLat[];
  color: string;
  mode: 'drive' | 'boat';
  ghost?: boolean;
}

export type MarkerVariant = 'home' | 'airport' | 'stay' | 'visit' | 'border';

export interface MarkerSpec {
  id: string;
  coordinates: LngLat;
  variant: MarkerVariant;
  color: string;
  order: number | null;
  label: string;
  emoji: string;
  photo?: string;
  nights?: number;
  labelSide?: 'below' | 'left';
}

export interface Padding { top: number; bottom: number; left: number; right: number }

export interface RouteMapHandle {
  fitBounds: (bounds: Bounds, duration?: number) => void;
  flyTo: (center: LngLat, zoom?: number) => void;
  setVehicle: (position: LngLat | null, emoji?: string) => void;
}

interface RouteMapProps {
  legs: DrawnLeg[];
  highlightKeys: string[];
  markers: MarkerSpec[];
  selectedMarkerId: string | null;
  padding: Padding;
  onMarkerClick: (id: string) => void;
  onLegClick?: (key: string) => void;
  onReady?: () => void;
  ariaLabel: string;
}

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Never let the covered area leave less than ~120px of map to frame things in. */
const clampPadding = (p: Padding, height: number): Padding => {
  const room = Math.max(0, height - 120);
  const vertical = p.top + p.bottom;
  if (vertical <= room) return p;
  const k = room / vertical;
  return { ...p, top: Math.floor(p.top * k), bottom: Math.floor(p.bottom * k) };
};

/** White chevron drawn once and placed along route lines to show direction. */
const arrowImage = () => {
  const size = 32;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(11, 8);
  ctx.lineTo(21, 16);
  ctx.lineTo(11, 24);
  ctx.stroke();
  return ctx.getImageData(0, 0, size, size);
};

const legsGeoJSON = (legs: DrawnLeg[]): GeoJSON.FeatureCollection<GeoJSON.LineString> => ({
  type: 'FeatureCollection',
  features: legs.map(l => ({
    type: 'Feature',
    properties: { key: l.key, color: l.color, mode: l.mode, ghost: !!l.ghost },
    geometry: { type: 'LineString', coordinates: l.coords },
  })),
});

const markerElement = (spec: MarkerSpec, onClick: () => void) => {
  const el = document.createElement('button');
  el.type = 'button';
  el.className = `rm-marker rm-${spec.variant}${spec.labelSide === 'left' ? ' rm-label-left' : ''}`;
  el.style.setProperty('--c', spec.color);
  el.setAttribute('aria-label', spec.order ? `${spec.order}. ${spec.label}` : spec.label);

  // Pin, number and nights share a box the size of the pin, so badges stay put
  // even when the label underneath is wider.
  const head = document.createElement('span');
  head.className = 'rm-head';
  const pin = document.createElement('span');
  pin.className = 'rm-pin';
  if (spec.photo) {
    const img = document.createElement('img');
    img.src = spec.photo;
    img.alt = '';
    img.loading = 'lazy';
    img.onerror = () => { pin.textContent = spec.emoji; };
    pin.appendChild(img);
  } else {
    pin.textContent = spec.emoji;
  }
  head.appendChild(pin);

  if (spec.order) {
    const badge = document.createElement('span');
    badge.className = 'rm-badge';
    badge.textContent = String(spec.order);
    head.appendChild(badge);
  }
  if (spec.nights) {
    const nights = document.createElement('span');
    nights.className = 'rm-nights';
    nights.textContent = `🛏 ${spec.nights}`;
    head.appendChild(nights);
  }
  el.appendChild(head);

  const label = document.createElement('span');
  label.className = 'rm-label';
  label.textContent = spec.label;
  el.appendChild(label);

  el.addEventListener('click', e => {
    e.stopPropagation();
    onClick();
  });
  return el;
};

export const RouteMap = forwardRef<RouteMapHandle, RouteMapProps>(function RouteMap(
  { legs, highlightKeys, markers, selectedMarkerId, padding, onMarkerClick, onLegClick, onReady, ariaLabel },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<Map<string, maplibregl.Marker>>(new Map());
  const vehicleRef = useRef<maplibregl.Marker | null>(null);
  const paddingRef = useRef(padding);
  const callbacks = useRef({ onMarkerClick, onLegClick, onReady });
  const [loaded, setLoaded] = useState(false);
  paddingRef.current = padding;
  callbacks.current = { onMarkerClick, onLegClick, onReady };

  useEffect(() => {
    if (!containerRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE_URL,
      center: GUATEMALA_CENTER,
      zoom: 6.6,
      attributionControl: false,
      dragRotate: false,
      pitchWithRotate: false,
    });
    map.touchZoomRotate.disableRotation();
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-left');
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.addControl(new maplibregl.GeolocateControl({ positionOptions: { enableHighAccuracy: true }, trackUserLocation: true }), 'top-right');

    const updateZoomClass = () => containerRef.current?.classList.toggle('rm-far', map.getZoom() < FAR_ZOOM);
    map.on('zoom', updateZoomClass);

    map.on('load', () => {
      map.addImage('route-arrow', arrowImage(), { pixelRatio: 2 });
      map.addSource('legs', { type: 'geojson', data: legsGeoJSON([]) });
      map.addSource('highlight', { type: 'geojson', data: legsGeoJSON([]) });
      const width = (far: number, near: number): maplibregl.ExpressionSpecification =>
        ['interpolate', ['linear'], ['zoom'], 6, far, 11, near];

      map.addLayer({ id: 'legs-ghost', type: 'line', source: 'legs', filter: ['==', ['get', 'ghost'], true],
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': ['get', 'color'], 'line-width': width(2.5, 4), 'line-opacity': 0.55 } });
      map.addLayer({ id: 'legs-casing', type: 'line', source: 'legs',
        filter: ['all', ['==', ['get', 'mode'], 'drive'], ['==', ['get', 'ghost'], false]],
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#ffffff', 'line-width': width(6, 11) } });
      map.addLayer({ id: 'highlight-glow', type: 'line', source: 'highlight',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#facc15', 'line-width': width(11, 18), 'line-opacity': 0.9, 'line-blur': 1 } });
      map.addLayer({ id: 'legs-line', type: 'line', source: 'legs',
        filter: ['all', ['==', ['get', 'mode'], 'drive'], ['==', ['get', 'ghost'], false]],
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': ['get', 'color'], 'line-width': width(3.5, 6.5) } });
      map.addLayer({ id: 'legs-boat', type: 'line', source: 'legs',
        filter: ['all', ['==', ['get', 'mode'], 'boat'], ['==', ['get', 'ghost'], false]],
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#0369a1', 'line-width': width(3, 5), 'line-dasharray': [1, 1.6] } });
      map.addLayer({ id: 'legs-arrows', type: 'symbol', source: 'legs',
        filter: ['all', ['==', ['get', 'mode'], 'drive'], ['==', ['get', 'ghost'], false]],
        layout: {
          'symbol-placement': 'line',
          'symbol-spacing': 90,
          'icon-image': 'route-arrow',
          'icon-size': ['interpolate', ['linear'], ['zoom'], 6, 0.55, 11, 0.9],
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
          'icon-rotation-alignment': 'map',
        } });

      const clickLeg = (e: maplibregl.MapLayerMouseEvent) => {
        const key = e.features?.[0]?.properties?.key;
        if (key) callbacks.current.onLegClick?.(key);
      };
      for (const id of ['legs-line', 'legs-boat']) {
        map.on('click', id, clickLeg);
        map.on('mouseenter', id, () => { map.getCanvas().style.cursor = 'pointer'; });
        map.on('mouseleave', id, () => { map.getCanvas().style.cursor = ''; });
      }

      // Compact attribution starts expanded; fold it to the (i) button so it
      // doesn't cover the route on small screens. Tapping (i) shows the credits.
      containerRef.current?.querySelector('.maplibregl-ctrl-attrib')?.classList.remove('maplibregl-compact-show');
      updateZoomClass();
      setLoaded(true);
      callbacks.current.onReady?.();
    });

    mapRef.current = map;

    // The container's height comes from layout math, not the window, so watch it directly.
    const resizeObserver = new ResizeObserver(() => map.resize());
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      setLoaded(false); // a re-created map must reload its sources before data effects run
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
      vehicleRef.current = null;
    };
  }, []);

  // Route lines
  useEffect(() => {
    const source = mapRef.current?.getSource('legs') as maplibregl.GeoJSONSource | undefined;
    if (loaded && source) source.setData(legsGeoJSON(legs));
  }, [loaded, legs]);

  useEffect(() => {
    const source = mapRef.current?.getSource('highlight') as maplibregl.GeoJSONSource | undefined;
    if (loaded && source) source.setData(legsGeoJSON(legs.filter(l => highlightKeys.includes(l.key))));
  }, [loaded, legs, highlightKeys]);

  // Stop markers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach(m => m.remove());
    markersRef.current.clear();
    for (const spec of markers) {
      const el = markerElement(spec, () => callbacks.current.onMarkerClick(spec.id));
      const marker = new maplibregl.Marker({ element: el, anchor: 'top', offset: [0, spec.variant === 'stay' ? -24 : spec.variant === 'home' ? -21 : -17] })
        .setLngLat(spec.coordinates)
        .addTo(map);
      markersRef.current.set(spec.id, marker);
    }
  }, [markers]);

  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const el = marker.getElement();
      const isSelected = id === selectedMarkerId;
      el.classList.toggle('rm-selected', isSelected);
      el.setAttribute('aria-pressed', String(isSelected));
    });
  }, [markers, selectedMarkerId]);

  useImperativeHandle(ref, () => ({
    fitBounds: (bounds, duration = 900) => {
      const map = mapRef.current;
      if (!map) return;
      // Padding is map state (MapLibre adds any padding passed here on top of it),
      // and setPadding jumps the camera, so it's only applied right before a move.
      map.setPadding(clampPadding(paddingRef.current, map.getCanvas().clientHeight));
      map.fitBounds(bounds, { padding: 16, maxZoom: 11, duration: reducedMotion() ? 0 : duration });
    },
    flyTo: (center, zoom = 11.5) => {
      const map = mapRef.current;
      if (!map) return;
      map.setPadding(clampPadding(paddingRef.current, map.getCanvas().clientHeight));
      map.flyTo({ center, zoom, duration: reducedMotion() ? 0 : 1200, essential: true });
    },
    setVehicle: (position, emoji = '🚗') => {
      const map = mapRef.current;
      if (!map) return;
      if (!position) {
        vehicleRef.current?.remove();
        vehicleRef.current = null;
        return;
      }
      if (!vehicleRef.current) {
        const el = document.createElement('div');
        el.className = 'rm-vehicle';
        el.setAttribute('aria-hidden', 'true');
        vehicleRef.current = new maplibregl.Marker({ element: el }).setLngLat(position).addTo(map);
      }
      vehicleRef.current.getElement().textContent = emoji;
      vehicleRef.current.setLngLat(position);
    },
  }), []);

  // Inline position: maplibre-gl.css sets `position: relative` on the container,
  // which would override a Tailwind `absolute` class and collapse the map to 0px.
  return <div ref={containerRef} style={{ position: 'absolute', inset: 0 }} role="region" aria-label={ariaLabel} />;
});
