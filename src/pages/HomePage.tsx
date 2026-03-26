import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import SearchSection from '../components/SearchSection';
import IntelligenceGrid from '../components/IntelligenceGrid';
import KnowledgeGraph from '../components/KnowledgeGraph';
import EvidencePanel from '../components/EvidencePanel';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Focus } from 'lucide-react';

type FocusTarget = 'dashboard' | 'statistics' | 'sources' | 'knowledge-graph';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const activePanel = searchParams.get('panel') ?? 'intelligence';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [focusTarget, setFocusTarget] = useState<FocusTarget>('dashboard');

  useEffect(() => {
    if (!focusMode || activePanel !== 'intelligence') return;

    const targetIdByFocus: Record<FocusTarget, string> = {
      dashboard: 'dashboard-section',
      statistics: 'statistics-section',
      sources: 'sources-section',
      'knowledge-graph': 'knowledge-graph-section',
    };

    const targetId = targetIdByFocus[focusTarget];
    const element = document.getElementById(targetId);
    if (!element) return;

    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [focusMode, focusTarget, activePanel]);

  useEffect(() => {
    if (activePanel !== 'intelligence') {
      setFocusMode(false);
    }
  }, [activePanel]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen}
        focusMode={focusMode}
        setFocusMode={setFocusMode}
        focusTarget={focusTarget}
        setFocusTarget={setFocusTarget}
      />

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        <main className="flex-1 w-full p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-5rem)]">
          <div className="max-w-screen-2xl mx-auto">
            {activePanel === 'statistics' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <IntelligenceGrid mode="statistics" />
              </div>
            )}
            {activePanel === 'knowledge-graph' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <KnowledgeGraph />
              </div>
            )}
            {activePanel === 'evidence' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <EvidencePanel />
              </div>
            )}
            {activePanel === 'intelligence' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <SearchSection />
                <IntelligenceGrid focusMode={focusMode} focusTarget={focusTarget} />
                <KnowledgeGraph focusMode={focusMode} focusTarget={focusTarget} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}