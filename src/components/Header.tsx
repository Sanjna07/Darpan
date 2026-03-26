import { Download, Database, Menu, X, BarChart3, Network, FileText, Brain } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

interface HeaderProps {
  onMenuToggle?: () => void;
  isSidebarOpen?: boolean;
}

export default function Header({ onMenuToggle, isSidebarOpen }: HeaderProps) {
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
    <header className="sticky top-0 z-[60] bg-white/70 backdrop-blur-xl border-b border-indigo-100/50 shadow-lg shadow-indigo-500/5">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={onMenuToggle}
              className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div 
              onClick={() => setPanel('intelligence')}
              className="flex items-center gap-2 sm:gap-3 cursor-pointer"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center transform rotate-45 transition-transform hover:scale-110">
                <div className="transform -rotate-45">
                  <Database className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                  Darpan
                </h1>
                <p className="text-[10px] sm:text-xs text-gray-500 hidden xs:block">Global Intelligence Engine</p>
              </div>
            </div>
            <div className="ml-2 hidden md:flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-green-700">Live</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 bg-gray-50/50 p-1 rounded-xl border border-gray-100">
            <button 
              onClick={() => setPanel('intelligence')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                activePanel === 'intelligence' 
                  ? 'text-indigo-600 bg-white shadow-sm border border-indigo-100' 
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-white/50'
              }`}
            >
              <Brain className="w-4 h-4" />
              Intelligence
            </button>
            <button 
              onClick={() => setPanel('knowledge-graph')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                activePanel === 'knowledge-graph' 
                  ? 'text-indigo-600 bg-white shadow-sm border border-indigo-100' 
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-white/50'
              }`}
            >
              <Network className="w-4 h-4" />
              Knowledge Graph
            </button>
            <button 
              onClick={() => setPanel('evidence')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                activePanel === 'evidence' 
                  ? 'text-indigo-600 bg-white shadow-sm border border-indigo-100' 
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-white/50'
              }`}
            >
              <FileText className="w-4 h-4" />
              Trends
            </button>
            <button 
              onClick={() => setPanel('statistics')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${
                activePanel === 'statistics' 
                  ? 'text-indigo-600 bg-white shadow-sm border border-indigo-100' 
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-white/50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Statistics
            </button>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative group">
              <button 
                title="dowload report"
                className="p-2 sm:px-4 sm:py-2 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-all"
              >
                <Download className="w-5 h-5" />
              </button>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[10px] font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-[60]">
                dowload report
              </div>
            </div>
            <button className="px-3 sm:px-6 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all transform hover:scale-105">
              <span className="hidden sm:inline">Ingest Data</span>
              <span className="sm:hidden">+</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
