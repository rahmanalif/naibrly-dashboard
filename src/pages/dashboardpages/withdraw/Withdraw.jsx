


import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { toast } from 'sonner';
import {
  getAllWithdrawals,
  approveWithdrawal,
  rejectWithdrawal,
  formatWithdrawalDate,
  formatWithdrawalAmount,
  getProviderName,
  getAccountNumber,
  getWithdrawalStatusClass
} from '@/services/withdrawalService';

const Withdraw = () => {
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [openRejectDialog, setOpenRejectDialog] = useState(false);
  const [openFinalApproveDialog, setOpenFinalApproveDialog] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch withdrawals on component mount
  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const response = await getAllWithdrawals();

      console.log('API Response:', response);
      console.log('Withdrawals data:', response.data?.withdrawals);

      if (response.success) {
        const withdrawals = response.data.withdrawals || [];
        console.log('First withdrawal object:', withdrawals[0]);
        console.log('Has payoutInformation?', withdrawals[0]?.payoutInformation);
        setWithdrawals(withdrawals);
      }
    } catch (error) {
      console.error('Error fetching withdrawals:', error);
      toast.error(error.message || 'Failed to fetch withdrawal requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveClick = (withdrawal) => {
    console.log('Selected withdrawal:', withdrawal);
    console.log('Full withdrawal object:', JSON.stringify(withdrawal, null, 2));
    console.log('Provider:', withdrawal?.provider);
    console.log('Payout Info:', withdrawal?.provider?.payoutInformation);
    setSelectedRequest(withdrawal);
    setOpenApproveDialog(true);
  };

  // Helper function to get payout information
  const getPayoutInfo = (request) => {
    return request?.provider?.payoutInformation || request?.payoutInformation || null;
  };

  const handleRejectClick = (withdrawal) => {
    setSelectedRequest(withdrawal);
    setOpenRejectDialog(true);
  };

  const handleApproveRequestClick = () => {
    setOpenApproveDialog(false);
    setOpenFinalApproveDialog(true);
  };

  const handleFinalApprove = async () => {
    if (!selectedRequest) return;

    try {
      setProcessing(true);
      const response = await approveWithdrawal(selectedRequest._id, {
        notes: 'Approved by admin'
      });

      if (response.success) {
        toast.success('Withdrawal request approved successfully');
        setOpenFinalApproveDialog(false);
        setSelectedRequest(null);
        // Refresh withdrawals list
        await fetchWithdrawals();
      }
    } catch (error) {
      console.error('Error approving withdrawal:', error);
      toast.error(error.message || 'Failed to approve withdrawal request');
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!selectedRequest) return;

    try {
      setProcessing(true);
      const response = await rejectWithdrawal(selectedRequest._id, {
        notes: 'Rejected by admin'
      });

      if (response.success) {
        toast.success('Withdrawal request rejected successfully');
        setOpenRejectDialog(false);
        setSelectedRequest(null);
        // Refresh withdrawals list
        await fetchWithdrawals();
      }
    } catch (error) {
      console.error('Error rejecting withdrawal:', error);
      toast.error(error.message || 'Failed to reject withdrawal request');
    } finally {
      setProcessing(false);
    }
  };

  // Pagination
  const totalPages = Math.ceil(withdrawals.length / rowsPerPage);
  const paginatedWithdrawals = withdrawals.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Withdraw History</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 text-left">
              <input type="checkbox" className="form-checkbox" />
            </th>
            <th className="border-b px-4 py-2 text-left">#</th>
            <th className="border-b px-4 py-2 text-left">User</th>
            <th className="border-b px-4 py-2 text-left">Account No</th>
            <th className="border-b px-4 py-2 text-left">Amount</th>
            <th className="border-b px-4 py-2 text-left">Request Date</th>
            <th className="border-b px-4 py-2 text-left">Status</th>
            <th className="border-b px-4 py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8" className="border-b px-4 py-8 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#0E7A60] mx-auto" />
              </td>
            </tr>
          ) : paginatedWithdrawals.length === 0 ? (
            <tr>
              <td colSpan="8" className="border-b px-4 py-8 text-center text-gray-500">
                No withdrawal requests found
              </td>
            </tr>
          ) : (
            paginatedWithdrawals.map((withdrawal, index) => (
              <tr key={withdrawal._id} className="hover:bg-[#0E7A601A]">
                <td className="border-b px-4 py-2">
                  <input type="checkbox" className="form-checkbox" />
                </td>
                <td className="border-b px-4 py-2">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                <td className="border-b px-4 py-2">{getProviderName(withdrawal.provider)}</td>
                <td className="border-b px-4 py-2">{getAccountNumber(withdrawal.provider)}</td>
                <td className="border-b px-4 py-2">{formatWithdrawalAmount(withdrawal.amount)}</td>
                <td className="border-b px-4 py-2">{formatWithdrawalDate(withdrawal.createdAt)}</td>
                <td className="border-b px-4 py-2">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${getWithdrawalStatusClass(withdrawal.status)}`}>
                    {withdrawal.status}
                  </span>
                </td>
                <td className="border-b px-4 py-2">
                  <div className="text-right">
                    {withdrawal.status === 'pending' ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2 bg-[#0E7A601A]/90 hover:bg-[#0E7A601A]/90"
                          onClick={() => handleRejectClick(withdrawal)}
                          disabled={processing}
                        >
                          Reject
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-[#0E7A60] text-white hover:bg-[#0E7A60] hover:text-white"
                          onClick={() => handleApproveClick(withdrawal)}
                          disabled={processing}
                        >
                          Approve
                        </Button>
                      </>
                    ) : (
                      <span className="text-sm text-gray-500 capitalize">{withdrawal.status}</span>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination footer */}
      <div className="flex justify-end items-center mt-4 text-sm text-gray-500 gap-5">
        <div className="flex items-center gap-2">
          Rows per page:
          <select
            className="border rounded-md px-2 py-1"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex flex-row items-center gap-3">
          <p>Page {currentPage} of {totalPages || 1}</p>
          <button
            className="btn border p-1 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft />
          </button>
          <button
            className="btn border p-1 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* Approve Dialog Component */}
      <Dialog open={openApproveDialog} onOpenChange={setOpenApproveDialog}>
        <DialogTrigger />
        <DialogContent className="w-[400px] p-6 rounded-lg bg-white">
          <DialogHeader>
            <div className="flex flex-row justify-between">
              <DialogTitle className="text-sm font-normal">Withdraw</DialogTitle>
              <p className="font-medium lg:text-lg">{formatWithdrawalAmount(selectedRequest?.amount)}</p>
            </div>
            <p className="font-medium lg:text-lg">{getProviderName(selectedRequest?.provider)}</p>
            <DialogDescription>
              <div>
                {/* Payout Information Section */}
                {getPayoutInfo(selectedRequest) ? (
                  <>
                    <div className="flex flex-row justify-between">
                      <p className="py-3 text-sm font-semibold text-[#585858]">Bank Name:</p>
                      <p className="py-3 text-sm font-semibold text-[#101010]">{getPayoutInfo(selectedRequest)?.bankName || 'N/A'}</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                      <p className="py-3 text-sm font-semibold text-[#585858]">Bank Code:</p>
                      <p className="py-3 text-sm font-semibold text-[#101010]">{getPayoutInfo(selectedRequest)?.bankCode || 'N/A'}</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                      <p className="py-3 text-sm font-semibold text-[#585858]">Account Holder:</p>
                      <p className="py-3 text-sm font-semibold text-[#101010]">{getPayoutInfo(selectedRequest)?.accountHolderName || 'N/A'}</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                      <p className="py-3 text-sm font-semibold text-[#585858]">Account Type:</p>
                      <p className="py-3 text-sm font-semibold text-[#101010] capitalize">{getPayoutInfo(selectedRequest)?.accountType || 'N/A'}</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                      <p className="py-3 text-sm font-semibold text-[#585858]">Account Number:</p>
                      <p className="py-3 text-sm font-semibold text-[#101010]">{getPayoutInfo(selectedRequest)?.accountNumber || 'N/A'}</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                      <p className="py-3 text-sm font-semibold text-[#585858]">Last 4 Digits:</p>
                      <p className="py-3 text-sm font-semibold text-[#101010]">****{getPayoutInfo(selectedRequest)?.lastFourDigits || 'N/A'}</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                      <p className="py-3 text-sm font-semibold text-[#585858]">Routing Number:</p>
                      <p className="py-3 text-sm font-semibold text-[#101010]">{getPayoutInfo(selectedRequest)?.routingNumber || 'N/A'}</p>
                    </div>
                    <hr />
                  </>
                ) : (
                  <div className="py-4">
                    <p className="text-sm text-gray-500 text-center">No payout information available</p>
                    <hr className="mt-4" />
                  </div>
                )}
                <div className="flex flex-row justify-between">
                  <p className="py-3 text-sm font-semibold text-[#585858]">Request Date:</p>
                  <p className="py-3 text-sm font-semibold text-[#101010]">{formatWithdrawalDate(selectedRequest?.createdAt)}</p>
                </div>
                <hr />
              </div>
              <p className="mt-4 text-sm text-[#585858] py-4">
                Are you sure you want to approve this withdrawal request?
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="mr-2 border border-[#0E7A60] rounded-2xl text-[#0E7A60] hover:text-[#0E7A60]"
              onClick={() => setOpenApproveDialog(false)}
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#0E7A60] hover:bg-[#0E7A60] text-white"
              onClick={handleApproveRequestClick}
              disabled={processing}
            >
              Approve Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Final Approve Confirmation Dialog */}
      <Dialog open={openFinalApproveDialog} onOpenChange={setOpenFinalApproveDialog}>
        <DialogTrigger />
        <DialogContent className="w-[400px] p-6 rounded-lg bg-white">
          <DialogHeader>
            <div className="flex flex-row justify-between">
              <DialogTitle className="text-sm font-normal">Withdraw</DialogTitle>
              <p className="font-medium lg:text-lg">{formatWithdrawalAmount(selectedRequest?.amount)}</p>
            </div>
            <p className="font-medium lg:text-lg">{getProviderName(selectedRequest?.provider)}</p>
            <DialogDescription>
              <div>
                {/* Payout Information Section */}
                {getPayoutInfo(selectedRequest) ? (
                  <>
                    <div className="flex flex-row justify-between">
                      <p className="py-3 text-sm font-semibold text-[#585858]">Bank Name:</p>
                      <p className="py-3 text-sm font-semibold text-[#101010]">{getPayoutInfo(selectedRequest)?.bankName || 'N/A'}</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                      <p className="py-3 text-sm font-semibold text-[#585858]">Bank Code:</p>
                      <p className="py-3 text-sm font-semibold text-[#101010]">{getPayoutInfo(selectedRequest)?.bankCode || 'N/A'}</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                      <p className="py-3 text-sm font-semibold text-[#585858]">Account Holder:</p>
                      <p className="py-3 text-sm font-semibold text-[#101010]">{getPayoutInfo(selectedRequest)?.accountHolderName || 'N/A'}</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                      <p className="py-3 text-sm font-semibold text-[#585858]">Account Type:</p>
                      <p className="py-3 text-sm font-semibold text-[#101010] capitalize">{getPayoutInfo(selectedRequest)?.accountType || 'N/A'}</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                      <p className="py-3 text-sm font-semibold text-[#585858]">Account Number:</p>
                      <p className="py-3 text-sm font-semibold text-[#101010]">{getPayoutInfo(selectedRequest)?.accountNumber || 'N/A'}</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                      <p className="py-3 text-sm font-semibold text-[#585858]">Last 4 Digits:</p>
                      <p className="py-3 text-sm font-semibold text-[#101010]">****{getPayoutInfo(selectedRequest)?.lastFourDigits || 'N/A'}</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                      <p className="py-3 text-sm font-semibold text-[#585858]">Routing Number:</p>
                      <p className="py-3 text-sm font-semibold text-[#101010]">{getPayoutInfo(selectedRequest)?.routingNumber || 'N/A'}</p>
                    </div>
                    <hr />
                  </>
                ) : (
                  <div className="py-4">
                    <p className="text-sm text-gray-500 text-center">No payout information available</p>
                    <hr className="mt-4" />
                  </div>
                )}
                <div className="flex flex-row justify-between">
                  <p className="py-3 text-sm font-semibold text-[#585858]">Request Date:</p>
                  <p className="py-3 text-sm font-semibold text-[#101010]">{formatWithdrawalDate(selectedRequest?.createdAt)}</p>
                </div>
                <hr />
              </div>
              <p className="mt-4 text-sm text-[#585858] py-4">
                Are you sure you want to approve this withdrawal request?
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="mr-2 border border-[#0E7A60] rounded-2xl text-[#0E7A60] hover:text-[#0E7A60]"
              onClick={() => setOpenFinalApproveDialog(false)}
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#0E7A60] hover:bg-[#0E7A60] text-white"
              onClick={handleFinalApprove}
              disabled={processing}
            >
              {processing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                'Yes, Approve'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog Component */}
      <Dialog open={openRejectDialog} onOpenChange={setOpenRejectDialog}>
        <DialogTrigger />
        <DialogContent className="w-[400px] p-6 rounded-lg bg-white">
          <DialogHeader>
            <div className="flex flex-row justify-between">
              <DialogTitle className="text-sm font-normal">Reject Withdrawal</DialogTitle>
              <p className="font-medium lg:text-lg">{formatWithdrawalAmount(selectedRequest?.amount)}</p>
            </div>
            <p className="font-medium lg:text-lg">{getProviderName(selectedRequest?.provider)}</p>
            <DialogDescription>
              <div>
                {/* Payout Information Section */}
                {getPayoutInfo(selectedRequest) ? (
                  <>
                    <div className="flex flex-row justify-between">
                      <p className="py-3 text-sm font-semibold text-[#585858]">Bank Name:</p>
                      <p className="py-3 text-sm font-semibold text-[#101010]">{getPayoutInfo(selectedRequest)?.bankName || 'N/A'}</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                      <p className="py-3 text-sm font-semibold text-[#585858]">Bank Code:</p>
                      <p className="py-3 text-sm font-semibold text-[#101010]">{getPayoutInfo(selectedRequest)?.bankCode || 'N/A'}</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                      <p className="py-3 text-sm font-semibold text-[#585858]">Account Holder:</p>
                      <p className="py-3 text-sm font-semibold text-[#101010]">{getPayoutInfo(selectedRequest)?.accountHolderName || 'N/A'}</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                      <p className="py-3 text-sm font-semibold text-[#585858]">Account Type:</p>
                      <p className="py-3 text-sm font-semibold text-[#101010] capitalize">{getPayoutInfo(selectedRequest)?.accountType || 'N/A'}</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                      <p className="py-3 text-sm font-semibold text-[#585858]">Account Number:</p>
                      <p className="py-3 text-sm font-semibold text-[#101010]">{getPayoutInfo(selectedRequest)?.accountNumber || 'N/A'}</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                      <p className="py-3 text-sm font-semibold text-[#585858]">Last 4 Digits:</p>
                      <p className="py-3 text-sm font-semibold text-[#101010]">****{getPayoutInfo(selectedRequest)?.lastFourDigits || 'N/A'}</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                      <p className="py-3 text-sm font-semibold text-[#585858]">Routing Number:</p>
                      <p className="py-3 text-sm font-semibold text-[#101010]">{getPayoutInfo(selectedRequest)?.routingNumber || 'N/A'}</p>
                    </div>
                    <hr />
                  </>
                ) : (
                  <div className="py-4">
                    <p className="text-sm text-gray-500 text-center">No payout information available</p>
                    <hr className="mt-4" />
                  </div>
                )}
                <div className="flex flex-row justify-between">
                  <p className="py-3 text-sm font-semibold text-[#585858]">Request Date:</p>
                  <p className="py-3 text-sm font-semibold text-[#101010]">{formatWithdrawalDate(selectedRequest?.createdAt)}</p>
                </div>
                <hr />
              </div>
              <p className="mt-4 text-sm text-[#585858] py-4">
                Are you sure you want to reject this withdrawal request? The amount will be returned to the provider's available balance.
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="mr-2 border border-gray-300 rounded-2xl text-gray-700 hover:text-gray-700"
              onClick={() => setOpenRejectDialog(false)}
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleReject}
              disabled={processing}
            >
              {processing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                'Yes, Reject'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Withdraw;
