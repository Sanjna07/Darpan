import { Search } from 'lucide-react';

export default function SearchSection() {
  const suggestions = [
    'Global conflicts',
    'Tech markets',
    'Supply chain',
    'Energy transition',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          What would you like to analyze?
        </h2>
        <p className="text-gray-600">
          Ask anything about global events, markets, or strategic intelligence
        </p>
      </div>

      <div className="relative mb-6">
        <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-indigo-500/10 border border-gray-200/50 overflow-hidden group hover:shadow-indigo-500/20 transition-all">
          <div className="flex flex-col xs:flex-row items-center gap-2 sm:gap-4 p-2">
            <div className="hidden xs:flex pl-4">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="e.g., Analyze supply chain..."
              className="w-full flex-1 py-3 sm:py-4 px-4 xs:px-0 text-sm sm:text-lg bg-transparent border-none outline-none text-gray-900 placeholder-gray-400"
            />
            <button className="w-full xs:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-xl sm:rounded-2xl hover:shadow-lg hover:shadow-indigo-500/50 transition-all transform hover:scale-105 whitespace-nowrap">
              Analyze
            </button>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl sm:rounded-3xl blur-2xl opacity-0 group-hover:opacity-10 transition-opacity -z-10"></div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="px-4 sm:px-6 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-full hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 transition-all transform hover:scale-105"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
