import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  useEffect(() => {
    const timers = notifications.map((notification) => {
      const timer = setTimeout(() => {
        removeNotification(notification.id);
      }, 5000);

      return { id: notification.id, timer };
    });

    return () => {
      timers.forEach(({ timer }) => clearTimeout(timer));
    };
  }, [notifications, removeNotification]);

  return (
    <div className="fixed top-20 right-4 space-y-3 z-50 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="bg-white rounded-lg shadow-lg border-l-4 border-indigo-500 p-4 animate-slideIn"
        >
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-indigo-600 uppercase">
                  {notification.article.category}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
                {notification.article.title}
              </h3>
              <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                {notification.article.description}
              </p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
              aria-label="Close notification"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
