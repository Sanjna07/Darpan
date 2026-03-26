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
            {activePanel === 'intelligence' && (
              <div className="fixed right-4 top-24 z-40 w-44 sm:w-52">
                <div className="bg-white/85 backdrop-blur-xl border border-gray-200/70 rounded-2xl p-3 shadow-xl shadow-gray-900/10">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => setFocusMode(prev => !prev)}
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