import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import api from "@/lib/api";

const ProviderInformation = ({ provider, verification, onRefresh }) => {
    const [showVerifyDialog, setShowVerifyDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!provider) return null;

    const formatValue = (value) => {
        return value || 'N/A';
    };

    const handleAccept = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await api.patch(`/admin/providers/${provider.id}/verification/approve`);

            if (response.data.success) {
                setShowVerifyDialog(false);
                // Refresh the provider data to show updated verification status
                if (onRefresh) {
                    onRefresh();
                }
                alert('Provider verification approved successfully!');
            }
        } catch (err) {
            console.error('Failed to approve verification:', err);
            setError(err.response?.data?.message || 'Failed to approve verification');
            alert(err.response?.data?.message || 'Failed to approve verification');
        } finally {
            setLoading(false);
        }
    };

    const handleReject = async () => {
        const reason = prompt('Please provide a reason for rejection:');
        if (!reason) {
            return; // User cancelled
        }

        try {
            setLoading(true);
            setError(null);

            const response = await api.patch(`/admin/providers/${provider.id}/verification/reject`, {
                rejectionReason: reason
            });

            if (response.data.success) {
                setShowVerifyDialog(false);
                // Refresh the provider data to show updated verification status
                if (onRefresh) {
                    onRefresh();
                }
                alert('Provider verification rejected successfully!');
            }
        } catch (err) {
            console.error('Failed to reject verification:', err);
            setError(err.response?.data?.message || 'Failed to reject verification');
            alert(err.response?.data?.message || 'Failed to reject verification');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Provider Information</h2>

            {/* Business Information Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
                <div>
                    <p className="text-sm text-gray-600 mb-1">Business Name:</p>
                    <p className="font-medium">{formatValue(provider.businessNameRegistered)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600 mb-1">Phone number:</p>
                    <p className="font-medium">{formatValue(provider.phone)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600 mb-1">Business Name (DBA):</p>
                    <p className="font-medium">{formatValue(provider.businessNameDBA)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600 mb-1">EIN Number:</p>
                    <p className="font-medium">{formatValue(verification?.einNumber)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600 mb-1">Email:</p>
                    <p className="font-medium">{formatValue(provider.email)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600 mb-1">Bank name:</p>
                    <p className="font-medium">{formatValue(provider.bankDetails?.bankName)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600 mb-1">Website:</p>
                    <p className="font-medium text-blue-600">
                        {provider.website ? (
                            <a href={provider.website} target="_blank" rel="noopener noreferrer">
                                {provider.website}
                            </a>
                        ) : 'N/A'}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-600 mb-1">Account number:</p>
                    <p className="font-medium">{formatValue(provider.bankDetails?.accountNumber)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600 mb-1">Address:</p>
                    <p className="font-medium">
                        {provider.businessAddress
                            ? `${provider.businessAddress.street}, ${provider.businessAddress.city}`
                            : 'N/A'}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-600 mb-1">Routing Number:</p>
                    <p className="font-medium">{formatValue(provider.bankDetails?.routingNumber)}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600 mb-1">Zip Code:</p>
                    <p className="font-medium">
                        {formatValue(provider.businessAddress?.zipCode)}
                    </p>
                </div>
            </div>

            {/* Verification Documents */}
            {verification && (
                <>
                    {/* Insurance Document */}
                    {verification.insuranceDocument && (
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold mb-3">Upload proof of insurance coverage</h3>
                            <div className="border-2 border-[#0E7A60] rounded-lg p-4 bg-[#F0FDF4]">
                                <img
                                    src={verification.insuranceDocument.url}
                                    alt="Insurance Document"
                                    className="w-full max-w-xs h-auto object-contain"
                                />
                            </div>
                        </div>
                    )}

                    {/* ID Cards */}
                    {(verification.idCardFront || verification.idCardBack) && (
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold mb-3">Owner Operator ID check</h3>
                            <div className="border-2 border-[#0E7A60] rounded-lg p-4 bg-[#F0FDF4] flex gap-4 flex-wrap">
                                {verification.idCardFront && (
                                    <img
                                        src={verification.idCardFront.url}
                                        alt="ID Card Front"
                                        className="w-64 h-auto object-contain"
                                    />
                                )}
                                {verification.idCardBack && (
                                    <img
                                        src={verification.idCardBack.url}
                                        alt="ID Card Back"
                                        className="w-64 h-auto object-contain"
                                    />
                                )}
                            </div>
                        </div>
                    )}

                    {/* Verification Card */}
                    <div className="mb-6 p-6 bg-[#F5F5F5] rounded-lg">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-20 h-20 rounded-full overflow-hidden bg-white border-2 border-gray-200">
                                <img
                                    src={provider.profileImage?.url || provider.businessLogo?.url}
                                    alt={provider.businessNameRegistered}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-xl mb-2">{provider.businessNameRegistered || `${provider.firstName} ${provider.lastName}`}</h3>
                                <Badge className="bg-blue-100 text-blue-700 px-3 py-1">Provider</Badge>
                            </div>
                        </div>

                        {/* Verification Actions */}
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-sm font-medium">Add verify</span>
                            <CheckCircle className="w-5 h-5 text-[#4FB2F3]" />
                        </div>

                        {/* Verification Buttons */}
                        {!provider.isVerified && (
                            <div className="mt-4">
                                {error && (
                                    <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                        {error}
                                    </div>
                                )}
                                <div className="flex gap-3">
                                    <Button
                                        onClick={handleReject}
                                        variant="outline"
                                        className="flex-1 bg-[#FDDEDE] text-[#F34F4F] border-0 hover:bg-[#FCC8C8] hover:text-[#F34F4F]"
                                        disabled={loading}
                                    >
                                        {loading ? 'Processing...' : 'Cancel'}
                                    </Button>
                                    <Button
                                        onClick={handleAccept}
                                        className="flex-1 bg-[#D4F6DC] text-[#3EBF5A] border-0 hover:bg-[#B8EFC4] hover:text-[#3EBF5A]"
                                        disabled={loading}
                                    >
                                        {loading ? 'Processing...' : 'Accept'}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Verification Status */}
                    {verification.status && (
                        <div className="mt-4 p-3 rounded-lg bg-gray-50">
                            <p className="text-sm">
                                <span className="font-semibold">Verification Status: </span>
                                <Badge className={
                                    verification.status === 'approved' ? 'bg-green-100 text-green-700' :
                                    verification.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-700'
                                }>
                                    {verification.status}
                                </Badge>
                            </p>
                            {verification.reviewedAt && (
                                <p className="text-sm text-gray-600 mt-1">
                                    Reviewed on: {new Date(verification.reviewedAt).toLocaleDateString()}
                                </p>
                            )}
                            {verification.rejectionReason && (
                                <p className="text-sm text-red-600 mt-1">
                                    Reason: {verification.rejectionReason}
                                </p>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ProviderInformation;
