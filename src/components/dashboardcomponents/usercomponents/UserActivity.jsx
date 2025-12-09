
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Package, Users, Wrench, DollarSign, Star, Calendar } from "lucide-react";

const UserActivity = ({ activities, recentActivity }) => {
    const [activeTab, setActiveTab] = useState('recent');

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getActivityIcon = (type) => {
        const iconMap = {
            'bundle_created': <Package className="w-5 h-5 text-blue-500" />,
            'bundle_joined': <Users className="w-5 h-5 text-green-500" />,
            'service_requested': <Wrench className="w-5 h-5 text-purple-500" />,
            'payment_made': <DollarSign className="w-5 h-5 text-green-600" />,
            'review_submitted': <Star className="w-5 h-5 text-yellow-500" />,
        };
        return iconMap[type] || <Calendar className="w-5 h-5 text-gray-500" />;
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            'pending': 'bg-yellow-100 text-yellow-700',
            'accepted': 'bg-blue-100 text-blue-700',
            'completed': 'bg-green-100 text-green-700',
            'cancelled': 'bg-red-100 text-red-700',
            'paid': 'bg-green-100 text-green-700',
            'active': 'bg-blue-100 text-blue-700',
        };
        return statusColors[status?.toLowerCase()] || 'bg-gray-100 text-gray-700';
    };

    const renderRecentActivity = () => {
        if (!recentActivity || recentActivity.length === 0) {
            return (
                <div className="text-center py-8 text-gray-500">
                    No recent activity
                </div>
            );
        }

        return recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-4 border-b last:border-b-0 hover:bg-gray-50">
                <div className="mt-1">
                    {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.description}</p>
                    {activity.details && (
                        <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">{formatDate(activity.date)}</p>
                </div>
                {activity.status && (
                    <Badge className={getStatusBadge(activity.status)}>
                        {activity.status}
                    </Badge>
                )}
            </div>
        ));
    };

    const renderBundles = () => {
        const bundles = [
            ...(activities?.bundlesCreated || []).map(b => ({ ...b, type: 'created' })),
            ...(activities?.bundlesJoined || []).map(b => ({ ...b, type: 'joined' }))
        ];

        if (bundles.length === 0) {
            return <div className="text-center py-8 text-gray-500">No bundles</div>;
        }

        return bundles.slice(0, 10).map((bundle, index) => (
            <div key={index} className="p-4 border-b last:border-b-0 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{bundle.title || bundle.bundle?.title}</h3>
                    <Badge className={getStatusBadge(bundle.status)}>
                        {bundle.status}
                    </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                    {bundle.description || bundle.bundle?.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{bundle.type === 'created' ? 'Created' : 'Joined'}</span>
                    <span>•</span>
                    <span>{formatDate(bundle.createdAt || bundle.joinedAt)}</span>
                    {bundle.participants?.length > 0 && (
                        <>
                            <span>•</span>
                            <span>{bundle.participants.length} participants</span>
                        </>
                    )}
                </div>
            </div>
        ));
    };

    const renderServiceRequests = () => {
        const requests = activities?.serviceRequests || [];

        if (requests.length === 0) {
            return <div className="text-center py-8 text-gray-500">No service requests</div>;
        }

        return requests.slice(0, 10).map((request, index) => (
            <div key={index} className="p-4 border-b last:border-b-0 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{request.serviceType}</h3>
                    <Badge className={getStatusBadge(request.status)}>
                        {request.status}
                    </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{request.problemDescription}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>${request.price}</span>
                    <span>•</span>
                    <span>{formatDate(request.scheduledDate)}</span>
                    {request.provider && (
                        <>
                            <span>•</span>
                            <span>Provider: {request.provider.firstName} {request.provider.lastName}</span>
                        </>
                    )}
                </div>
            </div>
        ));
    };

    const renderPayments = () => {
        const payments = activities?.payments || [];

        if (payments.length === 0) {
            return <div className="text-center py-8 text-gray-500">No payments</div>;
        }

        return payments.slice(0, 10).map((payment, index) => (
            <div key={index} className="p-4 border-b last:border-b-0 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            ${payment.amount.toFixed(2)}
                            {payment.tip > 0 && <span className="text-green-600"> (+${payment.tip.toFixed(2)} tip)</span>}
                        </h3>
                        <p className="text-sm text-gray-600">{payment.description}</p>
                    </div>
                    <Badge className={getStatusBadge(payment.status)}>
                        {payment.status}
                    </Badge>
                </div>
                <div className="text-xs text-gray-500">
                    {formatDate(payment.paymentDate)}
                </div>
            </div>
        ));
    };

    return (
        <div className="w-full p-4 bg-white border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Activity Timeline</h2>

            {/* Tabs */}
            <div className="flex gap-2 mb-4 border-b">
                <button
                    onClick={() => setActiveTab('recent')}
                    className={`px-4 py-2 font-medium ${
                        activeTab === 'recent'
                            ? 'border-b-2 border-[#0E7A60] text-[#0E7A60]'
                            : 'text-gray-600'
                    }`}
                >
                    Recent Activity
                </button>
                <button
                    onClick={() => setActiveTab('bundles')}
                    className={`px-4 py-2 font-medium ${
                        activeTab === 'bundles'
                            ? 'border-b-2 border-[#0E7A60] text-[#0E7A60]'
                            : 'text-gray-600'
                    }`}
                >
                    Bundles
                </button>
                <button
                    onClick={() => setActiveTab('services')}
                    className={`px-4 py-2 font-medium ${
                        activeTab === 'services'
                            ? 'border-b-2 border-[#0E7A60] text-[#0E7A60]'
                            : 'text-gray-600'
                    }`}
                >
                    Services
                </button>
                <button
                    onClick={() => setActiveTab('payments')}
                    className={`px-4 py-2 font-medium ${
                        activeTab === 'payments'
                            ? 'border-b-2 border-[#0E7A60] text-[#0E7A60]'
                            : 'text-gray-600'
                    }`}
                >
                    Payments
                </button>
            </div>

            {/* Content */}
            <div className="space-y-2">
                {activeTab === 'recent' && renderRecentActivity()}
                {activeTab === 'bundles' && renderBundles()}
                {activeTab === 'services' && renderServiceRequests()}
                {activeTab === 'payments' && renderPayments()}
            </div>
        </div>
    );
};

export default UserActivity;
