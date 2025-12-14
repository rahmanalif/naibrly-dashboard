import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotifications } from '@/contexts/NotificationContext';
import {
    getNotificationIcon,
    formatNotificationTime,
    getNotificationPriorityColor,
} from '@/services/notificationService';
import { useNavigate } from 'react-router-dom';

const NotificationBell = () => {
    const navigate = useNavigate();
    const {
        notifications,
        summary,
        loading,
        unreadCount,
        markAsRead,
        markAllAsRead,
        fetchNotifications,
    } = useNotifications();

    const [isOpen, setIsOpen] = useState(false);

    const handleNotificationClick = async (notification) => {
        // Mark as read
        if (!notification.isRead) {
            await markAsRead(notification.id);
        }

        // Navigate based on notification type
        switch (notification.type) {
            case 'provider_verification':
                navigate('/dashboard/providers'); // Adjust route as needed
                break;
            case 'support_ticket':
                navigate('/dashboard/support'); // Adjust route as needed
                break;
            case 'withdrawal_request':
                navigate('/dashboard/withdrawals'); // Adjust route as needed
                break;
            case 'new_payment':
                navigate('/dashboard/transactions'); // Adjust route as needed
                break;
            default:
                break;
        }

        setIsOpen(false);
    };

    const handleMarkAllAsRead = async () => {
        await markAllAsRead();
    };

    const handleRefresh = () => {
        fetchNotifications();
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative p-2 hover:bg-gray-100 rounded-full"
                >
                    <Bell className="w-5 h-5 text-gray-600" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-96 p-0"
                align="end"
                sideOffset={8}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b">
                        <div>
                            <h3 className="font-semibold text-gray-900">Notifications</h3>
                            {summary && (
                                <p className="text-xs text-gray-500">
                                    {summary.totalNotifications} total, {unreadCount} unread
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleRefresh}
                                className="text-xs text-[#0E7A60] hover:text-[#0A5F4A]"
                            >
                                Refresh
                            </Button>
                            {unreadCount > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleMarkAllAsRead}
                                    className="text-xs text-[#0E7A60] hover:text-[#0A5F4A]"
                                >
                                    Mark all read
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Summary Pills */}
                    {summary && (
                        <div className="flex gap-2 px-4 py-3 bg-gray-50 border-b overflow-x-auto">
                            {summary.pendingVerifications > 0 && (
                                <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium whitespace-nowrap">
                                    {summary.pendingVerifications} Verifications
                                </div>
                            )}
                            {summary.newSupportTickets > 0 && (
                                <div className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium whitespace-nowrap">
                                    {summary.newSupportTickets} Tickets
                                </div>
                            )}
                            {summary.pendingWithdrawals > 0 && (
                                <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium whitespace-nowrap">
                                    {summary.pendingWithdrawals} Withdrawals
                                </div>
                            )}
                            {summary.recentPayments > 0 && (
                                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium whitespace-nowrap">
                                    {summary.recentPayments} Payments
                                </div>
                            )}
                        </div>
                    )}

                    {/* Notifications List */}
                    <ScrollArea className="flex-1 max-h-96">
                        {loading && notifications.length === 0 ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="text-sm text-gray-500">Loading notifications...</div>
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 px-4">
                                <Bell className="w-12 h-12 text-gray-300 mb-2" />
                                <p className="text-sm text-gray-500">No notifications</p>
                            </div>
                        ) : (
                            <div className="divide-y">
                                {notifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        onClick={() => handleNotificationClick(notification)}
                                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                                            !notification.isRead ? 'bg-blue-50' : ''
                                        }`}
                                    >
                                        <div className="flex gap-3">
                                            <div className="flex-shrink-0 text-2xl">
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2">
                                                    <h4 className="text-sm font-medium text-gray-900 truncate">
                                                        {notification.title}
                                                    </h4>
                                                    {!notification.isRead && (
                                                        <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-1.5" />
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                                    {notification.message}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="text-xs text-gray-500">
                                                        {formatNotificationTime(notification.createdAt)}
                                                    </span>
                                                    {notification.priority === 'high' && (
                                                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">
                                                            High Priority
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="px-4 py-3 border-t bg-gray-50">
                            <Button
                                variant="link"
                                className="w-full text-sm text-[#0E7A60] hover:text-[#0A5F4A]"
                                onClick={() => {
                                    navigate('/dashboard/notifications'); // Adjust route as needed
                                    setIsOpen(false);
                                }}
                            >
                                View all notifications
                            </Button>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default NotificationBell;
