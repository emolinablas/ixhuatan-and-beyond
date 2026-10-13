import React, { useState } from 'react';
import { Baby, CalendarDays, ExternalLink, Heart, Navigation, Plus, Trash2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTrip } from '../../context/TripContext';
import { DayPlan } from '../../types/trip';
import { MapPoint } from '../../data/routes';
import { googleMapsUrl, StopView, wazeUrl } from './mapModel';
import { ScoreDots } from '../ui/bits';

export interface StopContext {
  stop: StopView;
  scenarioLabel: string;
  itinerary: DayPlan[];
}

interface PlaceDetailProps {
  point: MapPoint;
  contexts: StopContext[];
  onOpenDay: (day: number) => void;
}

const dayRange = (days: number[]) => {
  const sorted = [...days].sort((a, b) => a - b);
  return sorted.length > 1 && sorted[sorted.length - 1] - sorted[0] === sorted.length - 1
    ? `${sorted[0]}–${sorted[sorted.length - 1]}`
    : sorted.join(', ');
};

export const PlaceDetail: React.FC<PlaceDetailProps> = ({ point, contexts, onOpenDay }) => {
  const { language, t, tr } = useLanguage();
  const { destinations, addPlaceToVisit, deletePlaceToVisit } = useTrip();
  const es = language === 'es';
  const destination = destinations.find(d => d.id === point.destinationId);
  const photo = point.photo ?? destination?.photo;
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newNote, setNewNote] = useState('');

  const savePlace = () => {
    if (!destination || !newName.trim()) return;
    addPlaceToVisit(destination.id, {
      id: `custom-p-${Date.now()}`,
      name: newName.trim(),
      nameEn: newName.trim(),
      description: newNote.trim() || tr('Idea agregada por la familia.', 'Idea added by the family.'),
      descriptionEn: newNote.trim() || 'Idea added by the family.',
    });
    setNewName('');
    setNewNote('');
    setAdding(false);
  };

  return (
    <article className="pb-6">
      <div className="relative h-48 bg-slate-800 overflow-hidden">
        {photo ? (
          <img src={photo.url} alt={es ? point.name : point.nameEn} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-7xl bg-gradient-to-br from-emerald-700 via-teal-700 to-sky-800" aria-hidden>
            {point.emoji}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h3 className="text-2xl font-black leading-tight drop-shadow">{point.emoji} {es ? point.name : point.nameEn}</h3>
          {destination && <p className="text-sm font-semibold text-slate-100">{es ? destination.region : destination.regionEn}</p>}
        </div>
        {photo && <span className="absolute top-2 right-2 max-w-[70%] truncate px-2 py-0.5 rounded-full bg-black/50 text-[0.625rem] text-white">📷 {photo.credit} · Wikimedia Commons</span>}
      </div>

      <div className="px-4 pt-3 space-y-4">
        {contexts.map(({ stop, scenarioLabel, itinerary }) => (
          <section key={scenarioLabel} className="rounded-2xl border-2 p-3 space-y-2" style={{ borderColor: `${stop.color}66` }}>
            <p className="text-xs font-extrabold uppercase tracking-wide" style={{ color: stop.color }}>{scenarioLabel}</p>
            <div className="flex flex-wrap gap-1.5 text-xs font-bold">
              {stop.role === 'stay' && stop.nights && (
                <span className="px-2 py-1 rounded-lg bg-slate-900 text-white">🛏 {stop.nights} {stop.nights === 1 ? tr('noche', 'night') : tr('noches', 'nights')}{stop.lodging ? ` · ${stop.lodging}` : ''}</span>
              )}
              {stop.role === 'visit' && <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-800">📍 {tr('Visita', 'Visit')}</span>}
              {stop.role === 'border' && <span className="px-2 py-1 rounded-lg bg-amber-100 text-amber-900">🛂 {tr('Cruce de frontera', 'Border crossing')}</span>}
              {stop.role === 'home' && <span className="px-2 py-1 rounded-lg bg-emerald-100 text-emerald-900">🏡 {tr('La casa de la familia', 'The family home')}</span>}
              <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-800">{tr('Días', 'Days')} {dayRange(stop.days)}</span>
            </div>
            {stop.note && <p className="text-sm font-semibold text-slate-800">{es ? stop.note[0] : stop.note[1]}</p>}
            {stop.role !== 'home' && (
              <ul className="space-y-1">
                {stop.days.map(day => {
                  const plan = itinerary.find(d => d.dayNumber === day);
                  if (!plan) return null;
                  return (
                    <li key={day}>
                      <button type="button" onClick={() => onOpenDay(day)} className="w-full text-left flex items-start gap-2 text-sm py-1 hover:underline">
                        <CalendarDays className="w-4 h-4 mt-0.5 text-slate-500 shrink-0" aria-hidden />
                        <span>
                          <span className="font-bold">{es ? plan.dateFormatted : plan.dateFormattedEn}:</span>{' '}
                          {es ? plan.title : plan.titleEn}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        ))}

        <p className="text-sm text-slate-800 leading-relaxed">
          {destination ? (es ? destination.description : destination.descriptionEn) : point.blurb ? (es ? point.blurb[0] : point.blurb[1]) : ''}
        </p>

        {destination && (
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-2.5">
              <p className="flex items-center gap-1 text-xs font-bold text-amber-900"><Baby className="w-4 h-4" aria-hidden /> {tr('Para Emily', 'For Emily')}</p>
              <ScoreDots score={destination.babyFriendlyScore} label={tr('Facilidad para la bebé', 'Ease for the baby')} />
            </div>
            <div className="rounded-2xl bg-teal-50 border border-teal-200 p-2.5">
              <p className="flex items-center gap-1 text-xs font-bold text-teal-900"><Heart className="w-4 h-4" aria-hidden /> {tr('Para abuelos', 'For seniors')}</p>
              <ScoreDots score={destination.seniorFriendlyScore} label={tr('Facilidad para abuelos', 'Ease for seniors')} />
            </div>
            <p className="col-span-2 text-xs font-semibold text-slate-700">🛣️ {t[destination.roadQuality]}</p>
          </div>
        )}

        {destination && destination.highlights.length > 0 && (
          <section>
            <h4 className="text-sm font-extrabold text-slate-900 mb-1.5">✨ {tr('Lo que van a ver', 'What you’ll see')}</h4>
            <ul className="flex flex-wrap gap-1.5">
              {(es ? destination.highlights : destination.highlightsEn).map(h => (
                <li key={h} className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-950">{h}</li>
              ))}
            </ul>
          </section>
        )}

        {destination && (
          <section className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-extrabold text-slate-900">📍 {tr('Lugares para visitar', 'Places to visit')}</h4>
              <button
                type="button"
                onClick={() => setAdding(v => !v)}
                className="inline-flex items-center gap-1 h-9 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold"
              >
                <Plus className="w-4 h-4" aria-hidden /> {tr('Agregar idea', 'Add idea')}
              </button>
            </div>
            {adding && (
              <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-3 space-y-2">
                <label className="block text-xs font-bold text-slate-800">
                  {tr('Nombre del lugar', 'Place name')}
                  <input value={newName} onChange={e => setNewName(e.target.value)} className="mt-1 w-full h-10 px-3 rounded-lg border border-slate-300 text-sm" />
                </label>
                <label className="block text-xs font-bold text-slate-800">
                  {tr('¿Por qué vale la pena? (opcional)', 'Why is it worth it? (optional)')}
                  <input value={newNote} onChange={e => setNewNote(e.target.value)} className="mt-1 w-full h-10 px-3 rounded-lg border border-slate-300 text-sm" />
                </label>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setAdding(false)} className="flex-1 h-10 rounded-lg border border-slate-300 text-sm font-bold">{tr('Cancelar', 'Cancel')}</button>
                  <button type="button" onClick={savePlace} disabled={!newName.trim()} className="flex-1 h-10 rounded-lg bg-emerald-700 text-white text-sm font-bold disabled:opacity-50">{tr('Guardar', 'Save')}</button>
                </div>
              </div>
            )}
            <ul className="space-y-2">
              {(destination.placesToVisit ?? []).map(place => (
                <li key={place.id} className="rounded-2xl bg-slate-50 border border-slate-200 p-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-bold text-slate-900">{es ? place.name : place.nameEn || place.name}</p>
                    <div className="flex gap-1 shrink-0">
                      {place.googleMapsUrl && (
                        <a href={place.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="h-8 w-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-emerald-800" aria-label={t.viewOnGoogleMaps}>
                          <ExternalLink className="w-4 h-4" aria-hidden />
                        </a>
                      )}
                      {place.id.startsWith('custom-') && (
                        <button type="button" onClick={() => deletePlaceToVisit(destination.id, place.id)} className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-rose-700 hover:bg-rose-50" aria-label={tr('Quitar idea', 'Remove idea')}>
                          <Trash2 className="w-4 h-4" aria-hidden />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 mt-0.5">{es ? place.description : place.descriptionEn || place.description}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {destination?.intermediateStops && destination.intermediateStops.length > 0 && (
          <section className="space-y-2">
            <h4 className="text-sm font-extrabold text-slate-900">🛣️ {tr('Paradas en el camino', 'Stops on the way')}</h4>
            <ul className="space-y-2">
              {destination.intermediateStops.map(stop => (
                <li key={stop.id} className="rounded-2xl bg-teal-50 border border-teal-200 p-3">
                  {stop.driveTimeBadge && <span className="text-[0.6875rem] font-bold px-2 py-0.5 rounded-md bg-white text-teal-900">{stop.driveTimeBadge}</span>}
                  <p className="text-sm font-bold text-slate-900 mt-1">{es ? stop.name : stop.nameEn || stop.name}</p>
                  <p className="text-sm text-slate-700">{es ? stop.description : stop.descriptionEn || stop.description}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="grid grid-cols-2 gap-2">
          <a href={googleMapsUrl(point.coordinates)} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 h-12 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold">
            <ExternalLink className="w-4 h-4" aria-hidden /> Google Maps
          </a>
          <a href={wazeUrl(point.coordinates)} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 h-12 rounded-xl bg-sky-800 hover:bg-sky-900 text-white text-sm font-bold">
            <Navigation className="w-4 h-4" aria-hidden /> Waze
          </a>
        </div>
      </div>
    </article>
  );
};
