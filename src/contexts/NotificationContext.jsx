import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
    getAdminNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    getUnreadCount,
    sortNotifications
} from '@/services/notificationService';

const NotificationContext = createContext(null);

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastFetchTime, setLastFetchTime] = useState(null);

    // Fetch notifications
    const fetchNotifications = useCallback(async (limit = 50) => {
        setLoading(true);
        setError(null);

        try {
            const response = await getAdminNotifications({ limit });

            if (response.success) {
                const sortedNotifications = sortNotifications(response.data.notifications);
                setNotifications(sortedNotifications);
                setSummary(response.data.summary);
                setLastFetchTime(new Date());
            }
        } catch (err) {
            console.error('Failed to fetch notifications:', err);
            setError(err.message || 'Failed to fetch notifications');
        } finally {
            setLoading(false);
        }
    }, []);

    // Mark single notification as read
    const markAsRead = useCallback(async (notificationId) => {
        try {
            await markNotificationAsRead(notificationId);

            // Update local state
            setNotifications(prev =>
                prev.map(n =>
                    n.id === notificationId
                        ? { ...n, isRead: true }
                        : n
                )
            );

            // Update summary
            setSummary(prev => prev ? {
                ...prev,
                byPriority: {
                    ...prev.byPriority,
                    // Recalculate based on updated notifications
                }
            } : null);
        } catch (err) {
            console.error('Failed to mark notification as read:', err);
            throw err;
        }
    }, []);

    // Mark all notifications as read
    const markAllAsRead = useCallback(async () => {
        try {
            await markAllNotificationsAsRead();

            // Update local state
            setNotifications(prev =>
                prev.map(n => ({ ...n, isRead: true }))
            );
        } catch (err) {
            console.error('Failed to mark all notifications as read:', err);
            throw err;
        }
    }, []);

    // Get unread count
    const unreadCount = getUnreadCount(notifications);

    // Auto-fetch notifications on mount
    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    // Auto-refresh notifications every 60 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            fetchNotifications();
        }, 60000); // 60 seconds

        return () => clearInterval(interval);
    }, [fetchNotifications]);

    const value = {
        notifications,
        summary,
        loading,
        error,
        unreadCount,
        lastFetchTime,
        fetchNotifications,
        markAsRead,
        markAllAsRead,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};
