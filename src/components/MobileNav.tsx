import { Search, Network, FileText, BarChart3 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

export default function MobileNav() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activePanel = searchParams.get('panel') ?? 'intelligence';

  const setPanel = (panel: string) => {
    if (panel === 'intelligence') {
      setSearchParams({});
      return;
    }
    setSearchParams({ panel });
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl shadow-gray-900/10 rounded-t-3xl pb-safe">
      <div className="flex items-center justify-around px-2 py-3">
        <button
          onClick={() => setPanel('intelligence')}
          className={`flex flex-col items-center gap-1 px-3 py-2 transition-all active:scale-90 ${
            activePanel === 'intelligence' ? 'text-indigo-600' : 'text-gray-600'
          }`}
        >
          <div className={`p-2 rounded-xl transition-colors ${activePanel === 'intelligence' ? 'bg-indigo-100' : 'hover:bg-gray-100'}`}>
            <Search className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold">Query</span>
        </button>
        <button
          onClick={() => setPanel('knowledge-graph')}
          className={`flex flex-col items-center gap-1 px-3 py-2 transition-all active:scale-90 ${
            activePanel === 'knowledge-graph' ? 'text-indigo-600' : 'text-gray-600'
          }`}
        >
          <div className={`p-2 rounded-xl transition-colors ${activePanel === 'knowledge-graph' ? 'bg-indigo-100' : 'hover:bg-gray-100'}`}>
            <Network className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold">Graph</span>
        </button>
        <button
          onClick={() => setPanel('evidence')}
          className={`flex flex-col items-center gap-1 px-3 py-2 transition-all active:scale-90 ${
            activePanel === 'evidence' ? 'text-indigo-600' : 'text-gray-600'
          }`}
        >
          <div className={`p-2 rounded-xl transition-colors ${activePanel === 'evidence' ? 'bg-indigo-100' : 'hover:bg-gray-100'}`}>
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold">Source</span>
        </button>
        <button
          onClick={() => setPanel('statistics')}
          className={`flex flex-col items-center gap-1 px-3 py-2 transition-all active:scale-90 ${
            activePanel === 'statistics' ? 'text-indigo-600' : 'text-gray-600'
          }`}
        >
          <div className={`p-2 rounded-xl transition-colors ${activePanel === 'statistics' ? 'bg-indigo-100' : 'hover:bg-gray-100'}`}>
            <BarChart3 className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-semibold">Stats</span>
        </button>
      </div>
    </nav>
  );
}
