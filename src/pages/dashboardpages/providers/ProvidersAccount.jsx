import ProviderCard from '@/components/dashboardcomponents/providercomponents/ProviderCard';
import ProviderActivity from '@/components/dashboardcomponents/providercomponents/ProviderActivity';
import ProviderInformation from '@/components/dashboardcomponents/providercomponents/ProviderInformation';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '@/lib/api';

const ProvidersAccount = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const providerId = searchParams.get('id');

    const [providerData, setProviderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('activity');

    const fetchProviderDetails = async () => {
        if (!providerId) {
            setError('No provider ID provided');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const response = await api.get(`/admin/providers/${providerId}`);

            if (response.data.success) {
                setProviderData(response.data.data);
            }
        } catch (err) {
            console.error('Failed to fetch provider details:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProviderDetails();
    }, [providerId]);

    if (loading) {
        return (
            <div className="w-full flex items-center justify-center h-96">
                <div className="flex flex-col items-center gap-3">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                    <p className="text-gray-600">Loading provider details...</p>
                </div>
            </div>
        );
    }

    if (error || !providerData) {
        return (
            <div className="w-full flex items-center justify-center h-96">
                <div className="text-center">
                    <p className="text-red-500 text-lg mb-4">
                        {error || 'Provider not found'}
                    </p>
                    <button
                        onClick={() => navigate('/dashboard/providers')}
                        className="px-4 py-2 bg-[#0E7A60] text-white rounded-lg hover:bg-[#0A5F4A]"
                    >
                        Back to Providers
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full flex gap-6'>
            <div className='flex-1/4'>
                <ProviderCard
                    provider={providerData.provider}
                    statistics={providerData.statistics}
                />
            </div>

            <div className='flex-3/4'>
                {/* Tabs */}
                <div className='flex flex-row gap-3 mb-4'>
                    <button
                        onClick={() => setActiveTab('activity')}
                        className={`btn p-3 rounded-lg text-sm font-semibold ${
                            activeTab === 'activity'
                                ? 'bg-[#0E7A601A]/90 border border-[#0E7A60]'
                                : 'bg-white border border-gray-300'
                        }`}
                    >
                        Activity
                    </button>
                    <button
                        onClick={() => setActiveTab('information')}
                        className={`btn p-3 rounded-lg text-sm font-semibold ${
                            activeTab === 'information'
                                ? 'bg-[#0E7A601A]/90 border border-[#0E7A60]'
                                : 'bg-white border border-gray-300'
                        }`}
                    >
                        Information's
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'activity' ? (
                    <ProviderActivity
                        activities={providerData.activities}
                        recentActivity={providerData.recentActivity}
                    />
                ) : (
                    <ProviderInformation
                        provider={providerData.provider}
                        verification={providerData.verification}
                        onRefresh={fetchProviderDetails}
                    />
                )}
            </div>
        </div>
    );
};

export default ProvidersAccount;
