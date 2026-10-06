import React from 'react';
import { Calendar, MapPin, Scale, Luggage, Users2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type TabType = 'itinerary' | 'map' | 'options' | 'packing' | 'family';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'itinerary', label: t.navItinerary, icon: <Calendar className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'map', label: t.navMap, icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'options', label: t.navOptions, icon: <Scale className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'packing', label: t.navPacking, icon: <Luggage className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { id: 'family', label: t.navFamily, icon: <Users2 className="w-4 h-4 sm:w-5 sm:h-5" /> },
  ];

  return (
    <>
      {/* Desktop Navigation Tabs */}
      <nav className="hidden md:block bg-white border-b border-slate-200/80 sticky top-16 sm:top-20 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 lg:space-x-4">
            {navItems.map(item => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 py-4 px-3 lg:px-4 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                    isActive
                      ? 'border-emerald-600 text-emerald-700 bg-emerald-50/50'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  <span className={isActive ? 'text-emerald-600' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-200 z-50 px-2 py-1 shadow-lg pb-safe">
        <div className="grid grid-cols-5 gap-1">
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-[10px] font-semibold transition-all ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-emerald-600 text-white' : ''}`}>
                  {item.icon}
                </div>
                <span className="truncate w-full text-center mt-0.5">{item.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
