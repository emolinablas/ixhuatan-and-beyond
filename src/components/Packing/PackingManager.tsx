import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckSquare, Square, Luggage, Sparkles, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTrip } from '../../context/TripContext';
import { PackingCategory } from '../../types/trip';

export const PackingManager: React.FC = () => {
  const { language, t } = useLanguage();
  const { packingItems, togglePackingItem, markAllPackingItems, resetPackingItems } = useTrip();

  const [selectedCategory, setSelectedCategory] = useState<PackingCategory | 'all'>('all');
  const [onlyPending, setOnlyPending] = useState(false);

  const categories: { id: PackingCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: language === 'es' ? 'Todo el Equipaje' : 'All Packing Items', icon: '🎒' },
    { id: 'master', label: t.categoryMaster, icon: '🛂' },
    { id: 'beach', label: t.categoryBeach, icon: '🏖️' },
    { id: 'highland', label: t.categoryHighland, icon: '🧥' },
    { id: 'jungle', label: t.categoryJungle, icon: '🌴' },
    { id: 'baby', label: t.categoryBaby, icon: '👶' },
    { id: 'seniors', label: t.categorySeniors, icon: '👵' },
  ];

  const filteredItems = packingItems
    .filter(item => selectedCategory === 'all' || item.category === selectedCategory)
    .filter(item => !onlyPending || !item.checked);

  const totalItems = packingItems.length;
  const packedCount = packingItems.filter(i => i.checked).length;
  const progressPercent = Math.round((packedCount / totalItems) * 100);
  const essentialsPending = packingItems.filter(i => i.isEssential && !i.checked).length;

  const handleMarkAll = () => {
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 }, disableForReducedMotion: true });
    markAllPackingItems();
  };

  const handleReset = () => {
    if (window.confirm(language === 'es' ? '¿Desmarcar todo el equipaje?' : 'Uncheck every packing item?')) resetPackingItems();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24 md:pb-12">
      
      {/* Title & Weather Overview */}
      <div className="border-b border-slate-200 pb-6 space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">
            {language === 'es' ? 'Preparación Inteligente' : 'Smart Preparation'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            {t.packingTitle}
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {t.packingSubtitle}
          </p>
        </div>

        {/* Climate Insights Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-1">
            <span className="font-extrabold text-amber-900 flex items-center gap-1.5">
              <span>☀️</span>
              <span>{language === 'es' ? 'Costa Pacífica (Monterrico)' : 'Pacific Coast'}</span>
            </span>
            <p className="text-amber-800">
              {language === 'es'
                ? 'Calor tropical de 30°C - 33°C. Arena negra caliente. Bloqueador FPS 50+ y sandalias gruesas.'
                : 'Tropical heat 86°F - 92°F. Hot black volcanic sand. Reef-safe SPF 50+ & thick sandals.'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-xs space-y-1">
            <span className="font-extrabold text-sky-900 flex items-center gap-1.5">
              <span>🌬️</span>
              <span>{language === 'es' ? 'Altiplano (Antigua & Atitlán)' : 'Highlands'}</span>
            </span>
            <p className="text-sky-800">
              {language === 'es'
                ? 'Días soleados templados (~22°C) pero noches frías (~12°C - 14°C). Traer suéter o fleece.'
                : 'Sunny pleasant days (~72°F) with crisp cool evenings (~54°F - 58°F). Pack fleece or jacket.'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1">
            <span className="font-extrabold text-emerald-900 flex items-center gap-1.5">
              <span>🌿</span>
              <span>{language === 'es' ? 'Río Dulce / Verapaces' : 'Río Dulce / Jungle'}</span>
            </span>
            <p className="text-emerald-800">
              {language === 'es'
                ? 'Humedad alta y vegetación de selva. Esencial repelente DEET y ropa ligera de secado rápido.'
                : 'Humid tropical river climate. Essential DEET repellent and quick-dry breathable clothing.'}
            </p>
          </div>
        </div>

        {/* Progress Tracker Card */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
            <span className="text-slate-800 flex items-center gap-2">
              <Luggage className="w-4 h-4 text-emerald-700" />
              <span>
                {packedCount} {language === 'es' ? 'de' : 'of'} {totalItems} {t.itemsPacked}
              </span>
            </span>
            <span className="text-emerald-700 font-extrabold">{progressPercent}%</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {essentialsPending > 0 && (
            <p className="text-sm font-bold text-rose-800">
              {language === 'es'
                ? `⚠️ Faltan ${essentialsPending} imprescindibles`
                : `⚠️ ${essentialsPending} essentials still to do`}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
            <button
              onClick={() => setOnlyPending(v => !v)}
              aria-pressed={onlyPending}
              className={`mr-auto text-sm font-bold px-3 h-10 rounded-lg border ${onlyPending ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-800 border-slate-300'}`}
            >
              {language === 'es' ? 'Solo pendientes' : 'Only pending'}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.resetPacking}</span>
            </button>
            <button
              onClick={handleMarkAll}
              className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.markAll}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`whitespace-nowrap px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              selectedCategory === cat.id
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Items Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredItems.map(item => (
          <button
            type="button"
            key={item.id}
            role="checkbox"
            aria-checked={item.checked}
            onClick={() => togglePackingItem(item.id)}
            className={`text-left w-full cursor-pointer rounded-2xl p-4 border transition-all duration-200 flex items-start gap-3.5 ${
              item.checked
                ? 'bg-emerald-50/50 border-emerald-300 text-slate-500 shadow-none'
                : 'bg-white border-slate-200 hover:border-emerald-400 hover:shadow-md text-slate-900'
            }`}
          >
            {/* Checkbox Icon */}
            <span className="mt-0.5 shrink-0" aria-hidden>
              {item.checked ? (
                <CheckSquare className="w-5 h-5 text-emerald-700 fill-emerald-100" />
              ) : (
                <Square className="w-5 h-5 text-slate-300 hover:text-emerald-500" />
              )}
            </span>

            {/* Content */}
            <span className="flex-1 space-y-1 block">
              <span className="flex items-start justify-between gap-2">
                <span
                  className={`text-base font-bold leading-snug ${
                    item.checked ? 'line-through text-slate-600' : 'text-slate-900'
                  }`}
                >
                  {language === 'es' ? item.title : item.titleEn}
                </span>

                {item.isEssential && (
                  <span className="shrink-0 px-2 py-0.5 rounded-md text-[0.6875rem] font-extrabold bg-rose-100 text-rose-800">
                    {t.essential}
                  </span>
                )}
              </span>

              {item.description && (
                <span className="block text-sm text-slate-700 leading-relaxed">
                  {language === 'es' ? item.description : item.descriptionEn}
                </span>
              )}
            </span>
          </button>
        ))}
      </div>

    </div>
  );
};
