


import React from "react";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { ChevronRight, CircleAlert, MessageSquareMore, ShieldCheck } from "lucide-react"; // For pending action icons
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"; // Recharts for the chart

// Pending Actions Component
const PendingActions = () => {
    const actions = [
        {
            title: "Verification",
            count: "12 Providers awaiting verification",
            color: "bg-[#D4F4E7]",
            action: "Review",
            icon: <ShieldCheck className="w-6 h-6" />,
            iconColor: "text-[#0E7A60]",
            iconBg: "bg-[#E8F5F1]",
            btnbg: "bg-[#0E7A60] hover:bg-[#0A5F4A]"
        },
        {
            title: "Support",
            count: "8 New Chat",
            color: "bg-[#FCE8D9]",
            action: "Respond",
            icon: <MessageSquareMore className="w-6 h-6" />,
            iconColor: "text-[#F3934F]",
            iconBg: "bg-white",
            btnbg: "bg-[#F3934F] hover:bg-[#E07A35]"
        },
        {
            title: "Reports",
            count: "5 new report",
            color: "bg-[#FDDEDE]",
            action: "Investigate",
            icon: <CircleAlert className="w-6 h-6" />,
            iconColor: "text-[#F34F4F]",
            iconBg: "bg-white",
            btnbg: "bg-[#F34F4F] hover:bg-[#D93F3F]"
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
                            <Button className={`px-6 py-2 rounded-full ${action.btnbg} text-white font-medium`}>
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
const EarningsSummaryChart = () => {
    const data = [
        { month: "May", earnings: 200000 },
        { month: "Jun", earnings: 180000 },
        { month: "Jul", earnings: 150000 },
        { month: "Aug", earnings: 170000 },
        { month: "Sep", earnings: 190000 },
        { month: "Oct", earnings: 220000 },
    ];

    return (
        <div className="w-full h-full">
            {/* Earnings AreaChart with Dark Green Border and Gradient Fill */}
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#006400" /> {/* Dark Green Border */}
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="earnings"
                        stroke="#006400" // Dark Green Border color
                        fill="url(#earningsGradient)" // Gradient Fill
                    />
                </AreaChart>
            </ResponsiveContainer>
            {/* Gradient Definition */}
            <svg width="0" height="0">
                <defs>
                    <linearGradient id="earningsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#82ca9d" />  {/* Green at the top */}
                        <stop offset="100%" stopColor="#ffffff" />  {/* White at the bottom */}
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

// Main Dashboard Component
const StatsDashboard = () => {
    return (
        <div className="flex gap-3 pt-6">
            {/* Left Section: Earnings Summary Chart (2/3 width) */}
            <div className="w-2/3 bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Earning Summary</h2>
                <div className="flex justify-between mb-4">
                    <div className="text-sm text-gray-500">Mar 2022 - Oct 2022</div>
                    <Button variant="outline" size="sm">Last 6 months</Button>
                </div>
                <EarningsSummaryChart />
            </div>

            {/* Right Section: Pending Actions (1/3 width) */}
            <div className="w-1/3 bg-white p-6 rounded-lg shadow-sm">
                <PendingActions />
            </div>
        </div>
    );
};

export default StatsDashboard;
