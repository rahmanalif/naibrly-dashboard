import React, { useState } from "react";
import StatsSection from "@/components/dashboardcomponents/dashboardOverview/StatsSection";
import PaymentHistory from "@/components/dashboardcomponents/payment/PaymentHistory";
import StatsDashboard from "@/components/dashboardcomponents/dashboardOverview/StatsDashboard";
import DashPayment from "@/components/dashboardcomponents/dashboardOverview/DashPayment";
import DashboardHeader from "@/components/dashboardcomponents/dashboardOverview/DashboardHeader";

const DashboardOverview = () => {
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div>
      <DashboardHeader
        dateRange={dateRange}
        setDateRange={setDateRange}
        onRefresh={handleRefresh}
      />
      <StatsSection
        showBalance={true}
        dateRange={dateRange}
        refreshTrigger={refreshTrigger}
      />
      <StatsDashboard></StatsDashboard>
      {/* <PaymentHistory></PaymentHistory> */}
      <DashPayment></DashPayment>
    </div>
  );
};

export default DashboardOverview;
