import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, FileText, ShieldCheck } from 'lucide-react';

interface EvidenceItem {
  id: string;
  title: string;
  source: string;
  sourceUrl: string;
  year: number;
  confidence: string;
  type: string;
  createdAt: number;
  isNew?: boolean;
}

const MAX_VISIBLE_ITEMS = 15;
const INITIAL_VISIBLE_ITEMS = 10;
const LIVE_INTERVAL_MS = 7000;

const LIVE_EVIDENCE_POOL = [
  {
    title: 'Semiconductor Capacity Outlook Revision',
    source: 'Reuters Intelligence',
    sourceUrl: 'https://www.reuters.com/business/',
    year: 2026,
    confidence: '98%',
    type: 'Market Report',
  },
  {
    title: ' Renewable Infrastructure Investment Note',
    source: 'Bloomberg Terminal',
    sourceUrl: 'https://www.bloomberg.com/markets',
    year: 2026,
    confidence: '96%',
    type: 'Financial Brief',
  },
  {
    title: ' Currency Volatility Correlation Dataset',
    source: 'IMF Open Data',
    sourceUrl: 'https://www.imf.org/en/Data',
    year: 2026,
    confidence: '94%',
    type: 'Dataset',
  },
  {
    title: ' Critical Minerals Trade Corridor Alert',
    source: 'UN Comtrade',
    sourceUrl: 'https://comtradeplus.un.org/',
    year: 2026,
    confidence: '95%',
    type: 'Trade Alert',
  },
  {
    title: ' Energy Price Shock Scenario Update',
    source: 'IEA Analytics',
    sourceUrl: 'https://www.iea.org/reports',
    year: 2026,
    confidence: '97%',
    type: 'Risk Brief',
  },
  {
    title: ' Port Congestion Satellite Readings',
    source: 'MarineTraffic',
    sourceUrl: 'https://www.marinetraffic.com/',
    year: 2026,
    confidence: '93%',
    type: 'Sensor Feed',
  },
  {
    title: ' Supply Chain Rerouting Bulletin',
    source: 'WTO Data',
    sourceUrl: 'https://data.wto.org/',
    year: 2026,
    confidence: '95%',
    type: 'Logistics Alert',
  },
  {
    title: ' AI Chip Export Regulation Tracker',
    source: 'U.S. BIS',
    sourceUrl: 'https://www.bis.gov/',
    year: 2026,
    confidence: '92%',
    type: 'Policy Brief',
  },
  {
    title: ' Offshore Wind Tender Results',
    source: 'WindEurope',
    sourceUrl: 'https://windeurope.org/newsroom/',
    year: 2026,
    confidence: '97%',
    type: 'Auction Update',
  },
  {
    title: 'Rare Earth Price Momentum Snapshot',
    source: 'LME',
    sourceUrl: 'https://www.lme.com/',
    year: 2026,
    confidence: '94%',
    type: 'Price Signal',
  },
  {
    title: 'Strategic Battery Metals Outlook',
    source: 'S&P Global Insights',
    sourceUrl: 'https://www.spglobal.com/commodityinsights/en',
    year: 2026,
    confidence: '96%',
    type: 'Outlook',
  },
  {
    title: 'Maritime Insurance Risk Flash',
    source: 'Lloyd\'s List',
    sourceUrl: 'https://lloydslist.maritimeintelligence.informa.com/',
    year: 2026,
    confidence: '91%',
    type: 'Risk Alert',
  },
  {
    title: 'FX Liquidity Stress Monitor 2026',
    source: 'ECB Statistics',
    sourceUrl: 'https://www.ecb.europa.eu/stats/html/index.en.html',
    year: 2026,
    confidence: '95%',
    type: 'Macro Signal',
  },
  {
    title: 'Data Center Power Demand Update',
    source: 'U.S. EIA',
    sourceUrl: 'https://www.eia.gov/',
    year: 2026,
    confidence: '93%',
    type: 'Demand Brief',
  },
  {
    title: ' Satellite Crop Yield Anomaly Alert 2026',
    source: 'FAOSTAT',
    sourceUrl: 'https://www.fao.org/faostat/en/',
    year: 2026,
    confidence: '92%',
    type: 'Climate Feed',
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
  const [, setPoolIndex] = useState(INITIAL_VISIBLE_ITEMS);
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>(() => {
    const base = Date.now();
    const seeded = Array.from({ length: INITIAL_VISIBLE_ITEMS }, (_, index) =>
      createEvidenceItem(index, base - (INITIAL_VISIBLE_ITEMS - index) * 45 * 1000)
    );
    return seeded.reverse();
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
      setPoolIndex((prevIndex) => {
        const nextItem = createEvidenceItem(prevIndex, timestamp, true);
        setEvidenceItems((prev) => [nextItem, ...prev].slice(0, MAX_VISIBLE_ITEMS));
        return prevIndex + 1;
      });
    }, LIVE_INTERVAL_MS);

    return () => clearInterval(liveFeedTimer);
  }, []);

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
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Trends</h2>
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Live Feed 
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
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    {item.source} ({item.year})
                  </p>
                </div>
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-lg inline-flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  aria-label={`Open source: ${item.source}`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
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
