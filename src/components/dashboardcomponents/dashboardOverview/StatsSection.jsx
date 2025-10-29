


import React from "react";
import { User, Store, DollarSign, TrendingUp } from "lucide-react"; // Icons from lucide-react
// import { Badge } from "@shadcn/ui"; // Badge for percentage change
import { cn } from "@/lib/utils"; // Helper function for classnames (if you have it)
import { Badge } from "@/components/ui/badge";

const StatsSection = () => {
  return (
    <div className="flex gap-6">
      {/* Card 1: Total Users */}
      <div className="w-1/3 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-4">
          <User className="h-8 w-8 text-gray-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
            <p className="text-2xl font-bold text-gray-900">12,54,286</p>
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
            <p className="text-2xl font-bold text-gray-900">1526</p>
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
            <p className="text-2xl font-bold text-gray-900">$12,526</p>
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
