// import React from 'react';

// const usercard = () => {
//     return (
//         <div>
//             user crd here
//         </div>
//     );
// };

// export default usercard;




import React from "react";
import { Phone, Mail, MapPin, Calendar, User as UserIcon } from "lucide-react";
import providerImage from "@/assets/provider.png";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const UserCard = ({ customer, statistics }) => {
    if (!customer) return null;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const fullName = `${customer.firstName} ${customer.lastName}`;
    const location = customer.address ?
        `${customer.address.city}, ${customer.address.state}` :
        'Location not provided';

    return (
        <div className=" p-4 border shrink-0 rounded-lg shadow-md bg-white">
            <div className="flex items-center bg-[#1C59410D]/50 p-5 rounded-lg">
                <div className="p-[1px] rounded-full bg-gradient-to-b from-[#93E3A4] to-[#517D5A]">
                    <div className="w-16 h-16 rounded-full overflow-hidden m-[1px] bg-white p-[1px]">
                        <img
                            src={customer.profileImage?.url || providerImage}
                            alt={fullName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <div className="ml-4 flex flex-col gap-3">
                    <h2 className="text-xl font-semibold">{fullName}</h2>
                    <div className="flex items-center text-sm text-gray-500">
                        <span className={`border py-1 px-3 rounded-sm ${
                            customer.isActive ? 'border-[#3EBF5A] text-[#3EBF5A]' : 'border-red-500 text-red-500'
                        }`}>
                            {customer.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            {statistics && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-semibold mb-3">Activity Summary</h3>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                            <p className="text-gray-600">Bundles Created</p>
                            <p className="font-semibold text-lg">{statistics.totalBundlesCreated}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Bundles Joined</p>
                            <p className="font-semibold text-lg">{statistics.totalBundlesJoined}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Service Requests</p>
                            <p className="font-semibold text-lg">{statistics.totalServiceRequests}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Total Spent</p>
                            <p className="font-semibold text-lg">
                                ${(statistics.totalAmountPaid || 0).toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-4">
                <hr />
                <h3 className="text-md font-semibold my-4">Contact Details</h3>
                <hr />
                <div className="space-y-2 text-sm text-gray-600 mt-4">
                    <p className="flex items-center gap-2">
                        <UserIcon size={14} className="inline" />
                        <strong>Name:</strong> {fullName}
                    </p>
                    <p className="flex items-center gap-2">
                        <MapPin size={14} className="inline" />
                        <strong>Location:</strong> {location}
                    </p>
                    {customer.address?.street && (
                        <p className="text-xs text-gray-500 ml-5">
                            {customer.address.street}
                            {customer.address.aptSuite && `, ${customer.address.aptSuite}`}
                            <br />
                            {customer.address.city}, {customer.address.state} {customer.address.zipCode}
                        </p>
                    )}
                    <p className="flex items-center gap-2">
                        <Calendar size={14} className="inline" />
                        <strong>Joined:</strong> {formatDate(customer.createdAt)}
                    </p>
                    <p className="flex items-center gap-2">
                        <Phone size={14} className="inline" />
                        <strong>Contact:</strong> {customer.phone || 'N/A'}
                    </p>
                    <p className="flex items-center gap-2">
                        <Mail size={14} className="inline" />
                        <strong>Email:</strong> {customer.email}
                    </p>
                    {statistics && (
                        <>
                            <p className="flex items-center gap-2">
                                <strong>Total Reviews:</strong> {statistics.totalReviews}
                            </p>
                            <p className="flex items-center gap-2">
                                <strong>Total Tips Given:</strong> ${(statistics.totalTipsGiven || 0).toFixed(2)}
                            </p>
                        </>
                    )}
                </div>
            </div>
            <div className="ml-auto flex justify-center my-5">
                <Button
                    variant="outline"
                    className="bg-[#F34F4F] text-white hover:bg-[#D93F3F] hover:text-white px-8 py-5 text-base"
                >
                    {customer.isActive ? 'Ban' : 'Activate'}
                </Button>
            </div>
        </div>
    );
};

export default UserCard;
