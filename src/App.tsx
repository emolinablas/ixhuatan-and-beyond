import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { TripProvider, useTrip } from './context/TripContext';
import { Header } from './components/Header';
import { Navigation, TabType } from './components/Navigation';
import { InteractiveMap } from './components/Map/InteractiveMap';
import { OptionsComparator } from './components/Options/OptionsComparator';
import { TimelineView } from './components/Itinerary/TimelineView';
import { PackingManager } from './components/Packing/PackingManager';
import { FamilyCrew } from './components/Family/FamilyCrew';
import { AdminModal } from './components/Admin/AdminModal';

const MainAppContent: React.FC = () => {
  const { language } = useLanguage();
  const { setActiveDestinationId } = useTrip();
  const [activeTab, setActiveTab] = useState<TabType>('itinerary');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const handleSelectDestinationForMap = (destId: string) => {
    setActiveDestinationId(destId);
    setActiveTab('map');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Top Header */}
      <Header onOpenAdmin={() => setIsAdminModalOpen(true)} />

      {/* Tabs Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'itinerary' && (
          <TimelineView onSelectDestinationForMap={handleSelectDestinationForMap} />
        )}
        {activeTab === 'map' && <InteractiveMap />}
        {activeTab === 'options' && (
          <OptionsComparator onSelectDestinationForMap={handleSelectDestinationForMap} />
        )}
        {activeTab === 'packing' && <PackingManager />}
        {activeTab === 'family' && <FamilyCrew />}
      </main>

      {/* Footer */}
      <footer className="hidden md:block py-6 border-t border-slate-200/80 bg-white text-center text-xs text-slate-500">
        <p>
          🇬🇹 {language === 'es' 
            ? 'Ixhuatán & Beyond • Hecho con cariño para la familia Molina y amigos • 15 Nov – 11 Dic, 2026'
            : 'Ixhuatán & Beyond • Created with love for the Molina family and friends • Nov 15 – Dec 11, 2026'}
        </p>
      </footer>

      {/* Admin / Backup Modal */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <TripProvider>
        <MainAppContent />
      </TripProvider>
    </LanguageProvider>
  );
}

export default App;
