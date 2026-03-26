import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import NotificationContainer from './components/NotificationContainer';
import NotificationScheduler from './components/NotificationScheduler';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <NotificationContainer />
        <NotificationScheduler />
      </div>
    </NotificationProvider>
  );
}

export default App;
