import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { ChevronRight, MessageSquareMore, ShieldCheck } from "lucide-react"; // For pending action icons
import { WithdrawIcon } from "@/components/icons/WithdrawIcon"; // Custom withdraw icon
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"; // Recharts for the chart
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import api from "@/lib/api";
import { getDashboardStats } from "@/services/paymentService";

// Pending Actions Component
const PendingActions = () => {
    const navigate = useNavigate();
    const [pendingData, setPendingData] = useState({
        pendingVerifications: 0,
        newSupportTickets: 0,
        pendingWithdrawals: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPendingActions = async () => {
            try {
                setLoading(true);
                const response = await getDashboardStats();
                if (response.success && response.data.pendingActions) {
                    setPendingData(response.data.pendingActions);
                }
            } catch (error) {
                console.error('Failed to fetch pending actions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPendingActions();
    }, []);

    const actions = [
        {
            title: "Verification",
            count: loading ? "Loading..." : `${pendingData.pendingVerifications} Providers awaiting verification`,
            color: "bg-[#D4F4E7]",
            action: "Review",
            icon: <ShieldCheck className="w-6 h-6" />,
            iconColor: "text-[#0E7A60]",
            iconBg: "bg-[#E8F5F1]",
            btnbg: "bg-[#0E7A60] hover:bg-[#0A5F4A]",
            onClick: () => navigate("/dashboard/providers?status=Unverified")
        },
        {
            title: "Support",
            count: loading ? "Loading..." : `${pendingData.newSupportTickets} New Chat`,
            color: "bg-[#FCE8D9]",
            action: "Respond",
            icon: <MessageSquareMore className="w-6 h-6" />,
            iconColor: "text-[#F3934F]",
            iconBg: "bg-white",
            btnbg: "bg-[#F3934F] hover:bg-[#E07A35]",
            onClick: () => navigate("/dashboard/support")
        },
        {
            title: "Withdraw Requests",
            count: loading ? "Loading..." : `${pendingData.pendingWithdrawals} new requests`,
            color: "bg-[#EDF6FF]",
            action: "Review",
            icon: <WithdrawIcon className="w-6 h-6" />,
            iconColor: "text-[#006ADC]",
            iconBg: "bg-white",
            btnbg: "bg-[#006ADC] hover:bg-[#0052A3]",
            onClick: () => navigate("/dashboard/withdraw")
        },
    ];

    return (
        <div className="flex flex-col justify-between h-full">
            <div className="text-xl font-bold mb-2">Pending Actions</div>
            <div className="flex flex-col gap-4">
                {actions.map((action, index) => (
                    <div key={index} className={`p-5 rounded-2xl ${action.color} flex items-center justify-between`}>
                        <div className="flex items-center gap-4">
                            <div className={`p-3 ${action.iconBg} rounded-full ${action.iconColor} flex items-center justify-center`}>
                                {action.icon}
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 text-base">{action.title}</p>
                                <span className="text-sm text-gray-600">{action.count}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={action.onClick}
                                className={`px-6 py-2 rounded-full ${action.btnbg} text-white font-medium`}
                            >
                                {action.action}
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Earnings Summary Component (with Recharts)
const EarningsSummaryChart = ({ months }) => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/admin/dashboard/earnings?months=${months}`);

                if (response.data.success) {
                    const earnings = response.data.data.earnings;

                    // Transform data for the chart
                    const transformedData = earnings.map(item => ({
                        month: item.month,
                        earnings: item.totalRevenue,
                        serviceRevenue: item.serviceRevenue || 0,
                        bundleRevenue: item.bundleRevenue || 0,
                        commission: item.commission
                    }));

                    setChartData(transformedData);
                    setSummary(response.data.data.summary);
                }
            } catch (err) {
                console.error('Failed to fetch earnings data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEarnings();
    }, [months]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(value);
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-semibold text-gray-900 mb-2">{payload[0].payload.month}</p>
                    <p className="text-sm text-gray-700">
                        <span className="font-medium">Total Revenue:</span> {formatCurrency(payload[0].payload.earnings)}
                    </p>
                    <p className="text-sm text-gray-600">
                        Service: {formatCurrency(payload[0].payload.serviceRevenue)}
                    </p>
                    <p className="text-sm text-gray-600">
                        Bundle: {formatCurrency(payload[0].payload.bundleRevenue)}
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                        Commission: {formatCurrency(payload[0].payload.commission)}
                    </p>
                </div>
            );
        }
        return null;
    };

    if (loading) {
        return (
            <div className="w-full h-[300px] flex items-center justify-center">
                <div className="animate-pulse text-gray-500">Loading earnings data...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-[300px] flex items-center justify-center">
                <div className="text-red-500">Failed to load earnings: {error}</div>
            </div>
        );
    }

    return (
        <div className="w-full h-full">
            {/* Summary Stats */}
            {summary && (
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Total Revenue</p>
                        <p className="text-lg font-bold text-gray-900">{formatCurrency(summary.totalRevenue)}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Commission</p>
                        <p className="text-lg font-bold text-green-600">{formatCurrency(summary.totalCommission)}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Service Revenue</p>
                        <p className="text-lg font-bold text-blue-600">{formatCurrency(summary.totalServiceRevenue || 0)}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-600">Bundle Revenue</p>
                        <p className="text-lg font-bold text-purple-600">{formatCurrency(summary.totalBundleRevenue || 0)}</p>
                    </div>
                </div>
            )}

            {/* Earnings AreaChart with Dark Green Border and Gradient Fill */}
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="earnings"
                        stroke="#006400"
                        fill="url(#earningsGradient)"
                        strokeWidth={2}
                    />
                </AreaChart>
            </ResponsiveContainer>
            {/* Gradient Definition */}
            <svg width="0" height="0">
                <defs>
                    <linearGradient id="earningsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#82ca9d" />
                        <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

// Main Dashboard Component
const StatsDashboard = () => {
    const [selectedPeriod, setSelectedPeriod] = useState("6");

    const periodOptions = [
        { label: "Last 1 month", value: "1" },
        { label: "Last 3 months", value: "3" },
        { label: "Last 6 months", value: "6" },
        { label: "Last 12 months", value: "12" },
    ];

    return (
        <div className="flex gap-3 pt-6">
            {/* Left Section: Earnings Summary Chart (2/3 width) */}
            <div className="w-2/3 bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Earning Summary</h2>
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                            {periodOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <EarningsSummaryChart months={parseInt(selectedPeriod)} />
            </div>

            {/* Right Section: Pending Actions (1/3 width) */}
            <div className="w-1/3 bg-white p-6 rounded-lg shadow-sm">
                <PendingActions />
            </div>
        </div>
    );
};

export default StatsDashboard;
