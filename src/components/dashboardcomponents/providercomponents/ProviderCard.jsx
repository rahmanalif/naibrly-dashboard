import React from "react";
import { Phone, Mail, MapPin, Calendar, User as UserIcon, Briefcase, Clock, Star, DollarSign } from "lucide-react";
import providerImage from "@/assets/provider.png";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProviderCard = ({ provider, statistics }) => {
    if (!provider) return null;

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return `$${(amount || 0).toFixed(2)}`;
    };

    const fullName = `${provider.firstName} ${provider.lastName}`;
    const businessName = provider.businessNameRegistered || provider.businessNameDBA || 'N/A';
    const location = provider.businessAddress ?
        `${provider.businessAddress.city}, ${provider.businessAddress.state}` :
        'Location not provided';

    // Format business hours
    const businessHours = provider.businessHours?.serviceDays?.length > 0
        ? `${provider.businessHours.serviceDays.join(', ')}`
        : 'Not specified';

    return (
        <div className="p-4 border shrink-0 rounded-lg shadow-md bg-white">
            <div className="flex items-center bg-[#1C59410D]/50 p-5 rounded-lg">
                <div className="p-[1px] rounded-full bg-gradient-to-b from-[#93E3A4] to-[#517D5A]">
                    <div className="w-16 h-16 rounded-full overflow-hidden m-[1px] bg-white p-[1px]">
                        <img
                            src={provider.profileImage?.url || providerImage}
                            alt={fullName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <div className="ml-4 flex flex-col gap-3">
                    <h2 className="text-xl font-semibold">{fullName}</h2>
                    <div className="flex items-center text-sm text-gray-500">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{provider.rating?.toFixed(1) || '0.0'} ({statistics?.totalReviews || 0} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className={`${
                            provider.isVerified ? 'bg-[#E4F6E8] text-[#3EBF5A]' : 'bg-gray-100 text-gray-600'
                        }`}>
                            {provider.isVerified ? 'Verified' : 'Unverified'}
                        </Badge>
                        <Badge className={`${
                            provider.isActive ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
                        }`}>
                            {provider.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            {statistics && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-semibold mb-3">Business Summary</h3>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                            <p className="text-gray-600">Bundles Completed</p>
                            <p className="font-semibold text-lg">{statistics.completedBundles || 0}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Services Done</p>
                            <p className="font-semibold text-lg">{statistics.completedServiceRequests || 0}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Total Earnings</p>
                            <p className="font-semibold text-lg">
                                {formatCurrency(statistics.totalProviderEarnings)}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Avg Rating</p>
                            <p className="font-semibold text-lg">
                                {statistics.averageRating?.toFixed(1) || '0.0'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-4">
                <hr />
                <h3 className="text-md font-semibold my-4">Business Details</h3>
                <hr />
                <div className="space-y-2 text-sm text-gray-600 mt-4">
                    <p className="flex items-center gap-2">
                        <Briefcase size={14} className="inline" />
                        <strong>Business:</strong> {businessName}
                    </p>
                    <p className="flex items-center gap-2">
                        <UserIcon size={14} className="inline" />
                        <strong>Owner:</strong> {fullName}
                    </p>
                    <p className="flex items-center gap-2">
                        <MapPin size={14} className="inline" />
                        <strong>Location:</strong> {location}
                    </p>
                    {provider.businessAddress?.street && (
                        <p className="text-xs text-gray-500 ml-5">
                            {provider.businessAddress.street}
                            <br />
                            {provider.businessAddress.city}, {provider.businessAddress.state} {provider.businessAddress.zipCode}
                        </p>
                    )}
                    <p className="flex items-center gap-2">
                        <Clock size={14} className="inline" />
                        <strong>Service Days:</strong> {businessHours}
                    </p>
                    <p className="flex items-center gap-2">
                        <Calendar size={14} className="inline" />
                        <strong>Joined:</strong> {formatDate(provider.createdAt)}
                    </p>
                    <p className="flex items-center gap-2">
                        <Phone size={14} className="inline" />
                        <strong>Contact:</strong> {provider.phone || 'N/A'}
                    </p>
                    <p className="flex items-center gap-2">
                        <Mail size={14} className="inline" />
                        <strong>Email:</strong> {provider.email}
                    </p>
                    {provider.servicesProvided?.length > 0 && (
                        <div>
                            <p className="font-semibold mb-2">Services Provided:</p>
                            <div className="flex flex-wrap gap-2">
                                {provider.servicesProvided.slice(0, 3).map((service, index) => (
                                    <span key={index} className="bg-[#FFF7D6] px-2 py-1 text-[#F1C400] rounded-sm text-xs">
                                        {service.serviceType}
                                    </span>
                                ))}
                                {provider.servicesProvided.length > 3 && (
                                    <span className="text-xs text-gray-500">+{provider.servicesProvided.length - 3} more</span>
                                )}
                            </div>
                        </div>
                    )}
                    {statistics && (
                        <>
                            <p className="flex items-center gap-2">
                                <DollarSign size={14} className="inline" />
                                <strong>Available Balance:</strong> {formatCurrency(provider.availableBalance)}
                            </p>
                            <p className="flex items-center gap-2">
                                <strong>Commission Paid:</strong> {formatCurrency(statistics.totalCommissionPaid)}
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
                    {provider.isActive ? 'Ban' : 'Activate'}
                </Button>
            </div>
        </div>
    );
};

export default ProviderCard;
