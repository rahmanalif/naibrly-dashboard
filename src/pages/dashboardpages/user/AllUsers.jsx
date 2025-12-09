import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Eye, Download, Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/lib/api";

const AllUsers = () => {
  const navigate = useNavigate();

  // State Management
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pagination, setPagination] = useState({
    current: 1,
    total: 0,
    pages: 0
  });

  // Fetch customers from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await api.get('/admin/customers', {
          params: {
            page: currentPage,
            limit: rowsPerPage,
            search: searchQuery
          }
        });

        if (response.data.success) {
          setCustomers(response.data.data.customers);
          setPagination(response.data.data.pagination);
        }
      } catch (err) {
        console.error('Failed to fetch customers:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [currentPage, rowsPerPage, searchQuery]);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setCurrentPage(1); // Reset to first page on search
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchQuery]);

  const handleClick = (customerId) => {
    navigate(`/dashboard/users/useraccount?id=${customerId}`);
  };

  const handleExport = () => {
    console.log("Exporting customer data...");
    // Add export logic here (CSV, Excel, etc.)
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setCurrentPage(newPage);
    }
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing rows per page
  };

  const renderTableRows = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan="5" className="px-6 py-12 text-center">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <span className="ml-3 text-gray-600">Loading customers...</span>
            </div>
          </td>
        </tr>
      );
    }

    if (error) {
      return (
        <tr>
          <td colSpan="5" className="px-6 py-12 text-center text-red-500">
            Error loading customers: {error}
          </td>
        </tr>
      );
    }

    if (customers.length === 0) {
      return (
        <tr>
          <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
            No customers found
          </td>
        </tr>
      );
    }

    return customers.map((customer) => (
      <tr key={customer._id} className="border-b hover:bg-[#0E7A601A]">
        <td className="px-6 py-4 font-medium text-gray-900">
          {customer._id.slice(-6).toUpperCase()}
        </td>
        <td className="px-6 py-4">
          {customer.firstName} {customer.lastName}
        </td>
        <td className="px-6 py-4">{customer.email}</td>
        <td className="px-6 py-4">
          <Badge className="text-black bg-transparent">
            {customer.phone || "N/A"}
          </Badge>
        </td>
        <td className="px-6 py-4">
          <Button
            onClick={() => handleClick(customer._id)}
            variant="outline"
            size="sm"
            className="border-0 bg-transparent shadow-none hover:bg-gray-100"
          >
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
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-600">
            Total: {pagination.total} customers
          </div>
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
          <select
            className="border rounded-md px-2 py-1"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="flex flex-row items-center gap-3">
          <p>
            Page {pagination.current} of {pagination.pages || 1}
          </p>
          <button
            className="btn border p-1 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </button>
          <button
            className="btn border p-1 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= pagination.pages}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
