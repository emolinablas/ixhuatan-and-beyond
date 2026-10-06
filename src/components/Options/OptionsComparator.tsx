import React from 'react';
import { ThumbsUp, Check, Baby, Heart, ShieldCheck, AlertCircle, Sparkles, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTrip } from '../../context/TripContext';
import { TripOption } from '../../types/trip';

interface OptionsComparatorProps {
  onSelectDestinationForMap?: (destId: string) => void;
}

export const OptionsComparator: React.FC<OptionsComparatorProps> = ({ onSelectDestinationForMap }) => {
  const { language, t } = useLanguage();
  const { state, voteForOption, setActiveDestinationId } = useTrip();

  const thanksgivingOptions = state.options.filter(o => o.phase === 'thanksgiving');
  const decemberOptions = state.options.filter(o => o.phase === 'december');

  const renderOptionCard = (option: TripOption) => {
    const isVoted = !!state.userVotes[option.id];

    return (
      <div
        key={option.id}
        className={`relative flex flex-col bg-white rounded-3xl p-6 sm:p-7 border-2 transition-all duration-300 shadow-sm hover:shadow-xl ${
          isVoted
            ? 'border-emerald-500 ring-4 ring-emerald-100'
            : option.isRecommendedForFamily
            ? 'border-emerald-300/80 bg-gradient-to-b from-emerald-50/20 to-white'
            : 'border-slate-200'
        }`}
      >
        {/* Recommended Badge */}
        {option.isRecommendedForFamily && (
          <div className="absolute -top-3.5 left-6 bg-emerald-600 text-white text-[11px] font-extrabold uppercase tracking-wider py-1 px-3.5 rounded-full shadow-md flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>{t.recommended}</span>
          </div>
        )}

        {/* Title & Tagline */}
        <div className="mt-1 mb-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-lg">
              📅 {language === 'es' ? option.dateRange : option.dateRangeEn}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {option.durationDays} {language === 'es' ? 'días' : 'days'}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-2 leading-tight">
            {language === 'es' ? option.title : option.titleEn}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            {language === 'es' ? option.tagline : option.taglineEn}
          </p>
        </div>

        {/* Drive & Road Comfort */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs mb-4 space-y-1">
          <div className="font-bold text-slate-800 flex items-center gap-1.5">
            <span>🚗</span>
            <span>{language === 'es' ? 'Trayecto en carretera:' : 'Driving route:'}</span>
          </div>
          <p className="text-slate-600">
            {language === 'es' ? option.driveSummary : option.driveSummaryEn}
          </p>
        </div>

        {/* Baby & Senior Advice Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {/* Baby Emily */}
          <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <Baby className="w-4 h-4 text-amber-600" />
              <span>{t.babyNotesTitle}</span>
            </div>
            <p className="text-amber-800/90 text-[11px] leading-relaxed">
              {language === 'es' ? option.babyNotes : option.babyNotesEn}
            </p>
          </div>

          {/* Seniors (60s & 70s) */}
          <div className="p-3 rounded-2xl bg-teal-50/70 border border-teal-200/70 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-teal-900">
              <Heart className="w-4 h-4 text-teal-600" />
              <span>{t.seniorNotesTitle}</span>
            </div>
            <p className="text-teal-800/90 text-[11px] leading-relaxed">
              {language === 'es' ? option.seniorNotes : option.seniorNotesEn}
            </p>
          </div>
        </div>

        {/* Pros & Considerations */}
        <div className="space-y-3 mb-6 flex-1">
          <div>
            <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.pros}</span>
            </h4>
            <ul className="space-y-1.5">
              {(language === 'es' ? option.pros : option.prosEn).map((pro, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.considerations}</span>
            </h4>
            <ul className="space-y-1.5">
              {(language === 'es' ? option.considerations : option.considerationsEn).map((con, idx) => (
                <li key={idx} className="text-xs text-slate-500 flex items-start gap-2">
                  <span className="text-slate-400 font-bold">•</span>
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Key Destinations Pill Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-slate-100">
          {option.destinations.map(destId => {
            const destObj = state.destinations.find(d => d.id === destId);
            if (!destObj) return null;
            return (
              <button
                key={destId}
                onClick={() => {
                  setActiveDestinationId(destId);
                  if (onSelectDestinationForMap) onSelectDestinationForMap(destId);
                }}
                className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 transition-colors"
                title={language === 'es' ? 'Ver en mapa' : 'View on map'}
              >
                <MapPin className="w-3 h-3 text-emerald-600" />
                <span>{language === 'es' ? destObj.name : destObj.nameEn}</span>
              </button>
            );
          })}
        </div>

        {/* Voting Action Button */}
        <div className="pt-2">
          <button
            onClick={() => voteForOption(option.id)}
            className={`w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl font-bold text-sm transition-all shadow-md active:scale-95 ${
              isVoted
                ? 'bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-500'
                : 'bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 border border-slate-200'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${isVoted ? 'fill-white' : ''}`} />
            <span>
              {isVoted ? t.voted : t.voteOption} ({option.votes} {t.votes})
            </span>
          </button>
        </div>

      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-24 md:pb-12">
      
      {/* Bruce's Quote Highlight Card */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
            🇺🇸 {language === 'es' ? 'Mensaje especial de Bruce & Norma' : 'Special note from Bruce & Norma'}
          </span>
          <p className="text-base sm:text-lg italic font-medium text-slate-100 leading-relaxed">
            "{language === 'es' 
              ? 'El viaje a Río Dulce con tu familia extendida nos parece genial. ¡A tu familia le encantará! Y El Salvador también está bien... Sobre Atitlán vs. Semuc: nos inclinamos un poco por Atitlán porque no es un viaje tan largo y podría ser más fácil para Cori y la bebé Emily. Es como intentar decidir entre tus dos helados favoritos... imposible. Así que decídelo tú también.' 
              : 'The trip to Rio Dulce with your extended family is fine with us. Your family would love this trip! And El Salvador is also fine... On Coban/Semuc vs Lago de Atitlán: we lean a bit toward Atitlán because it is not as long of a drive and it might be easier for Cori and Emily. It\'s like trying to decide between your 2 favorite ice creams... impossible. So you can decide this as well.'}"
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-300">
            <span>— Bruce & Norma</span>
          </div>
        </div>
        <div className="absolute -right-8 -bottom-8 text-9xl opacity-10 select-none pointer-events-none">
          🍦
        </div>
      </div>

      {/* PHASE 1: THANKSGIVING TRIP */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            🦃 25 – 30 Noviembre
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {t.phaseThanksgivingTitle}
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            {t.phaseThanksgivingSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {thanksgivingOptions.map(renderOptionCard)}
        </div>
      </section>

      {/* PHASE 2: DECEMBER WEEKEND TRIP */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-teal-700 bg-teal-100 px-3 py-1 rounded-full">
            🌋 3 – 7 Diciembre
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            {t.phaseDecemberTitle}
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            {t.phaseDecemberSub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {decemberOptions.map(renderOptionCard)}
        </div>
      </section>

    </div>
  );
};
