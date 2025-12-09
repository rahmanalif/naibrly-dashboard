import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Eye, Download, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "@/lib/api";

// Custom Filter Icon SVG Component
const FilterIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7H21" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 12H18" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M10 17H14" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const Providers = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State Management
  const [providers, setProviders] = useState([]);
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

  // Filter State from URL
  const [filterStatus, setFilterStatus] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("status") || "All";
  });

  // Sync Filter State with URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const statusParam = params.get("status") || "All";
    if (statusParam !== filterStatus) {
      setFilterStatus(statusParam);
      setCurrentPage(1); // Reset to first page when filter changes
    }
  }, [location.search, filterStatus]);

  // Fetch Providers from API
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = {
          page: currentPage,
          limit: rowsPerPage,
          search: searchQuery
        };

        // Map filter status to API parameter
        // Assuming API might accept 'verified' boolean or handle it differently.
        // Based on user request "verified means show all verified provider", we send a param.
        if (filterStatus === "Verified") {
          params.isVerified = true;
        } else if (filterStatus === "Unverified") {
          params.isVerified = false;
        }

        console.log('Fetching providers with params:', params);
        const response = await api.get('/admin/providers', { params });

        if (response.data.success) {
          setProviders(response.data.data.providers);
          setPagination(response.data.data.pagination);
        } else {
          // Fallback if success is false but no error thrown
          setError("Failed to fetch data");
        }
      } catch (err) {
        console.error('Failed to fetch providers:', err);
        setError(err.message || "An error occurred while fetching providers");
      } finally {
        setLoading(false);
      }
    };

    // Debounce only for search query changes, fetch immediately for other changes
    const timeoutId = setTimeout(() => {
      fetchProviders();
    }, searchQuery ? 500 : 0);

    return () => clearTimeout(timeoutId);
  }, [currentPage, rowsPerPage, searchQuery, filterStatus]);


  const handleClick = (providerId) => {
    // Navigate to provider details/account page
    // Using query param or path param based on existing pattern, user mentioned "providers/provideraccount"
    // Ideally should be `/dashboard/providers/provideraccount?id=${providerId}` or similar.
    navigate(`/dashboard/providers/provideraccount?id=${providerId}`);
  }

  const handleExport = () => {
    console.log("Exporting provider data...");
    // Add export logic here (CSV, Excel, etc.)
  }

  const handleFilter = (filterType) => {
    navigate(`?status=${filterType}`, { replace: true });
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setCurrentPage(newPage);
    }
  };

  const renderTableRows = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan="6" className="px-6 py-12 text-center">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <span className="ml-3 text-gray-600">Loading providers...</span>
            </div>
          </td>
        </tr>
      )
    }

    if (error) {
      return (
        <tr>
          <td colSpan="6" className="px-6 py-12 text-center text-red-500">
            Error: {error}
          </td>
        </tr>
      )
    }

    if (providers.length === 0) {
      return (
        <tr>
          <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
            No providers found.
          </td>
        </tr>
      )
    }

    return providers.map((provider) => (
      <tr key={provider._id} className="border-b hover:bg-[#0E7A601A]">
        <td className="px-6 py-4">{provider._id.slice(-6).toUpperCase()}</td>
        <td className="px-6 py-4">{provider.firstName} {provider.lastName}</td>
        <td className="px-6 py-4">{provider.email}</td>
        <td className="px-6 py-4">
          {/* Displaying Phone as Contact */}
          {provider.phone || "N/A"}
        </td>
        <td className="px-6 py-4">
          <Badge
            className={`${provider.isVerified ? "bg-[#E4F6E8] text-[#3EBF5A]" : "bg-[#FDDEDE] text-[#F34F4F]"}`}
          >
            {provider.isVerified ? "Verified" : "Unverified"}
          </Badge>
        </td>
        <td className="px-6 py-4">
          <Button onClick={() => handleClick(provider._id)} variant="outline" size="sm" className="border-0 bg-transparent shadow-none">
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none"
          />
        </div>
        <div className="flex items-center gap-3">
          {/* Filter Dropdown Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center justify-center bg-white border border-gray-200 rounded-lg p-2 hover:bg-gray-50"
              >
                <FilterIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => handleFilter("All")}>
                All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilter("Verified")}>
                Verified
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilter("Unverified")}>
                Unverified
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Export Button */}
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
              <th scope="col" className="px-6 py-3">Status</th>
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
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="flex flex-row items-center gap-3">
          <p>Page {pagination.current} of {pagination.pages || 1}</p>
          <button
            className="btn border p-1 rounded-sm cursor-pointer disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </button>
          <button
            className="btn border p-1 rounded-sm cursor-pointer disabled:opacity-50"
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

export default Providers;
