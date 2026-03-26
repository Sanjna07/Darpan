import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import SearchSection from '../components/SearchSection';
import IntelligenceGrid from '../components/IntelligenceGrid';
import KnowledgeGraph from '../components/KnowledgeGraph';
import EvidencePanel from '../components/EvidencePanel';
import MobileNav from '../components/MobileNav';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Focus } from 'lucide-react';

type FocusTarget = 'dashboard' | 'statistics' | 'sources' | 'knowledge-graph';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const activePanel = searchParams.get('panel') ?? 'intelligence';
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
    <>
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 lg:ml-64 pb-24 lg:pb-8">
          {activePanel === 'intelligence' && (
            <div className="fixed right-4 top-24 z-40 w-44 sm:w-52">
              <div className="bg-white/85 backdrop-blur-xl border border-gray-200/70 rounded-2xl p-3 shadow-xl shadow-gray-900/10">
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setFocusMode((prev) => !prev)}
                    className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                      focusMode
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-indigo-300 hover:text-indigo-700'
                    }`}
                  >
                    <Focus className="w-4 h-4" />
                    Focus Mode
                  </button>

                  {focusMode && (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => setFocusTarget('dashboard')}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition-all ${
                          focusTarget === 'dashboard'
                            ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => setFocusTarget('statistics')}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition-all ${
                          focusTarget === 'statistics'
                            ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Real-time Statistics
                      </button>
                      <button
                        onClick={() => setFocusTarget('sources')}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition-all ${
                          focusTarget === 'sources'
                            ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Sources
                      </button>
                      <button
                        onClick={() => setFocusTarget('knowledge-graph')}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold text-left transition-all ${
                          focusTarget === 'knowledge-graph'
                            ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        Knowledge Graph
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activePanel === 'statistics' && <IntelligenceGrid mode="statistics" />}
          {activePanel === 'knowledge-graph' && <KnowledgeGraph />}
          {activePanel === 'evidence' && <EvidencePanel />}
          {activePanel === 'intelligence' && (
            <>
              <SearchSection />
              <IntelligenceGrid focusMode={focusMode} focusTarget={focusTarget} />
              <KnowledgeGraph focusMode={focusMode} focusTarget={focusTarget} />
            </>
          )}
        </main>
      </div>

      <MobileNav />
    </>
  );
}
