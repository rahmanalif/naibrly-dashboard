


import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // ShadCN button component
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog"; // ShadCN Dialog component

const Withdraw = () => {
  const [openApproveDialog, setOpenApproveDialog] = useState(false); // State for approve dialog
  const [openFinalApproveDialog, setOpenFinalApproveDialog] = useState(false); // State for final approve confirmation dialog
  const [selectedRequest, setSelectedRequest] = useState(null);

  const rows = [
    {
      id: 1,
      user: "Albert Flores",
      accountNo: "93597",
      amount: "$900",
      requestDate: "27/03/2025",
      status: "Pending",
    },
    {
      id: 2,
      user: "Albert Flores",
      accountNo: "93597",
      amount: "$900",
      requestDate: "27/03/2025",
      status: "Pending",
    },
    {
      id: 3,
      user: "Albert Flores",
      accountNo: "93597",
      amount: "$900",
      requestDate: "27/03/2025",
      status: "Pending",
    },
    {
      id: 4,
      user: "Albert Flores",
      accountNo: "93597",
      amount: "$900",
      requestDate: "27/03/2025",
      status: "Pending",
    },
    {
      id: 5,
      user: "Albert Flores",
      accountNo: "93597",
      amount: "$900",
      requestDate: "27/03/2025",
      status: "Pending",
    },
    {
      id: 6,
      user: "Albert Flores",
      accountNo: "93597",
      amount: "$900",
      requestDate: "27/03/2025",
      status: "Pending",
    },
    {
      id: 7,
      user: "Albert Flores",
      accountNo: "93597",
      amount: "$900",
      requestDate: "27/03/2025",
      status: "Pending",
    },
    {
      id: 8,
      user: "Albert Flores",
      accountNo: "93597",
      amount: "$900",
      requestDate: "27/03/2025",
      status: "Pending",
    },
    {
      id: 9,
      user: "Albert Flores",
      accountNo: "93597",
      amount: "$900",
      requestDate: "27/03/2025",
      status: "Pending",
    },
    {
      id: 10,
      user: "Albert Flores",
      accountNo: "93597",
      amount: "$900",
      requestDate: "27/03/2025",
      status: "Pending",
    },
    // Other rows here...
  ];

  const handleApproveClick = (row) => {
    setSelectedRequest(row); // Set the selected request for the approve dialog
    setOpenApproveDialog(true); // Open the approve dialog
  };

  const handleApproveRequestClick = () => {
    setOpenApproveDialog(false); // Close the first dialog
    setOpenFinalApproveDialog(true); // Open the final confirmation dialog
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
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-[#0E7A601A]">
              <td className="border-b px-4 py-2">
                <input type="checkbox" className="form-checkbox" />
              </td>
              <td className="border-b px-4 py-2">{row.id}</td>
              <td className="border-b px-4 py-2">{row.user}</td>
              <td className="border-b px-4 py-2">{row.accountNo}</td>
              <td className="border-b px-4 py-2">{row.amount}</td>
              <td className="border-b px-4 py-2">{row.requestDate}</td>
              <td className="border-b px-4 py-2">{row.status}</td>
              <td className="border-b px-4 py-2">
                <div className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2 bg-[#0E7A601A]/90 hover:bg-[#0E7A601A]/90"
                  >
                    Reject
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-[#0E7A60] text-white hover:bg-[#0E7A60] hover:text-white"
                    onClick={() => handleApproveClick(row)} // Open the first approve dialog
                  >
                    Approve
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination footer */}
      <div className="flex justify-end items-center mt-4 text-sm text-gray-500 gap-5">
        <div className="flex items-center gap-2">
          Rows per page:
          <select className="border rounded-md px-2 py-1">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
        <div className="flex flex-row items-center gap-3">
          <p>Page 1 of 7</p>
          <button className="btn border p-1 rounded-sm cursor-pointer">
            <ChevronLeft />
          </button>
          <button className="btn border p-1 rounded-sm cursor-pointer">
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
              <p className="font-medium lg:text-lg">{selectedRequest?.amount}</p>
            </div>
            <p className="font-medium lg:text-lg">{selectedRequest?.user}</p>
            <DialogDescription>
              <div>
                <div className="flex flex-row justify-between">
                  <p className="py-3 text-sm font-semibold text-[#585858]">Account No:</p>
                  <p className="py-3 text-sm font-semibold text-[#101010]">****{selectedRequest?.accountNo.slice(-4)}</p>
                </div>
                <hr />
                <div className="flex flex-row justify-between">
                  <p className="py-3 text-sm font-semibold text-[#585858]">Request Date: {selectedRequest?.requestDate}</p>
                  <p className="py-3 text-sm font-semibold text-[#101010]">{selectedRequest?.requestDate}</p>
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
            >
              Cancel
            </Button>
            <Button
              className="bg-[#0E7A60] hover:bg-[#0E7A60] text-white"
              onClick={handleApproveRequestClick} // Trigger the final confirmation dialog
            >
              Approve Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

     

      <Dialog open={openFinalApproveDialog} onOpenChange={setOpenFinalApproveDialog}>
        <DialogTrigger />
        <DialogContent className="w-[400px] p-6 rounded-lg bg-white">
          <DialogHeader>
            <div className="flex flex-row justify-between">
              <DialogTitle className="text-sm font-normal">Withdraw</DialogTitle>
              <p className="font-medium lg:text-lg">{selectedRequest?.amount}</p>
            </div>
            <p className="font-medium lg:text-lg">{selectedRequest?.user}</p>
            <DialogDescription>
              <div>
                <div className="flex flex-row justify-between">
                  <p className="py-3 text-sm font-semibold text-[#585858]">Account No:</p>
                  <p className="py-3 text-sm font-semibold text-[#101010]">****{selectedRequest?.accountNo.slice(-4)}</p>
                </div>
                <hr />
                <div className="flex flex-row justify-between">
                  <p className="py-3 text-sm font-semibold text-[#585858]">Request Date: {selectedRequest?.requestDate}</p>
                  <p className="py-3 text-sm font-semibold text-[#101010]">{selectedRequest?.requestDate}</p>
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
            >
              Cancel
            </Button>
            <Button
              className="bg-[#0E7A60] hover:bg-[#0E7A60] text-white"
              onClick={() => setOpenFinalApproveDialog(false)} // You can replace this with your approval logic
            >
              Yes, Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Withdraw;
