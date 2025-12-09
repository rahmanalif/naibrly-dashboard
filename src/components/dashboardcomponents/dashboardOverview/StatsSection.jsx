import React, { useState, useEffect } from "react";
import { User, Store, DollarSign, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/api";

const StatsSection = () => {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalProviders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const response = await api.get('/admin/dashboard/stats');

        if (response.data.success) {
          const { totalCustomers, totalProviders, totalRevenue } = response.data.data.stats;
          setStats({
            totalCustomers: totalCustomers || 0,
            totalProviders: totalProviders || 0,
            totalRevenue: totalRevenue || 0,
          });
        }
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-1/3 p-6 bg-white rounded-lg shadow-sm border border-gray-200 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        Failed to load dashboard stats: {error}
      </div>
    );
  }

  return (
    <div className="flex gap-6">
      {/* Card 1: Total Customers */}
      <div className="w-1/3 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-4">
          <User className="h-8 w-8 text-gray-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Customers</h3>
            <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.totalCustomers)}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-row-reverse gap-2 items-center text-sm text-green-500">
          <p className="mr-2 text-[#2FA84D]">+1.01%</p>
          <span><TrendingUp /></span>
        </div>
      </div>

      {/* Card 2: Total Providers */}
      <div className="w-1/3 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-4">
          <Store className="h-8 w-8 text-gray-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Providers</h3>
            <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.totalProviders)}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-row-reverse gap-2 items-center text-sm text-green-500">
          <p className="mr-2 text-[#2FA84D]">+1.01%</p>
          <span><TrendingUp /></span>
        </div>
      </div>

      {/* Card 3: Total Revenue */}
      <div className="w-1/3 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-4">
          <DollarSign className="h-8 w-8 text-gray-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-row-reverse gap-2 items-center text-sm text-green-500">
          <p className="mr-2 text-[#2FA84D]">+1.01%</p>
          <span><TrendingUp /></span>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
