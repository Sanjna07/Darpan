import { Brain, Network, FileText, BarChart3, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activePanel = searchParams.get('panel') ?? 'intelligence';

  const setPanel = (panel: string) => {
    if (panel === 'intelligence') {
      setSearchParams({});
    } else {
      setSearchParams({ panel });
    }
    if (onClose) onClose();
  };

  return (
    <aside className={`fixed top-0 left-0 h-full w-64 bg-white backdrop-blur-xl border-r border-gray-200/50 p-6 z-50 transition-all duration-300 lg:hidden ${
      isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
    }`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-8 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Darpan</span>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
            System Navigation
          </p>
          <nav className="space-y-1.5">
            <button
              onClick={() => setPanel('intelligence')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                activePanel === 'intelligence'
                  ? 'text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/30'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <Brain className="w-5 h-5" />
              Intelligence
            </button>
            <button
              onClick={() => setPanel('knowledge-graph')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                activePanel === 'knowledge-graph'
                  ? 'text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/30'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <Network className="w-5 h-5" />
              Knowledge Graph
            </button>
            <button
              onClick={() => setPanel('evidence')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                activePanel === 'evidence'
                  ? 'text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/30'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <FileText className="w-5 h-5" />
              Evidence
            </button>
            <button
              onClick={() => setPanel('statistics')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                activePanel === 'statistics'
                  ? 'text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/30'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              Statistics
            </button>
          </nav>
        </div>

        <div className="mt-auto">
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">System Health</span>
              <span className="text-xs font-mono font-semibold text-indigo-600">98.7</span>
            </div>
            <div className="w-full bg-white rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2 rounded-full transition-all duration-1000" style={{ width: '98.7%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-3 font-medium">Neural Accuracy</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
