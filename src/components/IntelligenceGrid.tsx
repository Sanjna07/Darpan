import { Activity, Globe, Zap, Shield, ExternalLink } from 'lucide-react';

export default function IntelligenceGrid() {
  const stats = [
    { label: 'Active Signals', value: '2,847', icon: Activity },
    { label: 'Data Sources', value: '156', icon: Globe },
    { label: 'Confidence', value: '94.2', icon: Shield },
    { label: 'Processing', value: '1.2s', icon: Zap },
  ];

  const sources = [
    { name: 'Reuters Global Markets', reliability: 98, type: 'News', time: '2m ago' },
    { name: 'Bloomberg Terminal', reliability: 99, type: 'Financial', time: '5m ago' },
    
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-xl shadow-gray-900/5 p-6 sm:p-8 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Intelligence Analysis</h3>
            </div>

            <div className="space-y-4 text-gray-700 flex-1">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm sm:text-base leading-relaxed">
                  Global semiconductor supply chain shows increasing diversification patterns with new manufacturing facilities in Southeast Asia and North America.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm sm:text-base leading-relaxed">
                  Investment in renewable energy infrastructure accelerating across G20 nations, with projected capacity increases of 40% by 2027.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm sm:text-base leading-relaxed">
                  Emerging market currencies showing volatility correlations with commodity price fluctuations, particularly in energy and rare earth elements.
                </p>
              </div>
            </div>

            <div className="mt-auto">
              <div className="mt-6 p-4 sm:p-6 bg-gradient-to-br from-indigo-50 to-violet-50 border-l-4 border-indigo-500 rounded-xl">
                <p className="text-xs sm:text-sm font-semibold text-indigo-900 mb-2">Key Insight</p>
                <p className="text-sm sm:text-base text-gray-700 italic leading-relaxed">
                  "Strategic repositioning in critical supply chains indicates a long-term shift toward regional resilience over global efficiency optimization."
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-sm text-gray-500 mt-6">
                <span className="font-mono">Analysis ID: #AI-2847-GX</span>
                <span>•</span>
                <span>Generated 3 minutes ago</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-xl shadow-gray-900/5 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Real-time Statistics</h3>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-3 sm:p-4 hover:shadow-lg hover:scale-[1.02] sm:hover:scale-105 transition-all cursor-pointer"
                >
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mb-1 sm:mb-2" />
                  <p className="text-xl sm:text-2xl font-mono font-bold text-gray-900">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-gray-600 mb-0.5 sm:mb-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-xl shadow-gray-900/5 p-4 sm:p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Sources</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {sources.map((source, index) => (
                <div
                  key={index}
                  className="p-3 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{source.name}</p>
                    <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] sm:text-xs text-gray-500">
                    <span>{source.type}</span>
                    <span>{source.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
