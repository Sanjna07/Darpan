import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import SearchSection from '../components/SearchSection';
import IntelligenceGrid from '../components/IntelligenceGrid';
import KnowledgeGraph from '../components/KnowledgeGraph';
import EvidencePanel from '../components/EvidencePanel';
import MobileNav from '../components/MobileNav';
import { useSearchParams } from 'react-router-dom';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const activePanel = searchParams.get('panel') ?? 'intelligence';

  return (
    <>
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 lg:ml-64 pb-24 lg:pb-8">
          {activePanel === 'statistics' && <IntelligenceGrid mode="statistics" />}
          {activePanel === 'knowledge-graph' && <KnowledgeGraph />}
          {activePanel === 'evidence' && <EvidencePanel />}
          {activePanel === 'intelligence' && (
            <>
              <SearchSection />
              <IntelligenceGrid />
              <KnowledgeGraph />
            </>
          )}
        </main>
      </div>

      <MobileNav />
    </>
  );
}
