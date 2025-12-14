import api from '@/lib/api';

/**
 * Notification Service - Handles all notification-related API calls
 */

// ==================== ADMIN NOTIFICATION APIs ====================

/**
 * Get all admin notifications
 * @param {Object} params - Query parameters
 * @param {number} params.limit - Maximum notifications to return (default: 50)
 * @returns {Promise} - Notifications data with summary
 */
export const getAdminNotifications = async (params = {}) => {
    try {
        const response = await api.get('/admin/notifications', { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Mark a notification as read
 * @param {string} notificationId - Notification ID
 * @returns {Promise} - Updated notification
 */
export const markNotificationAsRead = async (notificationId) => {
    try {
        const response = await api.patch(`/admin/notifications/${notificationId}/read`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Mark all notifications as read
 * @returns {Promise} - Success response
 */
export const markAllNotificationsAsRead = async () => {
    try {
        const response = await api.patch('/admin/notifications/read-all');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * Get notification icon based on type
 * @param {string} type - Notification type
 * @returns {string} - Icon name or emoji
 */
export const getNotificationIcon = (type) => {
    const iconMap = {
        'provider_verification': '👤',
        'support_ticket': '🎫',
        'withdrawal_request': '💰',
        'new_payment': '💳'
    };
    return iconMap[type] || '📢';
};

/**
 * Get notification color based on priority
 * @param {string} priority - Notification priority
 * @returns {string} - CSS class names
 */
export const getNotificationPriorityColor = (priority) => {
    const colorMap = {
        'high': 'bg-red-50 border-red-200 text-red-900',
        'medium': 'bg-yellow-50 border-yellow-200 text-yellow-900',
        'low': 'bg-blue-50 border-blue-200 text-blue-900'
    };
    return colorMap[priority] || 'bg-gray-50 border-gray-200 text-gray-900';
};

/**
 * Get notification badge color for priority
 * @param {string} priority - Notification priority
 * @returns {string} - CSS class names for badge
 */
export const getNotificationBadgeColor = (priority) => {
    const colorMap = {
        'high': 'bg-red-500',
        'medium': 'bg-yellow-500',
        'low': 'bg-blue-500'
    };
    return colorMap[priority] || 'bg-gray-500';
};

/**
 * Format notification time
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted time ago
 */
export const formatNotificationTime = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
        return 'Just now';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    }
};

/**
 * Get unread notification count
 * @param {Array} notifications - Array of notifications
 * @returns {number} - Count of unread notifications
 */
export const getUnreadCount = (notifications = []) => {
    return notifications.filter(n => !n.isRead).length;
};

/**
 * Group notifications by type
 * @param {Array} notifications - Array of notifications
 * @returns {Object} - Notifications grouped by type
 */
export const groupNotificationsByType = (notifications = []) => {
    return notifications.reduce((acc, notification) => {
        const type = notification.type;
        if (!acc[type]) {
            acc[type] = [];
        }
        acc[type].push(notification);
        return acc;
    }, {});
};

/**
 * Sort notifications by priority and date
 * @param {Array} notifications - Array of notifications
 * @returns {Array} - Sorted notifications
 */
export const sortNotifications = (notifications = []) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };

    return [...notifications].sort((a, b) => {
        // First sort by read status (unread first)
        if (a.isRead !== b.isRead) {
            return a.isRead ? 1 : -1;
        }

        // Then by priority
        const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (priorityDiff !== 0) {
            return priorityDiff;
        }

        // Finally by date (newest first)
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
};
