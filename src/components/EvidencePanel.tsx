import { ExternalLink, FileText, ShieldCheck } from 'lucide-react';

export default function EvidencePanel() {
  const evidenceItems = [
    {
      title: 'Semiconductor Capacity Outlook Report',
      source: 'Reuters Intelligence',
      confidence: '98%',
      updated: '4m ago',
      type: 'Market Report',
    },
    {
      title: 'Renewable Infrastructure Investment Note',
      source: 'Bloomberg Terminal',
      confidence: '96%',
      updated: '7m ago',
      type: 'Financial Brief',
    },
    {
      title: 'Currency Volatility Correlation Dataset',
      source: 'IMF Open Data',
      confidence: '94%',
      updated: '11m ago',
      type: 'Dataset',
    },
  ];

  return (
    <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-xl shadow-gray-900/5 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Evidence</h2>
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1">
            <ShieldCheck className="w-4 h-4" />
            Verified Sources
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {evidenceItems.map((item, index) => (
            <article
              key={index}
              className="p-4 sm:p-5 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl hover:border-indigo-300 hover:bg-indigo-50 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{item.type}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">{item.source}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 mt-1" />
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
                <span>Confidence {item.confidence}</span>
                <span>•</span>
                <span>{item.updated}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
