import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export type SheetSnap = 'peek' | 'half' | 'full';

interface MapSheetProps {
  isDesktop: boolean;
  snap: SheetSnap;
  onSnapChange: (snap: SheetSnap) => void;
  containerHeight: number;
  topInset: number;
  header: React.ReactNode;
  children: React.ReactNode;
  /** Height of map covered by the sheet, so the map can keep routes in view. */
  onCoverChange: (px: number) => void;
  scrollRef: React.RefObject<HTMLDivElement>;
}

const ORDER: SheetSnap[] = ['peek', 'half', 'full'];

/** Bottom sheet on phones (drag or tap the handle), side panel on desktop. */
export const MapSheet: React.FC<MapSheetProps> = ({
  isDesktop, snap, onSnapChange, containerHeight, topInset, header, children, onCoverChange, scrollRef,
}) => {
  const { tr } = useLanguage();
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(160);
  const [dragHeight, setDragHeight] = useState<number | null>(null);
  const drag = useRef<{ y: number; h: number; moved: boolean } | null>(null);

  useLayoutEffect(() => {
    if (!headerRef.current) return;
    const ro = new ResizeObserver(([entry]) => setHeaderHeight(Math.ceil(entry.target.getBoundingClientRect().height)));
    ro.observe(headerRef.current);
    return () => ro.disconnect();
  }, []);

  const full = Math.max(240, containerHeight - topInset - 8);
  const peek = Math.min(headerHeight + 22, full);
  const half = Math.min(Math.max(Math.round(containerHeight * 0.5), peek + 60), full);
  const heights: Record<SheetSnap, number> = { peek, half, full };
  const height = dragHeight ?? heights[snap];

  useEffect(() => {
    if (!isDesktop) onCoverChange(heights[snap]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop, snap, peek, half, full]);

  if (isDesktop) {
    return (
      <aside className="relative w-[26rem] shrink-0 h-full bg-white border-l border-slate-200 flex flex-col">
        <div ref={headerRef} className="shrink-0 border-b border-slate-100">{header}</div>
        <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain">{children}</div>
      </aside>
    );
  }

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { y: e.clientY, h: height, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dy = e.clientY - d.y;
    if (!d.moved && Math.abs(dy) < 8) return;
    if (!d.moved) (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    d.moved = true;
    setDragHeight(Math.min(Math.max(d.h - dy, peek - 20), full));
  };
  const onPointerUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved || dragHeight === null) return;
    const nearest = ORDER.reduce((best, s) => (Math.abs(heights[s] - dragHeight) < Math.abs(heights[best] - dragHeight) ? s : best), snap);
    setDragHeight(null);
    onSnapChange(nearest);
  };

  const cycle = () => onSnapChange(ORDER[(ORDER.indexOf(snap) + 1) % ORDER.length]);

  return (
    <section
      className="absolute inset-x-0 bottom-0 z-20 bg-white rounded-t-3xl shadow-[0_-10px_30px_rgba(15,23,42,0.18)] flex flex-col"
      style={{ height, transition: dragHeight === null ? 'height 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none' }}
      aria-label={tr('Detalles de la ruta', 'Route details')}
    >
      <div
        className="shrink-0 touch-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <button
          type="button"
          onClick={cycle}
          className="w-full flex justify-center pt-2 pb-1.5"
          aria-label={snap === 'full' ? tr('Mostrar más mapa', 'Show more map') : tr('Mostrar más detalles', 'Show more details')}
        >
          <span className="block w-12 h-1.5 rounded-full bg-slate-300" />
        </button>
        <div ref={headerRef}>{header}</div>
      </div>
      <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto overscroll-contain border-t border-slate-100">
        {children}
      </div>
    </section>
  );
};
