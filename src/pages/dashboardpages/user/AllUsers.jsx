


import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Eye, Download, Search } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  // Example user data (add or modify as needed)
  const users = [
    { id: 29506, name: "Jacob Maicle", email: "oxheart@email.com", contact: "(220) 134 567", status: "Verified" },
    { id: 29505, name: "Marvin McKinney", email: "mountain@email.com", contact: "(220) 134 567", status: "Verified" },
    { id: 29504, name: "Kristin Watson", email: "juniper@email.com", contact: "(220) 134 567", status: "Verified" },
    { id: 29502, name: "Darrell Steward", email: "oxheart@email.com", contact: "(220) 134 567", status: "Unverified" },
    { id: 29501, name: "Theresa Webb", email: "juniper@email.com", contact: "(220) 134 567", status: "Unverified" },
    { id: 29501, name: "Theresa Webb", email: "juniper@email.com", contact: "(220) 134 567", status: "Unverified" },
    { id: 29501, name: "Theresa Webb", email: "juniper@email.com", contact: "(220) 134 567", status: "Unverified" },
    { id: 29501, name: "Theresa Webb", email: "juniper@email.com", contact: "(220) 134 567", status: "Unverified" },
    { id: 29500, name: "Eleanor Pena", email: "oxheart@email.com", contact: "(220) 134 567", status: "Verified" },
    { id: 29499, name: "Kathryn Murphy", email: "mountain@email.com", contact: "(220) 134 567", status: "Verified" }
  ];

  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/dashboard/users/useraccount")
  }

  const handleExport = () => {
    console.log("Exporting user data...");
    // Add export logic here (CSV, Excel, etc.)
  }

  // Pagination State
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderTableRows = () => {
    const indexOfLastUser = currentPage * rowsPerPage;
    const indexOfFirstUser = indexOfLastUser - rowsPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    return currentUsers.map((user) => (
      <tr key={user.id} className="border-b hover:bg-[#0E7A601A]">
        <td className="px-6 py-4">{user.id}</td>
        <td className="px-6 py-4">{user.name}</td>
        <td className="px-6 py-4">{user.email}</td>
        <td className="px-6 py-4">
          {/* Fixing Badge color for 'Contact' */}
          <Badge
            className=
            // user.contact === "Verified" ? "bg-green-500 text-white" : 
            // user.contact === "Unverified" ? "bg-red-500 text-white" :
            // user.contact === "Pending" ? "bg-yellow-500 text-white" : 
            " text-black bg-transparent"

          >
            {user.contact}
          </Badge>
        </td>

        <td className="px-6 py-4">
          <Button onClick={handleClick} variant="outline" size="sm" className="border-0 bg-transparent shadow-none">
            <Eye />
          </Button>
        </td>
      </tr>
    ));
  };

  return (
    <div className=" mx-auto bg-white p-10 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-row gap-3 px-4 py-2 border rounded-md mr-4">
          <Search />
          <input
            type="text"
            placeholder="Search"
          />
        </div>
        <div className="flex items-center">
          <Button
            variant="outline"
            onClick={handleExport}
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm text-gray-700">Export</span>
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white  ">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">User ID</th>
              <th scope="col" className="px-6 py-3">User Name</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Contact</th>

              <th scope="col" className="px-6 py-3">Action</th>
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
    </div>
  );
};

export default AllUsers;
