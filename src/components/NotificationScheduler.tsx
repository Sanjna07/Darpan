import React from 'react';
import { useNotificationScheduler } from '../hooks/useNotificationScheduler';

const NotificationScheduler: React.FC = () => {
  // Trigger notifications every 10 seconds
  useNotificationScheduler({ intervalSeconds: 10, enabled: true });

  return null;
};

export default NotificationScheduler;
