import { useEffect } from 'react';
import { useNotifications, type Article } from '../contexts/NotificationContext';

// Sample articles data
const SAMPLE_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'AI Advances in 2026',
    description: 'Latest breakthroughs in artificial intelligence and machine learning technologies.',
    category: 'Technology',
    timestamp: new Date(),
  },
  {
    id: '2',
    title: 'Web Development Trends',
    description: 'Discover the newest frameworks and tools shaping modern web development.',
    category: 'Web Dev',
    timestamp: new Date(),
  },
  {
    id: '3',
    title: 'Cloud Computing Security',
    description: 'Essential security practices for protecting your cloud infrastructure.',
    category: 'Security',
    timestamp: new Date(),
  },
  {
    id: '4',
    title: 'React 19 Features',
    description: 'Explore the new features and improvements in React 19.',
    category: 'React',
    timestamp: new Date(),
  },
  {
    id: '5',
    title: 'TypeScript Best Practices',
    description: 'Master advanced TypeScript patterns for better code quality.',
    category: 'TypeScript',
    timestamp: new Date(),
  },
  {
    id: '6',
    title: 'Tailwind CSS Tips',
    description: 'Advanced techniques for styling with Tailwind CSS.',
    category: 'CSS',
    timestamp: new Date(),
  },
  {
    id: '7',
    title: 'Database Optimization',
    description: 'Performance optimization strategies for modern databases.',
    category: 'Database',
    timestamp: new Date(),
  },
  {
    id: '8',
    title: 'DevOps Pipeline Best Practices',
    description: 'Build efficient and reliable CI/CD pipelines.',
    category: 'DevOps',
    timestamp: new Date(),
  },
];

interface UseNotificationSchedulerOptions {
  intervalSeconds?: number;
  enabled?: boolean;
}

export const useNotificationScheduler = (
  options: UseNotificationSchedulerOptions = {}
) => {
  const { intervalSeconds = 10, enabled = true } = options;
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (!enabled) return;

    let currentIndex = 0;

    const interval = setInterval(() => {
      const article = SAMPLE_ARTICLES[currentIndex % SAMPLE_ARTICLES.length];
      addNotification({
        ...article,
        timestamp: new Date(),
      });
      currentIndex++;
    }, intervalSeconds * 1000);

    return () => clearInterval(interval);
  }, [intervalSeconds, enabled, addNotification]);
};
