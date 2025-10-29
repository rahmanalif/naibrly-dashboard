import ProviderBillingCard from '@/components/dashboardcomponents/providercomponents/ProviderBillingCard';
import ProviderCard from '@/components/dashboardcomponents/providercomponents/ProviderCard';
import React from 'react';
import { Link } from 'react-router-dom';

const ProvidersAccount = () => {
    return (
        <div className='w-full flex gap-6'>
            <div className='flex-1/4'>
                <ProviderCard></ProviderCard>
            </div>

            <div className='flex-3/4'>
                <div className='flex flex-row gap-3 mb-4'>
                    <Link to="/dashboard/providers/provideraccount" className="btn p-3 bg-[#0E7A601A]/90 rounded-lg border border-[#0E7A60] text-sm font-semibold">Account</Link>
                    <Link to="/dashboard/providers/providerbilling" className="btn p-3 font-semibold text-sm">Billing</Link>
                </div>
                <ProviderBillingCard></ProviderBillingCard>
            </div>
        </div>
    );
};

export default ProvidersAccount;