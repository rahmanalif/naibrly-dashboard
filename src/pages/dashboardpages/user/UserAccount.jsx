import UserActivity from '@/components/dashboardcomponents/usercomponents/UserActivity';
import UserCard from '@/components/dashboardcomponents/usercomponents/UserCard';
import React from 'react';
import { Link } from 'react-router-dom';

const UserAccount = () => {
    return (
        // <div>
        //    <div>
        //     <UserCard></UserCard>
        //    </div>

        //    <div>
        //     <UserActivity></UserActivity>
        //    </div>
        // </div>

        <div className='w-full flex gap-6'>
            <div className='flex-1/4'>
                <UserCard></UserCard>
            </div>

            <div className='flex-3/4'>
                <div className='flex flex-row gap-3 mb-4'>
                    <Link to="/dashboard/users/useraccount" className="btn p-3 bg-[#0E7A601A]/90 rounded-lg border border-[#0E7A60] text-sm font-semibold">Account</Link>
                    
                </div>
                <UserActivity></UserActivity>
            </div>
        </div>
    );
};

export default UserAccount;