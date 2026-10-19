import React from 'react';
import { Calendar, MapPin, Luggage, Users2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type TabType = 'itinerary' | 'map' | 'packing' | 'family';

/** Spanish slugs in the URL hash so shared links read naturally in the family chat. */
export const TAB_SLUGS: Record<TabType, string> = {
  itinerary: 'itinerario',
  map: 'mapa',
  packing: 'equipaje',
  family: 'familia',
};

export const tabFromHash = (hash: string): TabType | null => {
  const slug = hash.replace(/^#/, '').split('?')[0];
  const match = (Object.keys(TAB_SLUGS) as TabType[]).find(tab => TAB_SLUGS[tab] === slug);
  return match ?? null;
};

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const { t, tr } = useLanguage();

  const navItems: { id: TabType; label: string; short: string; icon: React.ElementType }[] = [
    { id: 'itinerary', label: t.navItinerary, short: tr('Itinerario', 'Itinerary'), icon: Calendar },
    { id: 'map', label: t.navMap, short: tr('Mapa', 'Map'), icon: MapPin },
    { id: 'packing', label: t.navPacking, short: tr('Equipaje', 'Packing'), icon: Luggage },
    { id: 'family', label: t.navFamily, short: tr('Familia', 'Family'), icon: Users2 },
  ];

  return (
    <>
      {/* Desktop Navigation Tabs */}
      <nav aria-label={tr('Secciones', 'Sections')} className="hidden md:block bg-white border-b border-slate-200/80 sticky top-16 sm:top-20 z-30 shadow-sm print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 lg:space-x-4">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-2 py-4 px-3 lg:px-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                    isActive
                      ? 'border-emerald-700 text-emerald-800 bg-emerald-50/50'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-700' : 'text-slate-500'}`} aria-hidden />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <nav
        data-bottom-nav
        aria-label={tr('Secciones', 'Sections')}
        className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-200 z-50 px-1 pt-1 shadow-lg print:hidden"
        style={{ paddingBottom: 'max(0.25rem, env(safe-area-inset-bottom))' }}
      >
        <div className="grid grid-cols-4 gap-1">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex flex-col items-center justify-center min-h-[56px] py-1.5 px-1 rounded-xl text-xs font-bold transition-all ${
                  isActive ? 'text-emerald-800' : 'text-slate-600'
                }`}
              >
                <span className={`px-3 py-1 rounded-full transition-colors ${isActive ? 'bg-emerald-100' : ''}`}>
                  <Icon className="w-5 h-5" aria-hidden />
                </span>
                <span className="truncate w-full text-center mt-0.5">{item.short}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
