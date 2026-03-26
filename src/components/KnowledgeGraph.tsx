import { ZoomIn, ZoomOut, Focus, Download } from 'lucide-react';

interface KnowledgeGraphProps {
  focusMode?: boolean;
  focusTarget?: 'dashboard' | 'statistics' | 'sources' | 'knowledge-graph';
}

export default function KnowledgeGraph({
  focusMode = false,
  focusTarget = 'knowledge-graph',
}: KnowledgeGraphProps) {
  const nodes = [
    { id: 1, label: 'Semiconductors', x: 50, y: 50, size: 'large', color: 'indigo' },
    { id: 2, label: 'Energy', x: 25, y: 30, size: 'medium', color: 'violet' },
    { id: 3, label: 'Supply Chain', x: 75, y: 30, size: 'medium', color: 'cyan' },
    { id: 4, label: 'Markets', x: 30, y: 70, size: 'small', color: 'indigo' },
    { id: 5, label: 'Geopolitics', x: 70, y: 70, size: 'small', color: 'violet' },
    { id: 6, label: 'AI/ML', x: 15, y: 50, size: 'small', color: 'cyan' },
    { id: 7, label: 'Climate', x: 85, y: 50, size: 'small', color: 'indigo' },
  ];

  const connections = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 1, to: 4 },
    { from: 1, to: 5 },
    { from: 2, to: 6 },
    { from: 3, to: 7 },
  ];

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'large': return 'w-16 h-16 sm:w-24 sm:h-24';
      case 'medium': return 'w-12 h-12 sm:w-16 sm:h-16';
      case 'small': return 'w-10 h-10 sm:w-12 sm:h-12';
      default: return 'w-12 h-12 sm:w-16 sm:h-16';
    }
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case 'indigo': return 'from-indigo-500 to-indigo-600 border-indigo-300';
      case 'violet': return 'from-violet-500 to-violet-600 border-violet-300';
      case 'cyan': return 'from-cyan-500 to-cyan-600 border-cyan-300';
      default: return 'from-indigo-500 to-indigo-600 border-indigo-300';
    }
  };

  return (
    <div id="knowledge-graph-section" className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div
        className={`bg-gradient-to-br from-gray-50 to-white border rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
          focusMode
            ? focusTarget === 'knowledge-graph'
              ? 'opacity-100 border-indigo-400 ring-4 ring-indigo-200/70 shadow-2xl shadow-indigo-300/20 scale-[1.01] z-10'
              : 'opacity-30 grayscale-[0.5] blur-[1px]'
            : 'border-gray-200/50 shadow-indigo-900/5'
        }`}
      >
        <div className="p-6 border-b border-gray-200/50 flex items-center justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Knowledge Graph</h3>
            <p className="text-sm text-gray-600 mt-1">Neural network visualization of intelligence relationships</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-indigo-300 transition-all">
              <ZoomIn className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-indigo-300 transition-all">
              <ZoomOut className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-indigo-300 transition-all">
              <Focus className="w-4 h-4 text-gray-600" />
            </button>
            <div className="relative group">
              <button 
                 className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-indigo-300 transition-all"
               >
                 <Download className="w-4 h-4 text-gray-600" />
               </button>
               <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[10px] font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-[60]">
                 download
               </div>
             </div>
          </div>
        </div>

        <div className="relative h-96 sm:h-[500px] bg-gradient-to-br from-indigo-50/30 via-violet-50/30 to-cyan-50/30 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            {connections.map((conn, index) => {
              const fromNode = nodes.find(n => n.id === conn.from);
              const toNode = nodes.find(n => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              return (
                <line
                  key={index}
                  x1={`${fromNode.x}%`}
                  y1={`${fromNode.y}%`}
                  x2={`${toNode.x}%`}
                  y2={`${toNode.y}%`}
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                  opacity="0.3"
                />
              );
            })}
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>

          {nodes.map((node) => (
            <div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 cursor-pointer"
              style={{ left: `${node.x}%`, top: `${node.y}%`, zIndex: 2 }}
            >
              <div
                className={`${getSizeClass(node.size)} bg-gradient-to-br ${getColorClass(node.color)} border-2 rounded-full shadow-xl flex items-center justify-center relative group ${
                  focusMode && focusTarget === 'knowledge-graph' && node.id === 1
                    ? 'ring-4 ring-indigo-200/80 scale-110'
                    : ''
                }`}
              >
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                <span className="text-white font-semibold text-xs sm:text-sm text-center px-2 relative z-10">
                  {node.label}
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-violet-500/5 to-cyan-500/5 animate-pulse" style={{ zIndex: 0 }}></div>
        </div>

      </div>
    </div>
  );
}
