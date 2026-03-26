import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  timestamp: Date;
}

export interface Notification {
  id: string;
  article: Article;
  timestamp: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (article: Article) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((article: Article) => {
    const id = `notification-${Date.now()}`;
    const notification: Notification = {
      id,
      article,
      timestamp: new Date(),
    };
    setNotifications((prev) => [...prev, notification]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearAll }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};
