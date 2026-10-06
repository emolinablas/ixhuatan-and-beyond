import React, { useState } from 'react';
import { Filter, MapPin, ExternalLink, Sun, Sunset, Moon, Bed, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTrip } from '../../context/TripContext';
import { ActivityBlock } from '../../types/trip';

interface TimelineViewProps {
  onSelectDestinationForMap?: (destId: string) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ onSelectDestinationForMap }) => {
  const { language, t } = useLanguage();
  const { state, setActiveDestinationId } = useTrip();

  const [filter, setFilter] = useState<'all' | 'milestones' | 'rest' | 'thanksgiving' | 'december' | 'beach'>('all');

  const filteredDays = state.days.filter(day => {
    if (filter === 'milestones') return day.isKeyMilestone;
    if (filter === 'rest') return day.isRestDay;
    if (filter === 'thanksgiving') return day.phase === 'thanksgiving';
    if (filter === 'december') return day.phase === 'december';
    if (filter === 'beach') return day.locationId === 'monterrico';
    return true;
  });

  const getTimeIcon = (timeOfDay: ActivityBlock['timeOfDay']) => {
    switch (timeOfDay) {
      case 'morning':
        return <Sun className="w-3.5 h-3.5 text-amber-500" />;
      case 'afternoon':
        return <Sunset className="w-3.5 h-3.5 text-orange-500" />;
      case 'evening':
        return <Moon className="w-3.5 h-3.5 text-indigo-400" />;
    }
  };

  const getTagBadge = (tag?: ActivityBlock['tag']) => {
    if (!tag) return null;
    const labels: Record<string, { es: string; en: string; color: string }> = {
      logistics: { es: 'Logística', en: 'Logistics', color: 'bg-blue-100 text-blue-800' },
      beach: { es: 'Playa & Mar', en: 'Beach & Sea', color: 'bg-cyan-100 text-cyan-800' },
      relaxation: { es: 'Descanso', en: 'Relaxation', color: 'bg-emerald-100 text-emerald-800' },
      adventure: { es: 'Aventura & Vistas', en: 'Adventure', color: 'bg-amber-100 text-amber-800' },
      thanksgiving: { es: 'Thanksgiving', en: 'Thanksgiving', color: 'bg-orange-100 text-orange-800' },
      food: { es: 'Gastronomía', en: 'Food & Coffee', color: 'bg-rose-100 text-rose-800' },
      family: { es: 'Familia', en: 'Family Time', color: 'bg-purple-100 text-purple-800' },
    };
    const info = labels[tag] || { es: tag, en: tag, color: 'bg-slate-100 text-slate-800' };
    return (
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${info.color}`}>
        {language === 'es' ? info.es : info.en}
      </span>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24 md:pb-12">
      
      {/* Header and Quick Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
            {t.tripDates} • 27 {language === 'es' ? 'Días' : 'Days'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            {t.navItinerary}
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {language === 'es'
              ? 'Cronograma completo desde la bienvenida en el aeropuerto hasta el retorno a EE.UU.'
              : 'Complete journey from airport arrival greeting to departure flight back home.'}
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-2">
          <div className="px-3.5 py-1.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
            🏡 11 {language === 'es' ? 'días de relax en casa' : 'home rest days'}
          </div>
          <div className="px-3.5 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800">
            🚗 16 {language === 'es' ? 'días de aventuras' : 'adventure days'}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1 mr-1" />
        
        {[
          { id: 'all', label: language === 'es' ? 'Todos los días (27)' : 'All days (27)' },
          { id: 'milestones', label: language === 'es' ? 'Hitos clave' : 'Key milestones' },
          { id: 'rest', label: language === 'es' ? 'Días de descanso en casa' : 'Home rest days' },
          { id: 'beach', label: language === 'es' ? 'Playa Pacífico (19-21 Nov)' : 'Pacific Beach (Nov 19-21)' },
          { id: 'thanksgiving', label: language === 'es' ? 'Gran Viaje Thanksgiving (25-30 Nov)' : 'Thanksgiving Trip (Nov 25-30)' },
          { id: 'december', label: language === 'es' ? 'Escapada Diciembre (3-7 Dic)' : 'December Getaway (Dec 3-7)' },
        ].map(btn => (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id as any)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === btn.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Days Timeline List */}
      <div className="space-y-6">
        {filteredDays.map(day => {
          const destObj = state.destinations.find(d => d.id === day.locationId);

          return (
            <div
              key={day.id}
              className={`relative bg-white rounded-3xl p-5 sm:p-7 border-2 transition-all shadow-sm hover:shadow-md ${
                day.isKeyMilestone
                  ? 'border-emerald-400/90 bg-gradient-to-r from-emerald-50/20 via-white to-white'
                  : 'border-slate-200/90'
              }`}
            >
              {/* Day Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center justify-center w-12 h-12 rounded-2xl bg-emerald-600 text-white font-black shadow-md shadow-emerald-600/20">
                    <span className="text-[10px] uppercase font-bold tracking-wider leading-none">
                      {language === 'es' ? 'Día' : 'Day'}
                    </span>
                    <span className="text-lg leading-none mt-0.5">{day.dayNumber}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {language === 'es' ? day.dateFormatted : day.dateFormattedEn}
                      </span>

                      {day.isRestDay && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-600">
                          🏡 {language === 'es' ? 'Descanso' : 'Rest Day'}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                      {language === 'es' ? day.title : day.titleEn}
                    </h3>
                  </div>
                </div>

                {/* Milestone Badge or Location */}
                <div className="flex items-center gap-2 self-start sm:self-center">
                  {day.milestoneBadge && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold bg-emerald-100 text-emerald-800 shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{language === 'es' ? day.milestoneBadge : day.milestoneBadgeEn}</span>
                    </span>
                  )}

                  {destObj && (
                    <button
                      onClick={() => {
                        setActiveDestinationId(destObj.id);
                        if (onSelectDestinationForMap) onSelectDestinationForMap(destObj.id);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 transition-colors"
                      title={language === 'es' ? 'Ver en mapa' : 'View on map'}
                    >
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="hidden sm:inline">{language === 'es' ? destObj.name : destObj.nameEn}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Activities in this Day */}
              <div className="mt-4 space-y-3">
                {day.activities.map(act => (
                  <div
                    key={act.id}
                    className="flex flex-col sm:flex-row sm:items-start gap-2.5 sm:gap-4 p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 text-xs sm:text-sm"
                  >
                    {/* Time / Period Icon */}
                    <div className="flex items-center gap-1.5 font-bold text-slate-600 shrink-0 w-24">
                      {getTimeIcon(act.timeOfDay)}
                      <span>{act.timeLabel || (language === 'es' ? t[act.timeOfDay] : t[act.timeOfDay])}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-900">
                          {language === 'es' ? act.title : act.titleEn}
                        </span>
                        {getTagBadge(act.tag)}
                      </div>

                      <p className="text-slate-600 text-xs leading-relaxed">
                        {language === 'es' ? act.description : act.descriptionEn}
                      </p>
                    </div>

                    {/* Google Maps Link if available */}
                    {act.googleMapsUrl && (
                      <a
                        href={act.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="self-start sm:self-center shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600/10 hover:bg-emerald-600 text-emerald-800 hover:text-white font-bold text-xs transition-colors"
                        title={t.viewOnGoogleMaps}
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span className="hidden sm:inline">Maps</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Lodging Footnote if available */}
              {day.lodgingName && (
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <Bed className="w-4 h-4 text-emerald-600" />
                  <span>
                    {language === 'es' ? 'Hospedaje:' : 'Lodging:'} {day.lodgingName}
                  </span>
                  {day.lodgingUrl && (
                    <a
                      href={day.lodgingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 underline font-bold ml-1 hover:text-emerald-700"
                    >
                      {t.viewLodging}
                    </a>
                  )}
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
