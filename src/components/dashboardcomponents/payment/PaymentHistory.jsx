import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, CreditCard, Download, Eye, Loader2, Mail, Menu, Printer, Search, User } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogClose } from "@/components/ui/dialog";
import { toast } from 'sonner';
import {
    getAllTransactions,
    formatTransactionDate,
    formatCurrency,
    getStatusColor,
    getCustomerName,
    getProviderName,
    getTransactionId
} from '@/services/paymentService';

const PaymentHistory = () => {
    // State management
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        current: 1,
        total: 0,
        pages: 1
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Fetch transactions
    const fetchTransactions = async (page = 1, limit = 10) => {
        try {
            setLoading(true);
            const response = await getAllTransactions({
                status: 'paid',
                page,
                limit
            });

            if (response.success) {
                setTransactions(response.data.transactions);
                setPagination(response.data.pagination);
            }
        } catch (error) {
            console.error('Error fetching transactions:', error);
            toast.error(error.message || 'Failed to fetch payment history');
        } finally {
            setLoading(false);
        }
    };

    // Fetch on component mount
    useEffect(() => {
        fetchTransactions(pagination.current, rowsPerPage);
    }, []);

    // Handle pagination changes
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > pagination.pages) return;
        fetchTransactions(newPage, rowsPerPage);
    };

    const handleRowsPerPageChange = (e) => {
        const newLimit = parseInt(e.target.value);
        setRowsPerPage(newLimit);
        fetchTransactions(1, newLimit);
    };

    // Handle row click to open the dialog
    const handleRowClick = (transaction) => {
        setSelectedTransaction(transaction);
        setIsDialogOpen(true);
    };

    // Filter transactions based on search
    const filteredTransactions = transactions.filter((transaction) => {
        if (!searchQuery) return true;
        const searchLower = searchQuery.toLowerCase();
        const customerName = getCustomerName(transaction.customer).toLowerCase();
        const providerName = getProviderName(transaction.provider).toLowerCase();
        const transactionId = getTransactionId(transaction).toLowerCase();

        return (
            customerName.includes(searchLower) ||
            providerName.includes(searchLower) ||
            transactionId.includes(searchLower)
        );
    });

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

        if (filteredTransactions.length === 0) {
            return (
                <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                        No payment history found
                    </td>
                </tr>
            );
        }

        return filteredTransactions.map((transaction) => (
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
        <div className="mx-auto p-6 bg-white mt-5">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center text-lg font-semibold">All Payment History</div>
                <div className="flex flex-row gap-3 px-4 py-2 border rounded-md">
                    <Search />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
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

            {/* Pagination footer */}
            <div className="flex justify-end items-center mt-4 text-sm text-gray-500 gap-5">
                <div className="flex items-center gap-2">
                    Rows per page:
                    <select
                        className="border rounded-md px-2 py-1"
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        disabled={loading}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                <div className="flex flex-row items-center gap-3">
                    <p>Page {pagination.current} of {pagination.pages || 1}</p>
                    <button
                        className="btn border p-1 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handlePageChange(pagination.current - 1)}
                        disabled={pagination.current <= 1 || loading}
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        className="btn border p-1 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handlePageChange(pagination.current + 1)}
                        disabled={pagination.current >= pagination.pages || loading}
                    >
                        <ChevronRight />
                    </button>
                </div>
            </div>

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

export default PaymentHistory;
