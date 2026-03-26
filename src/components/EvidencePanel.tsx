import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, FileText, ShieldCheck } from 'lucide-react';

interface EvidenceItem {
  id: string;
  title: string;
  source: string;
  confidence: string;
  type: string;
  createdAt: number;
  isNew?: boolean;
}

const LIVE_EVIDENCE_POOL = [
  {
    title: 'Semiconductor Capacity Outlook Report',
    source: 'Reuters Intelligence',
    confidence: '98%',
    type: 'Market Report',
  },
  {
    title: 'Renewable Infrastructure Investment Note',
    source: 'Bloomberg Terminal',
    confidence: '96%',
    type: 'Financial Brief',
  },
  {
    title: 'Currency Volatility Correlation Dataset',
    source: 'IMF Open Data',
    confidence: '94%',
    type: 'Dataset',
  },
  {
    title: 'Critical Minerals Trade Corridor Alert',
    source: 'UN Comtrade',
    confidence: '95%',
    type: 'Trade Alert',
  },
  {
    title: 'Energy Price Shock Scenario Update',
    source: 'IEA Analytics',
    confidence: '97%',
    type: 'Risk Brief',
  },
  {
    title: 'Port Congestion Satellite Readings',
    source: 'Orbital Signals Lab',
    confidence: '93%',
    type: 'Sensor Feed',
  },
];

const createEvidenceItem = (index: number, createdAt: number, isNew = false): EvidenceItem => {
  const item = LIVE_EVIDENCE_POOL[index % LIVE_EVIDENCE_POOL.length];
  return {
    id: `${createdAt}-${index}`,
    ...item,
    createdAt,
    isNew,
  };
};

const getRelativeTime = (createdAt: number, now: number) => {
  const diffSeconds = Math.floor((now - createdAt) / 1000);
  if (diffSeconds < 8) return 'just now';
  if (diffSeconds < 60) return `${diffSeconds}s ago`;
  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  return `${diffHours}h ago`;
};

export default function EvidencePanel() {
  const [now, setNow] = useState(Date.now());
  const [poolIndex, setPoolIndex] = useState(3);
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>(() => {
    const base = Date.now();
    return [
      createEvidenceItem(0, base - 4 * 60 * 1000),
      createEvidenceItem(1, base - 7 * 60 * 1000),
      createEvidenceItem(2, base - 11 * 60 * 1000),
    ];
  });

  useEffect(() => {
    const clock = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(clock);
  }, []);

  useEffect(() => {
    const liveFeedTimer = setInterval(() => {
      const timestamp = Date.now();
      setEvidenceItems((prev) => {
        const nextItem = createEvidenceItem(poolIndex, timestamp, true);
        const next = [nextItem, ...prev].slice(0, 6);
        return next;
      });
      setPoolIndex((prev) => prev + 1);
    }, 10000);

    return () => clearInterval(liveFeedTimer);
  }, [poolIndex]);

  useEffect(() => {
    const clearNewFlagTimer = setInterval(() => {
      setEvidenceItems((prev) =>
        prev.map((item) =>
          item.isNew && Date.now() - item.createdAt > 8000 ? { ...item, isNew: false } : item
        )
      );
    }, 1000);

    return () => clearInterval(clearNewFlagTimer);
  }, []);

  const liveCount = useMemo(
    () => evidenceItems.filter((item) => now - item.createdAt <= 60 * 1000).length,
    [evidenceItems, now]
  );

  return (
    <section className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-xl shadow-gray-900/5 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Evidence</h2>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Live Feed {liveCount}
            </div>
            <div className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1">
              <ShieldCheck className="w-4 h-4" />
              Verified Sources
            </div>
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {evidenceItems.map((item) => (
            <article
              key={item.id}
              className={`p-4 sm:p-5 bg-gradient-to-r from-gray-50 to-white border rounded-2xl hover:border-indigo-300 hover:bg-indigo-50 transition-all ${
                item.isNew ? 'border-emerald-300 shadow-lg shadow-emerald-100/70' : 'border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2 text-xs text-gray-500 mb-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{item.type}</span>
                    {item.isNew && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                        New
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">{item.source}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 mt-1" />
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
                <span>Confidence {item.confidence}</span>
                <span>•</span>
                <span>{getRelativeTime(item.createdAt, now)}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
