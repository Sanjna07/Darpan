import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import SearchSection from '../components/SearchSection';
import IntelligenceGrid from '../components/IntelligenceGrid';
import KnowledgeGraph from '../components/KnowledgeGraph';
import MobileNav from '../components/MobileNav';

export default function HomePage() {
  return (
    <>
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 lg:ml-64 pb-24 lg:pb-8">
          <SearchSection />
          <IntelligenceGrid />
          <KnowledgeGraph />
        </main>
      </div>

      <MobileNav />
    </>
  );
}
