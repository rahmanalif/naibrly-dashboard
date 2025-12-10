import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, CreditCard, Download, Loader2, Mail, Printer, User } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import {
    getAllTransactions,
    formatTransactionDate,
    formatCurrency,
    getStatusColor,
    getCustomerName,
    getProviderName,
    getTransactionId,
    getCommissionSettings,
    updateCommissionSettings
} from '@/services/paymentService';

// Manage Charge Icon SVG Component
const ManageChargeIcon = () => (
    <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.75 8.75H18.75" stroke="#666666" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M12.75 4.75L14.75 4.75" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.75 11.75V9.75C18.75 5.50736 18.75 3.38604 17.432 2.06802C16.114 0.75 13.9926 0.75 9.75 0.75C5.50736 0.75 3.38604 0.75 2.06802 2.06802C0.75 3.38604 0.75 5.50736 0.75 9.75V11.75C0.75 15.9926 0.75 18.114 2.06802 19.432C3.38604 20.75 5.50736 20.75 9.75 20.75C13.9926 20.75 16.114 20.75 17.432 19.432C18.75 18.114 18.75 15.9926 18.75 11.75Z" stroke="#666666" strokeWidth="1.5"/>
        <path d="M4.75 12.75H5.27632M9.48684 12.75H10.0132M14.2237 12.75H14.75" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.75 16.75H5.27632M9.48684 16.75H10.0132M14.2237 16.75H14.75" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const DashPayment = () => {
    // State management
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isManageChargeOpen, setIsManageChargeOpen] = useState(false);
    const [serviceCommission, setServiceCommission] = useState("");
    const [bundleCommission, setBundleCommission] = useState("");
    const [settingsLoading, setSettingsLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Fetch recent transactions (limited to 6 for dashboard)
    const fetchRecentTransactions = async () => {
        try {
            setLoading(true);
            const response = await getAllTransactions({
                status: 'paid',
                page: 1,
                limit: 6 // Limit to 6 for dashboard overview
            });

            if (response.success) {
                setTransactions(response.data.transactions);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
            toast.error(error.message || 'Failed to fetch payment history');
        } finally {
            setLoading(false);
        }
    };

    // Fetch commission settings
    const fetchCommissionSettings = async () => {
        try {
            setSettingsLoading(true);
            const response = await getCommissionSettings();

            if (response.success) {
                setServiceCommission(response.data.settings.serviceCommission.toString());
                setBundleCommission(response.data.settings.bundleCommission.toString());
            }
        } catch (error) {
            console.error('Error fetching commission settings:', error);
            toast.error(error.message || 'Failed to fetch commission settings');
        } finally {
            setSettingsLoading(false);
        }
    };

    // Fetch transactions on mount
    useEffect(() => {
        fetchRecentTransactions();
    }, []);

    // Handle row click to open the dialog
    const handleRowClick = (transaction) => {
        setSelectedTransaction(transaction);
        setIsDialogOpen(true);
    };

    // Handle manage charge dialog
    const handleOpenManageCharge = () => {
        fetchCommissionSettings();
        setIsManageChargeOpen(true);
    };

    const handleSaveCharge = async () => {
        const serviceValue = parseFloat(serviceCommission);
        const bundleValue = parseFloat(bundleCommission);

        // Validation
        if (isNaN(serviceValue) || isNaN(bundleValue)) {
            toast.error('Please enter valid numbers for commission rates');
            return;
        }

        if (serviceValue < 0 || serviceValue > 50) {
            toast.error('Service commission must be between 0% and 50%');
            return;
        }

        if (bundleValue < 0 || bundleValue > 50) {
            toast.error('Bundle commission must be between 0% and 50%');
            return;
        }

        try {
            setSubmitting(true);
            const response = await updateCommissionSettings({
                serviceCommission: serviceValue,
                bundleCommission: bundleValue
            });

            if (response.success) {
                toast.success('Commission settings updated successfully');
                setIsManageChargeOpen(false);
                // Refresh transactions to show updated commission
                fetchRecentTransactions();
            }
        } catch (error) {
            console.error('Error updating commission settings:', error);
            toast.error(error.message || 'Failed to update commission settings');
        } finally {
            setSubmitting(false);
        }
    };

    const renderTableRows = () => {
        if (loading) {
            return (
                <tr>
                    <td colSpan="7" className="px-6 py-8 text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-[#0E7A60] mx-auto" />
                    </td>
                </tr>
            );
        }

        if (transactions.length === 0) {
            return (
                <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                        No payment history found
                    </td>
                </tr>
            );
        }

        return transactions.map((transaction) => (
            <tr
                key={transaction._id}
                className="border-b hover:bg-[#0E7A601A] cursor-pointer"
                onClick={() => handleRowClick(transaction)}
            >
                <td className="px-6 py-4">
                    {formatTransactionDate(transaction.paymentDetails?.paidAt || transaction.createdAt)}
                </td>
                <td className="px-6 py-4">{getTransactionId(transaction)}</td>
                <td className="px-6 py-4">{getProviderName(transaction.provider)}</td>
                <td className="px-6 py-4">{getCustomerName(transaction.customer)}</td>
                <td className="px-6 py-4">{formatCurrency(transaction.amount)}</td>
                <td className="px-6 py-4">{formatCurrency(transaction.commission?.amount || 0)}</td>
                <td className="px-6 py-4">{formatCurrency(transaction.commission?.providerAmount || 0)}</td>
            </tr>
        ));
    };

    return (
        <div className="mx-auto p-6 rounded-lg shadow-sm bg-white mt-5">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center text-lg font-semibold">All Payment History</div>
                <div className="flex flex-row gap-3 items-center">
                    <Button
                        variant="outline"
                        onClick={handleOpenManageCharge}
                        className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50"
                    >
                        <ManageChargeIcon />
                        <span className="text-sm text-gray-700">Manage Charge</span>
                    </Button>
                    <Link to="/dashboard/payment" className="border-0 underline shadow-none text-[#0E7A60]">
                        See All
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Transaction ID</th>
                            <th className="px-6 py-4">Provider</th>
                            <th scope="col" className="px-6 py-3">User</th>
                            <th scope="col" className="px-6 py-3">Amount</th>
                            <th scope="col" className="px-6 py-3">Charge</th>
                            <th scope="col" className="px-6 py-3">Providers Amount</th>
                        </tr>
                    </thead>
                    <tbody>{renderTableRows()}</tbody>
                </table>
            </div>

            {/* Commission Control Dialog */}
            <Dialog open={isManageChargeOpen} onOpenChange={setIsManageChargeOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Commission Control</DialogTitle>
                    </DialogHeader>

                    {settingsLoading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-[#0E7A60]" />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 py-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="serviceCommission" className="text-base font-medium text-gray-900">
                                    Service Commission Rate (%)
                                </label>
                                <Input
                                    id="serviceCommission"
                                    type="number"
                                    min="0"
                                    max="50"
                                    step="0.1"
                                    value={serviceCommission}
                                    onChange={(e) => setServiceCommission(e.target.value)}
                                    placeholder="5"
                                    className="w-full text-base py-6"
                                    disabled={submitting}
                                />
                                <p className="text-xs text-gray-500">
                                    Commission rate for individual services (0% - 50%)
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="bundleCommission" className="text-base font-medium text-gray-900">
                                    Bundle Commission Rate (%)
                                </label>
                                <Input
                                    id="bundleCommission"
                                    type="number"
                                    min="0"
                                    max="50"
                                    step="0.1"
                                    value={bundleCommission}
                                    onChange={(e) => setBundleCommission(e.target.value)}
                                    placeholder="5"
                                    className="w-full text-base py-6"
                                    disabled={submitting}
                                />
                                <p className="text-xs text-gray-500">
                                    Commission rate for bundle packages (0% - 50%)
                                </p>
                            </div>

                            <Button
                                onClick={handleSaveCharge}
                                className="w-full bg-[#0E7A60] hover:bg-[#0A5F4A] text-white rounded-lg py-6 font-medium text-base"
                                disabled={submitting}
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        Saving...
                                    </>
                                ) : (
                                    'Save'
                                )}
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Dialog (Modal) for displaying receipt */}
            {selectedTransaction && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-[600px] max-h-[90vh] overflow-y-auto bg-white">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">Receipt</h3>
                                <p className="text-xs text-gray-500 mt-1 break-all">
                                    Transaction ID: {getTransactionId(selectedTransaction)}
                                </p>
                            </div>
                            <Badge className={`${getStatusColor(selectedTransaction.status)} border-none capitalize`}>
                                {selectedTransaction.status}
                            </Badge>
                        </div>

                        {/* User & Provider Information */}
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <h4 className="font-semibold text-sm text-gray-900 mb-3">User Information</h4>
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <User className="w-4 h-4 flex-shrink-0" />
                                    <span>{getCustomerName(selectedTransaction.customer)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="w-4 h-4 flex-shrink-0 text-gray-700" />
                                    <span className="text-blue-600 break-all">{selectedTransaction.customer?.email || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <Calendar className="w-4 h-4 flex-shrink-0" />
                                    <span>{formatTransactionDate(selectedTransaction.paymentDetails?.paidAt)}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-semibold text-sm text-gray-900 mb-3">Provider Information</h4>
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <User className="w-4 h-4 flex-shrink-0" />
                                    <span>{getProviderName(selectedTransaction.provider)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <Mail className="w-4 h-4 flex-shrink-0 text-gray-700" />
                                    <span className="text-blue-600 break-all">{selectedTransaction.provider?.email || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    <Calendar className="w-4 h-4 flex-shrink-0" />
                                    <span>{formatTransactionDate(selectedTransaction.createdAt)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Transaction info */}
                        <div className="mt-6 space-y-3">
                            <h4 className="font-semibold text-sm text-gray-900">Transaction Information</h4>
                            <div className="border rounded-lg divide-y">
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-gray-600">Date:</span>
                                    <span className="text-sm text-gray-900 font-medium">
                                        {formatTransactionDate(selectedTransaction.paymentDetails?.paidAt)}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-gray-600">Service Type:</span>
                                    <span className="text-sm text-gray-900 font-medium">
                                        {selectedTransaction.serviceRequest?.serviceType ||
                                         selectedTransaction.bundle?.name || 'N/A'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-gray-600">Status:</span>
                                    <span className="text-sm text-green-600 font-medium capitalize">
                                        {selectedTransaction.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Amount Details */}
                        <div className="mt-6 space-y-3">
                            <div className="flex items-center gap-2 text-sm text-gray-700 mb-3">
                                <CreditCard className="w-4 h-4" />
                                <span className="font-medium">Payment Method:</span>
                                <span className="text-gray-900 capitalize">
                                    {selectedTransaction.paymentDetails?.paymentMethod || 'Card'}
                                </span>
                                {selectedTransaction.paymentDetails?.cardLast4 && (
                                    <span className="text-gray-600 text-xs">
                                        (****{selectedTransaction.paymentDetails.cardLast4})
                                    </span>
                                )}
                            </div>
                            <div className="border rounded-lg divide-y bg-gray-50">
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-gray-600">Base Amount:</span>
                                    <span className="text-sm text-gray-900 font-medium">{formatCurrency(selectedTransaction.amount)}</span>
                                </div>
                                {selectedTransaction.tipAmount > 0 && (
                                    <div className="flex justify-between items-center px-4 py-3">
                                        <span className="text-sm text-gray-600">Tip:</span>
                                        <span className="text-sm text-gray-900 font-medium">{formatCurrency(selectedTransaction.tipAmount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center px-4 py-3 bg-white">
                                    <span className="text-sm font-semibold text-gray-900">Total Amount:</span>
                                    <span className="text-sm font-semibold text-gray-900">{formatCurrency(selectedTransaction.totalAmount)}</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3">
                                    <span className="text-sm text-red-600">Platform Charge:</span>
                                    <span className="text-sm text-red-600 font-medium">-{formatCurrency(selectedTransaction.commission?.amount || 0)}</span>
                                </div>
                                <div className="flex justify-between items-center px-4 py-3 bg-green-50">
                                    <span className="text-sm font-semibold text-green-700">Provider Received:</span>
                                    <span className="text-sm font-semibold text-green-700">{formatCurrency(selectedTransaction.commission?.providerAmount || 0)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Download & Print Options */}
                        <div className="mt-8 flex justify-center gap-3 pt-4 border-t">
                            <Button
                                variant="outline"
                                className="text-[#0E7A60] border border-[#0E7A60] hover:bg-[#0E7A60]/10 flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                <span>Download PDF</span>
                            </Button>
                            <Button
                                className="bg-[#0E7A60] hover:bg-[#0A5F4A] text-white flex items-center gap-2"
                                onClick={() => window.print()}
                            >
                                <Printer className="w-4 h-4" />
                                <span>Print Receipt</span>
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default DashPayment;
