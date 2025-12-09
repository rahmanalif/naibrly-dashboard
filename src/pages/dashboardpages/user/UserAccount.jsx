import UserActivity from '@/components/dashboardcomponents/usercomponents/UserActivity';
import UserCard from '@/components/dashboardcomponents/usercomponents/UserCard';
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import api from '@/lib/api';

const UserAccount = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const customerId = searchParams.get('id');

    const [customerData, setCustomerData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!customerId) {
            setError('No customer ID provided');
            setLoading(false);
            return;
        }

        const fetchCustomerDetails = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/admin/customers/${customerId}`);

                if (response.data.success) {
                    setCustomerData(response.data.data);
                }
            } catch (err) {
                console.error('Failed to fetch customer details:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerDetails();
    }, [customerId]);

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center h-96">
                <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    <p className="text-gray-600">Loading customer details...</p>
                </div>
            </div>
        );
    }

    if (error || !customerData) {
        return (
            <div className="w-full flex items-center justify-center h-96">
                <div className="text-center">
                    <p className="text-red-500 text-lg mb-4">
                        {error || 'Customer not found'}
                    </p>
                    <button
                        onClick={() => navigate('/dashboard/users')}
                        className="px-4 py-2 bg-[#0E7A60] text-white rounded-lg hover:bg-[#0A5F4A]"
                    >
                        Back to Users
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full flex gap-6'>
            <div className='flex-1/4'>
                <UserCard customer={customerData.customer} statistics={customerData.statistics} />
            </div>

            <div className='flex-3/4'>
                <div className='flex flex-row gap-3 mb-4'>
                    <Link
                        to={`/dashboard/users/useraccount?id=${customerId}`}
                        className="btn p-3 bg-[#0E7A601A]/90 rounded-lg border border-[#0E7A60] text-sm font-semibold"
                    >
                        Account
                    </Link>
                </div>
                <UserActivity
                    activities={customerData.activities}
                    recentActivity={customerData.recentActivity}
                />
            </div>
        </div>
    );
};

export default UserAccount;