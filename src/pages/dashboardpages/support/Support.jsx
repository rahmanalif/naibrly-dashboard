"use client";
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft, ChevronRight, User } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog"; // Add Dialog import

const Support = () => {
  const tickets = [
    {
      id: "ADG39",
      name: "Alice Barton",
      email: "alice@gmail.com",
      subject: "PC not turning on",
      created: "1 hour ago",
      solved: "1 hour ago",
      status: "Unsolved",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: "ADG40",
      name: "Bob Smith",
      email: "bob@gmail.com",
      subject: "Monitor not working",
      created: "2 hours ago",
      solved: "1 hour ago",
      status: "Open",
      message: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "ADG41",
      name: "Carol Jones",
      email: "carol@gmail.com",
      subject: "System overheating",
      created: "3 hours ago",
      solved: "2 hours ago",
      status: "Resolved",
      message: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    },
  ];

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Unsolved":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            {status}
          </Badge>
        );
      case "Open":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            {status}
          </Badge>
        );
      case "Resolved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            {status}
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleStatusClick = (ticket) => {
    setSelectedTicket(ticket); // Set selected ticket
    setOpenDialog(true); // Open dialog
  };

  return (
    <Card className="shadow-sm border rounded-xl">
      <CardHeader className="pb-0">
        <CardTitle>Latest Tickets</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto mt-4">
          <Table>
            <TableHeader>
              <TableRow className="text-gray-500">
                <TableHead>Ticket ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Solved Date</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {tickets.map((ticket, index) => (
                <TableRow key={index} className="hover:bg-[#0E7A601A]">
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.name}</TableCell>
                  <TableCell>{ticket.email}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>{ticket.created}</TableCell>
                  <TableCell>{ticket.solved}</TableCell>
                  <TableCell className="text-right">
                    <div
                      className="flex items-center justify-end gap-2 cursor-pointer"
                      onClick={() => handleStatusClick(ticket)}
                    >
                      {getStatusBadge(ticket.status)} <ChevronDown size={14} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
      </CardContent>

      {/* Dialog */}
      {selectedTicket && (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <button className="hidden">Open Dialog</button>
          </DialogTrigger>

          <DialogContent className="w-full md:max-w-5xl lg:max-w-7xl p-8 bg-white rounded-lg">
            <DialogHeader>
              <div className="flex justify-between items-center bg-[#0E7A601A]/90 py-3 px-4 rounded-sm">
                <DialogTitle>
                  <span className="font-bold">Ticket #{selectedTicket.id}</span> - {selectedTicket.subject}
                </DialogTitle>
                <Button className="bg-[#0E7A60] rounded-sm text-white">Mark as Resolved</Button>
              </div>
            </DialogHeader>

            <div className="flex flex-row p-3 gap-3 rounded-full mt-6">
              <User size={32} className="text-[#0E7A60] bg-[#F4F7FE] rounded-full"/>
              <p className="font-medium text-2xl">{selectedTicket.name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">



              {/* Left Section */}
              <div className="col-span-2 space-y-4 p-6 bg-[#F4F7FE] shadow-sm rounded-lg">


                <div className="flex items-center gap-4">
                  {/* <div className="bg-gray-200 p-3 rounded-full">
                    <User size={32} />
                  </div>
                  <p className="font-semibold text-xl">{selectedTicket.name}</p> */}
                </div>
                <p className="text-gray-700 mt-4">{selectedTicket.message}</p>
              </div>

              {/* Right Section */}
              <div className="col-span-1/3 space-y-4 p-6 bg-[#EBEBEB] shadow-sm rounded-lg">
                <h4 className="font-semibold text-gray-800">Ticket Information</h4>
                <p className="text-gray-700">
                  <span className="font-medium">Status:</span> {getStatusBadge(selectedTicket.status)}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Requester:</span> {selectedTicket.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span> {selectedTicket.email}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Created:</span> {selectedTicket.created}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Last Updated:</span> {selectedTicket.solved}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

export default Support;










// "use client";
// import React, { useState } from "react";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { ChevronDown, ChevronLeft, ChevronRight, User } from "lucide-react";
// import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog"; // Import Dialog

// const Support = () => {
//   const tickets = [
//     {
//       id: "ADG39",
//       name: "Alice Barton",
//       email: "alice@gmail.com",
//       subject: "PC not turning on",
//       created: "1 hour ago",
//       solved: "1 hour ago",
//       status: "Unsolved",
//       message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     },
//     // Add more tickets if necessary
//   ];

//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedTicket, setSelectedTicket] = useState(null);

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "Unsolved":
//         return <Badge className="bg-blue-100 text-blue-700">{status}</Badge>;
//       case "Open":
//         return <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>;
//       case "Resolved":
//         return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
//       default:
//         return <Badge>{status}</Badge>;
//     }
//   };

//   const handleStatusClick = (ticket) => {
//     setSelectedTicket(ticket);
//     setOpenDialog(true);
//   };

//   return (
//     <Card className="shadow-sm border rounded-xl">
//       <CardHeader>
//         <CardTitle>Latest Tickets</CardTitle>
//       </CardHeader>

//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Ticket ID</TableHead>
//               <TableHead>Name</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Subject</TableHead>
//               <TableHead>Status</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {tickets.map((ticket) => (
//               <TableRow key={ticket.id}>
//                 <TableCell>{ticket.id}</TableCell>
//                 <TableCell>{ticket.name}</TableCell>
//                 <TableCell>{ticket.email}</TableCell>
//                 <TableCell>{ticket.subject}</TableCell>
//                 <TableCell>
//                   <div
//                     className="flex items-center justify-end gap-2 cursor-pointer"
//                     onClick={() => handleStatusClick(ticket)}
//                   >
//                     {getStatusBadge(ticket.status)} <ChevronDown size={14} />
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>

//       {/* Dialog Implementation */}
//       {selectedTicket && (
//         <Dialog open={openDialog} onOpenChange={setOpenDialog}>
//           <DialogTrigger asChild>
//             <button className="hidden">Open Dialog</button>
//           </DialogTrigger>

//           <DialogContent className="w-full lg:max-w-7xl p-8 bg-gray-100 rounded-lg">
//             <DialogHeader>
//               <div className="flex justify-between items-center">
//                 <DialogTitle>
//                   <span className="font-bold">Ticket #{selectedTicket.id}</span> - {selectedTicket.subject}
//                 </DialogTitle>
//                 <Button className="bg-green-600 text-white">Mark as Resolved</Button>
//               </div>
//             </DialogHeader>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//               {/* Left Section */}
//               <div className="space-y-4 p-6 bg-white shadow-sm rounded-lg">
//                 <div className="flex items-center gap-4">
//                   <div className="bg-gray-200 p-3 rounded-full">
//                     <User size={32} />
//                   </div>
//                   <p className="font-semibold text-xl">{selectedTicket.name}</p>
//                 </div>
//                 <p className="text-gray-700 mt-4">{selectedTicket.message}</p>
//               </div>

//               {/* Right Section */}
//               <div className="space-y-4 p-6 bg-white shadow-sm rounded-lg">
//                 <h4 className="font-semibold text-gray-800">Ticket Information</h4>
//                 <p className="text-gray-700">
//                   <span className="font-medium">Status:</span> {getStatusBadge(selectedTicket.status)}
//                 </p>
//                 <p className="text-gray-700">
//                   <span className="font-medium">Requester:</span> {selectedTicket.name}
//                 </p>
//                 <p className="text-gray-700">
//                   <span className="font-medium">Email:</span> {selectedTicket.email}
//                 </p>
//                 <p className="text-gray-700">
//                   <span className="font-medium">Created:</span> {selectedTicket.created}
//                 </p>
//                 <p className="text-gray-700">
//                   <span className="font-medium">Last Updated:</span> {selectedTicket.solved}
//                 </p>
//               </div>
//             </div>
//           </DialogContent>
//         </Dialog>
//       )}
//     </Card>
//   );
// };

// export default Support;
