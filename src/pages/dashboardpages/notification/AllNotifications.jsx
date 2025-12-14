// import React from "react";

// const AllNotifications = () => {
//   return <div>AllNotifications</div>;
// };

// export default AllNotifications;


import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // ShadCN Button
import providerImg from "@/assets/provider.png"; // Avatar image for provider (use your actual provider image from assets folder)
import { useNotifications } from "@/contexts/NotificationContext";
import {
  getNotificationIcon,
  formatNotificationTime,
  getNotificationPriorityColor
} from "@/services/notificationService";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const AllNotifications = () => {
  const navigate = useNavigate();
  const {
    notifications,
    summary,
    loading,
    error,
    markAsRead,
    fetchNotifications
  } = useNotifications();

  useEffect(() => {
    // Fetch notifications when component mounts
    fetchNotifications();
  }, []);

  const handleNotificationClick = async (notification) => {
    // Mark as read
    if (!notification.isRead) {
      await markAsRead(notification.id);
    }

    // Navigate based on notification type
    switch (notification.type) {
      case 'provider_verification':
        navigate('/dashboard/providers');
        break;
      case 'support_ticket':
        navigate('/dashboard/support');
        break;
      case 'withdrawal_request':
        navigate('/dashboard/withdraw');
        break;
      case 'new_payment':
        navigate('/dashboard/payment');
        break;
      default:
        break;
    }
  };

  const getNotificationDetails = (notification) => {
    const details = [];
    const data = notification.data || {};

    switch (notification.type) {
      case 'provider_verification':
        if (data.businessName) details.push({ label: 'Business Name', value: data.businessName });
        if (data.providerName) details.push({ label: 'Provider Name', value: data.providerName });
        if (data.status) details.push({ label: 'Status', value: data.status });
        break;
      case 'support_ticket':
        if (data.ticketNumber) details.push({ label: 'Ticket #', value: data.ticketNumber });
        if (data.priority) details.push({ label: 'Priority', value: data.priority });
        if (data.subject) details.push({ label: 'Subject', value: data.subject });
        break;
      case 'withdrawal_request':
        if (data.amount) details.push({ label: 'Amount', value: `$${data.amount}` });
        if (data.providerName) details.push({ label: 'Provider', value: data.providerName });
        if (data.status) details.push({ label: 'Status', value: data.status });
        break;
      case 'new_payment':
        if (data.amount) details.push({ label: 'Amount', value: `$${data.amount}` });
        if (data.customerName) details.push({ label: 'Customer', value: data.customerName });
        if (data.serviceName) details.push({ label: 'Service', value: data.serviceName });
        break;
    }

    return details;
  };

  if (loading && notifications.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#0E7A60]" />
        <span className="ml-2 text-gray-600">Loading notifications...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Failed to load notifications: {error}</p>
        <Button
          onClick={() => fetchNotifications()}
          className="mt-2 bg-[#0E7A60] hover:bg-[#0A5F4A]"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">🔔</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No notifications</h3>
        <p className="text-gray-500">You're all caught up!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary Section */}
      {summary && (
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-6">
          <h2 className="text-lg font-semibold mb-3">Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {summary.pendingVerifications > 0 && (
              <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                <p className="text-2xl font-bold text-red-600">{summary.pendingVerifications}</p>
                <p className="text-sm text-gray-600">Pending Verifications</p>
              </div>
            )}
            {summary.newSupportTickets > 0 && (
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <p className="text-2xl font-bold text-yellow-600">{summary.newSupportTickets}</p>
                <p className="text-sm text-gray-600">Support Tickets</p>
              </div>
            )}
            {summary.pendingWithdrawals > 0 && (
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="text-2xl font-bold text-blue-600">{summary.pendingWithdrawals}</p>
                <p className="text-sm text-gray-600">Pending Withdrawals</p>
              </div>
            )}
            {summary.recentPayments > 0 && (
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="text-2xl font-bold text-green-600">{summary.recentPayments}</p>
                <p className="text-sm text-gray-600">Recent Payments</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notifications List */}
      {notifications.map((notification, index) => {
        const details = getNotificationDetails(notification);
        const isUnread = !notification.isRead;

        return (
          <div
            key={notification.id || index}
            className={`bg-white p-6 rounded-lg shadow-md flex items-start gap-4 border-l-4 cursor-pointer transition-all hover:shadow-lg ${
              isUnread ? 'border-l-blue-500 bg-blue-50/30' : 'border-l-gray-300'
            } ${notification.priority === 'high' ? 'border-l-red-500' : ''}`}
            onClick={() => handleNotificationClick(notification)}
          >
            {/* Icon */}
            <div className="text-4xl flex-shrink-0">
              {getNotificationIcon(notification.type)}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-lg font-semibold">{notification.title}</h3>
                  {isUnread && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                      New
                    </span>
                  )}
                  {notification.priority === 'high' && (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
                      High Priority
                    </span>
                  )}
                  {notification.priority === 'medium' && (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium">
                      Medium Priority
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-400 whitespace-nowrap ml-2">
                  {formatNotificationTime(notification.createdAt)}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-2">{notification.message}</p>

              {/* Extra Details */}
              {details.length > 0 && (
                <div className="text-sm text-gray-500 mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {details.map((detail, idx) => (
                    <p key={idx}>
                      <strong>{detail.label}:</strong> {detail.value}
                    </p>
                  ))}
                </div>
              )}

              {/* Action Buttons - Show for high priority items */}
              {notification.priority === 'high' && (
                <div className="flex items-center justify-end gap-3 mt-4">
                  <Button
                    variant="outline"
                    className="text-black hover:bg-[#0E7A601A] bg-[#0E7A601A]"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle reject action
                      console.log('Reject notification:', notification.id);
                    }}
                  >
                    View Details
                  </Button>
                  <Button
                    className="text-white bg-[#0E7A60] hover:bg-[#0A5F4A]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNotificationClick(notification);
                    }}
                  >
                    Take Action
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllNotifications;
