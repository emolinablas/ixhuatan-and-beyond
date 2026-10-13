import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { WifiOff } from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { TripProvider, useTrip } from './context/TripContext';
import { Header } from './components/Header';
import { Navigation, TabType, TAB_SLUGS, tabFromHash } from './components/Navigation';
import { ItineraryView } from './components/Itinerary/ItineraryView';
import { PrintItinerary } from './components/Print/PrintItinerary';
import { ToastProvider, useToast } from './components/ui/Toast';
import { ballotsFromHash } from './lib/voteLinks';
import { TripOption } from './types/trip';

// The itinerary is the landing tab; everything else (MapLibre alone is ~800 kB)
// loads only when someone opens it.
const MapExplorer = lazy(() => import('./components/Map/MapExplorer'));
const OptionsView = lazy(() => import('./components/Options/OptionsView').then(m => ({ default: m.OptionsView })));
const PackingManager = lazy(() => import('./components/Packing/PackingManager').then(m => ({ default: m.PackingManager })));
const FamilyCrew = lazy(() => import('./components/Family/FamilyCrew').then(m => ({ default: m.FamilyCrew })));
const AdminModal = lazy(() => import('./components/Admin/AdminModal').then(m => ({ default: m.AdminModal })));

const useOnline = () => {
  const [online, setOnline] = useState(() => navigator.onLine);
  useEffect(() => {
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener('online', up);
    window.addEventListener('offline', down);
    return () => {
      window.removeEventListener('online', up);
      window.removeEventListener('offline', down);
    };
  }, []);
  return online;
};

const TabFallback = () => (
  <div className="flex items-center justify-center py-24" role="status">
    <div className="w-10 h-10 rounded-full border-4 border-emerald-200 border-t-emerald-700 animate-spin" aria-hidden />
    <span className="sr-only">Cargando… / Loading…</span>
  </div>
);

const MainAppContent: React.FC = () => {
  const { language, tr } = useLanguage();
  const { options, mergeBallots, selectOption, setActiveDestinationId, setMapRouteFocusId } = useTrip();
  const { showToast } = useToast();
  const online = useOnline();
  const [activeTab, setActiveTabState] = useState<TabType>(() => tabFromHash(window.location.hash) ?? 'itinerary');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [printing, setPrinting] = useState(false);

  // Tabs live in the URL hash so Android's back button and shared links work.
  const setActiveTab = useCallback((tab: TabType, query = '') => {
    setActiveTabState(tab);
    const hash = `#${TAB_SLUGS[tab]}${query}`;
    if (window.location.hash !== hash) window.history.pushState(null, '', hash);
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const onPop = () => setActiveTabState(tabFromHash(window.location.hash) ?? 'itinerary');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Someone tapped a vote link from WhatsApp: fold those votes into this phone.
  // Runs on load and on hash changes (the app may already be open when the link arrives).
  useEffect(() => {
    const absorbVoteLink = () => {
      const incoming = ballotsFromHash(window.location.hash, options);
      if (!incoming) return;
      const names = mergeBallots(incoming);
      window.history.replaceState(null, '', `#${TAB_SLUGS.options}`);
      setActiveTabState('options');
      showToast(names.length
        ? tr(`🗳️ Votos agregados: ${names.join(', ')}`, `🗳️ Votes added: ${names.join(', ')}`)
        : tr('Estos votos ya estaban registrados en este teléfono', 'These votes were already on this phone'));
    };
    absorbVoteLink();
    window.addEventListener('hashchange', absorbVoteLink);
    return () => window.removeEventListener('hashchange', absorbVoteLink);
  }, [options, mergeBallots, showToast, tr]);

  // Render the paper itinerary only while printing (including Ctrl/Cmd+P).
  useEffect(() => {
    const before = () => flushSync(() => setPrinting(true));
    const after = () => setPrinting(false);
    window.addEventListener('beforeprint', before);
    window.addEventListener('afterprint', after);
    return () => {
      window.removeEventListener('beforeprint', before);
      window.removeEventListener('afterprint', after);
    };
  }, []);

  const handlePrint = () => {
    flushSync(() => setPrinting(true));
    window.print();
  };

  const openMap = (destId: string) => {
    setActiveDestinationId(destId);
    setActiveTab('map');
  };

  const showOptionDays = (option: TripOption) => {
    selectOption(option.phase, option.id);
    setActiveTab('itinerary', `?dia=${option.phase === 'thanksgiving' ? 11 : 19}`);
  };

  const showOptionRoute = (option: TripOption) => {
    setMapRouteFocusId(option.id);
    setActiveTab('map');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:shadow">
        {tr('Saltar al contenido', 'Skip to content')}
      </a>
      <Header onOpenAdmin={() => setIsAdminModalOpen(true)} />
      <Navigation activeTab={activeTab} setActiveTab={tab => setActiveTab(tab)} />

      {!online && (
        <div role="status" className="bg-amber-100 border-b border-amber-300 text-amber-950 text-sm font-semibold px-4 py-2 flex items-center justify-center gap-2 print:hidden">
          <WifiOff className="w-4 h-4" aria-hidden />
          {tr('Sin señal: mostrando lo guardado en este teléfono.', 'No signal: showing what’s saved on this phone.')}
        </div>
      )}

      <main id="main" className="flex-1 print:hidden">
        {activeTab === 'itinerary' && (
          <ItineraryView onOpenMap={openMap} onGoToVote={() => setActiveTab('options')} onPrint={handlePrint} />
        )}
        <Suspense fallback={<TabFallback />}>
          {activeTab === 'map' && <MapExplorer onOpenItineraryDay={day => setActiveTab('itinerary', `?dia=${day}`)} />}
          {activeTab === 'options' && <OptionsView onShowDays={showOptionDays} onShowRoute={showOptionRoute} />}
          {activeTab === 'packing' && <PackingManager />}
          {activeTab === 'family' && <FamilyCrew />}
        </Suspense>
      </main>

      {printing && <PrintItinerary />}

      <footer className="hidden md:block py-6 border-t border-slate-200/80 bg-white text-center text-xs text-slate-600 print:hidden">
        <p>
          🇬🇹 {language === 'es'
            ? 'Ixhuatán & Beyond • Hecho con cariño para la familia Molina y amigos • 15 Nov – 11 Dic, 2026'
            : 'Ixhuatán & Beyond • Created with love for the Molina family and friends • Nov 15 – Dec 11, 2026'}
        </p>
      </footer>

      {isAdminModalOpen && (
        <Suspense fallback={null}>
          <AdminModal isOpen onClose={() => setIsAdminModalOpen(false)} />
        </Suspense>
      )}
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <TripProvider>
        <ToastProvider>
          <MainAppContent />
        </ToastProvider>
      </TripProvider>
    </LanguageProvider>
  );
}

export default App;
