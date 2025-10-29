// import React from 'react';

// const DashPayment = () => {
//     return (
//         <div>
            
//         </div>
//     );
// };

// export default DashPayment;




import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, CreditCard, Download, Eye, Mail, Menu, Printer, Search, User } from "lucide-react";
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // ShadCN Dialog components
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

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
    const users = [
        { date: "14:9:25 14/9/25", id: 29506, name: "Jacob Maicle", provider: "guy hill", amount: "$900", charge: "@45", email: "oxheart@email.com", recieved: "@855", status: "completed" },
        { date: "14:9:25 14/9/25", id: 29506, name: "Jacob Maicle", provider: "guy hill", amount: "$900", charge: "@45", email: "oxheart@email.com", recieved: "@855", status: "completed" },
        { date: "14:9:25 14/9/25", id: 29506, name: "Jacob Maicle", provider: "guy hill", amount: "$900", charge: "@45", email: "oxheart@email.com", recieved: "@855", status: "completed" },
        { date: "14:9:25 14/9/25", id: 29506, name: "Jacob Maicle", provider: "guy hill", amount: "$900", charge: "@45", email: "oxheart@email.com", recieved: "@855", status: "completed" },
        { date: "14:9:25 14/9/25", id: 29506, name: "Jacob Maicle", provider: "guy hill", amount: "$900", charge: "@45", email: "oxheart@email.com", recieved: "@855", status: "completed" },
        { date: "14:9:25 14/9/25", id: 29506, name: "Jacob Maicle", provider: "guy hill", amount: "$900", charge: "@45", email: "oxheart@email.com", recieved: "@855", status: "completed" },
        // Add other user data here
    ];

    // For dialog (modal) state
    const [selectedUser, setSelectedUser] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isManageChargeOpen, setIsManageChargeOpen] = useState(false);
    const [chargeRate, setChargeRate] = useState("5");

    // Handle row click to open the dialog
    const handleRowClick = (user) => {
        setSelectedUser(user);
        setIsDialogOpen(true); // Open the dialog
    };

    const renderTableRows = () => {
        return users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-[#0E7A601A] cursor-pointer" onClick={() => handleRowClick(user)}>
                <td className="px-6 py-4">{user.date}</td>
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">{user.provider}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.amount}</td>
                <td className="px-6 py-4">{user.charge}</td>
                <td className="px-6 py-4">{user.recieved}</td>
            </tr>
        ));
    };

    const handleSaveCharge = () => {
        console.log("Saving charge rate:", chargeRate);
        setIsManageChargeOpen(false);
    };

    return (
        <div className="mx-auto p-6 rounded-lg shadow-sm bg-white mt-5">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center text-lg font-semibold">All Payment History</div>
                <div className="flex flex-row gap-3 items-center">
                    <Button
                        variant="outline"
                        onClick={() => setIsManageChargeOpen(true)}
                        className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50"
                    >
                        <ManageChargeIcon />
                        <span className="text-sm text-gray-700">Manage Charge</span>
                    </Button>
                    <Link to="/dashboard/payment" className="border-0 underline shadow-none text-[#0E7A60]">See All</Link>
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
                            <th scope="col" className="px-6 py-3">Received</th>
                        </tr>
                    </thead>
                    <tbody>{renderTableRows()}</tbody>
                </table>
            </div>

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

            {/* Commission Control Dialog */}
            <Dialog open={isManageChargeOpen} onOpenChange={setIsManageChargeOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Commission Control</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4 py-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="chargeRate" className="text-base font-medium text-gray-900">
                                Change Rate
                            </label>
                            <Input
                                id="chargeRate"
                                type="text"
                                value={chargeRate}
                                onChange={(e) => setChargeRate(e.target.value)}
                                placeholder="5%"
                                className="w-full text-base py-6"
                            />
                        </div>
                        <Button
                            onClick={handleSaveCharge}
                            className="w-full bg-[#0E7A60] hover:bg-[#0A5F4A] text-white rounded-lg py-6 font-medium text-base"
                        >
                            Save
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Dialog (Modal) for displaying receipt */}
            {selectedUser && (
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    {/* <DialogTrigger>
                        <Button variant="outline">Open Receipt</Button>
                    </DialogTrigger> */}

                    <DialogContent className="w-[500px] p-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold">Receipt</h3>
                                <p className="text-sm text-gray-600">Transaction ID: {selectedUser.id}</p>
                            </div>

                           
                                
                                <Button variant="outline" className="text-[#0E7A60] bg-[#0E7A60]/10">Paid</Button>
                          

                        </div>

                        {/* User & Provider Information */}
                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-medium mb-2">User Information</h4>
                                <p className="flex gap-1"> <User />{selectedUser.name}</p>
                                <p className="text-blue-500 flex gap-1 my-3"> <span className="text-black"><Mail /></span> {selectedUser.email}</p>
                                <p className="flex gap-1"> <Calendar /> {selectedUser.date}</p>
                            </div>
                            <div>
                                <h4 className="font-medium mb-2">Provider Information</h4>
                                <p className="flex gap-1"><User />{selectedUser.provider}</p>
                                <p className="text-blue-500 flex gap-1 my-3"> <span className="text-black"><Mail /></span> {selectedUser.email}</p>
                                <p className="flex gap-1"> <Calendar /> {selectedUser.date}</p>
                            </div>
                        </div>

                        {/* user info */}
                        <div className="mt-6">
                            <div>
                                <h4 className="font-medium mb-2">User Information</h4>
                                <hr />
                                <div className="flex flex-row justify-between items-center my-2">
                                    <p>Date:</p>
                                    <p className="flex gap-1"> {selectedUser.date}</p>
                                </div>
                                <hr />
                                <div className="flex flex-row items-center justify-between my-2">
                                    <p>Time:</p>
                                    <p className="flex gap-1"> <span className="text-black"></span> {selectedUser.date}</p>
                                </div>
                                <hr />
                               <div className="flex items-center justify-between my-2">
                                <p>Status:</p>
                                 <p className="flex gap-1 text-green-600">  {selectedUser.status}</p>
                               </div>
                                <hr />
                            </div>

                        </div>
                        {/* Amount Details */}
                        <div className="mt-6">
                            <h4 className="font-medium flex gap-2 text-gray-600"> <span><CreditCard /></span> Payment Method: <span className="text-black">Credit Crad</span> </h4>
                            <div className="flex justify-between">
                                <p>Base Amount:</p>
                                <p>{selectedUser.amount}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Charge 5%:</p>
                                <p>{selectedUser.charge}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Received:</p>
                                <p>{selectedUser.recieved}</p>
                            </div>
                        </div>

                        {/* Download & Print Options */}
                        <div className="mt-6 flex justify-end gap-2">
                            <Button variant="outline" className="text-[#0E7A60] border border-[#0E7A60] hover:text-[#0E7A60] hover:border-[#0E7A60] flex gap-2"> <Download /> Download PDF</Button>
                            <Button variant="outline" className="text-white bg-[#0E7A60] hover:bg-[#0E7A60] hover:text-white"> <Printer /> Print Receipt</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default DashPayment;
