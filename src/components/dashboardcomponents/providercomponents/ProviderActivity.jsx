import React from "react";
import { Badge } from "@/components/ui/badge";
import { Package, Wrench, DollarSign, Star, Calendar, User } from "lucide-react";
import providerImage from "@/assets/provider.png";

const ProviderActivity = ({ activities, recentActivity }) => {
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return `$${(amount || 0).toFixed(2)}`;
    };

    const getActivityIcon = (type) => {
        const iconMap = {
            'bundle_assigned': <Package className="w-5 h-5 text-blue-500" />,
            'service_accepted': <Wrench className="w-5 h-5 text-green-500" />,
            'payment_received': <DollarSign className="w-5 h-5 text-green-600" />,
            'review_received': <Star className="w-5 h-5 text-yellow-500" />,
        };
        return iconMap[type] || <Calendar className="w-5 h-5 text-gray-500" />;
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            'pending': 'bg-[#FFF7D6] text-[#F1C400]',
            'accepted': 'bg-blue-100 text-blue-700',
            'in_progress': 'bg-purple-100 text-purple-700',
            'completed': 'bg-green-100 text-green-700',
            'cancelled': 'bg-red-100 text-red-700',
            'paid': 'bg-green-100 text-green-700',
            'active': 'bg-blue-100 text-blue-700',
        };
        return statusColors[status?.toLowerCase()] || 'bg-gray-100 text-gray-700';
    };

    // Combine all activities into a single chronological list
    const getAllActivities = () => {
        const allActivities = [];

        // Add recent activity items
        if (recentActivity && recentActivity.length > 0) {
            recentActivity.forEach(activity => {
                allActivities.push({
                    ...activity,
                    sortDate: new Date(activity.date)
                });
            });
        }

        // Add bundles
        if (activities?.bundles && activities.bundles.length > 0) {
            activities.bundles.forEach(bundle => {
                allActivities.push({
                    type: 'bundle',
                    data: bundle,
                    sortDate: new Date(bundle.serviceDate || bundle.createdAt),
                    description: `Bundle: ${bundle.title}`,
                    status: bundle.status,
                    date: bundle.serviceDate || bundle.createdAt
                });
            });
        }

        // Add service requests
        if (activities?.serviceRequests && activities.serviceRequests.length > 0) {
            activities.serviceRequests.forEach(request => {
                allActivities.push({
                    type: 'service',
                    data: request,
                    sortDate: new Date(request.scheduledDate || request.createdAt),
                    description: `Service: ${request.serviceType}`,
                    status: request.status,
                    date: request.scheduledDate || request.createdAt
                });
            });
        }

        // Add payments
        if (activities?.payments && activities.payments.length > 0) {
            activities.payments.forEach(payment => {
                allActivities.push({
                    type: 'payment',
                    data: payment,
                    sortDate: new Date(payment.paymentDate),
                    description: `Payment received: ${formatCurrency(payment.amount)}`,
                    status: payment.status,
                    date: payment.paymentDate
                });
            });
        }

        // Add reviews
        if (activities?.reviews && activities.reviews.length > 0) {
            activities.reviews.forEach(review => {
                allActivities.push({
                    type: 'review',
                    data: review,
                    sortDate: new Date(review.createdAt),
                    description: `Review received: ${review.rating} stars`,
                    status: 'completed',
                    date: review.createdAt
                });
            });
        }

        // Sort by date (most recent first)
        allActivities.sort((a, b) => b.sortDate - a.sortDate);

        return allActivities;
    };

    const renderActivity = (activity, index) => {
        const customerImage = activity.data?.customer?.profileImage?.url || providerImage;

        return (
            <div key={index} className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                    <img
                        src={customerImage}
                        alt="Activity"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex flex-col space-y-1">
                        <div className="flex items-center gap-4">
                            <p className="font-medium text-gray-900">
                                {activity.description || activity.data?.title || 'Activity'}
                            </p>
                            {activity.status && (
                                <Badge className={`${getStatusBadge(activity.status)} px-3 py-1 rounded-lg`}>
                                    {activity.status}
                                </Badge>
                            )}
                        </div>
                        <p className="text-sm text-gray-600">
                            {activity.details || activity.data?.description || activity.data?.problemDescription || ''}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
                </div>
            </div>
        );
    };

    const allActivities = getAllActivities();

    return (
        <div className="w-full p-4 bg-white border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Activity Timeline</h2>

            <div className="space-y-0">
                {allActivities.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No activities found
                    </div>
                ) : (
                    allActivities.map((activity, index) => renderActivity(activity, index))
                )}
            </div>
        </div>
    );
};

export default ProviderActivity;
