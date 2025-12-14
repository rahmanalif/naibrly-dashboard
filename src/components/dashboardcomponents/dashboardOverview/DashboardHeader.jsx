import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RefreshCw } from "lucide-react";

// Calendar Icon SVG Component
const CalendarIcon = () => (
  <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.25 11.75H14.25M6.25 11.75H6.25898M11.25 15.75H6.25M14.25 15.75H14.241" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.25 0.75V2.75M4.25 0.75V2.75" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M0.75 10.9932C0.75 6.63594 0.75 4.45728 2.00212 3.10364C3.25424 1.75 5.26949 1.75 9.3 1.75H11.2C15.2305 1.75 17.2458 1.75 18.4979 3.10364C19.75 4.45728 19.75 6.63594 19.75 10.9932V11.5068C19.75 15.8641 19.75 18.0427 18.4979 19.3964C17.2458 20.75 15.2305 20.75 11.2 20.75H9.3C5.26949 20.75 3.25424 20.75 2.00212 19.3964C0.75 18.0427 0.75 15.8641 0.75 11.5068V10.9932Z" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.25 6.75H19.25" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Bundle Offer Icon SVG Component
const BundleOfferIcon = () => (
  <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.75 8.75H18.75" stroke="#666666" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M12.75 4.75L14.75 4.75" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.75 11.75V9.75C18.75 5.50736 18.75 3.38604 17.432 2.06802C16.114 0.75 13.9926 0.75 9.75 0.75C5.50736 0.75 3.38604 0.75 2.06802 2.06802C0.75 3.38604 0.75 5.50736 0.75 9.75V11.75C0.75 15.9926 0.75 18.114 2.06802 19.432C3.38604 20.75 5.50736 20.75 9.75 20.75C13.9926 20.75 16.114 20.75 17.432 19.432C18.75 18.114 18.75 15.9926 18.75 11.75Z" stroke="#666666" strokeWidth="1.5"/>
    <path d="M4.75 12.75H5.27632M9.48684 12.75H10.0132M14.2237 12.75H14.75" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.75 16.75H5.27632M9.48684 16.75H10.0132M14.2237 16.75H14.75" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Date Range Picker Component
const DateRangePicker = ({ dateRange, setDateRange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(null);
  const [tempEndDate, setTempEndDate] = useState(null);

  const formatDate = (date) => {
    if (!date) return "";
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const displayText = dateRange?.from && dateRange?.to
    ? `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`
    : "All Time";

  const handleOpenChange = (open) => {
    if (open) {
      setTempStartDate(dateRange?.from || null);
      setTempEndDate(dateRange?.to || null);
    }
    setIsOpen(open);
  };

  const handleApply = () => {
    if (tempStartDate && tempEndDate) {
      setDateRange({ from: tempStartDate, to: tempEndDate });
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setTempStartDate(null);
    setTempEndDate(null);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50"
        >
          <CalendarIcon />
          <span className="text-sm text-gray-700">{displayText}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="space-y-4">
          <div className="text-sm font-semibold text-gray-900 mb-2">Select Date Range</div>

          {/* Start Date */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-700">Start Date</label>
            <Calendar
              mode="single"
              selected={tempStartDate}
              onSelect={setTempStartDate}
              initialFocus
              disabled={(date) => tempEndDate && date > tempEndDate}
            />
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-700">End Date</label>
            <Calendar
              mode="single"
              selected={tempEndDate}
              onSelect={setTempEndDate}
              disabled={(date) => tempStartDate && date < tempStartDate}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="flex-1 text-sm"
            >
              Cancel
            </Button>
            <Button
              onClick={handleApply}
              disabled={!tempStartDate || !tempEndDate}
              className="flex-1 bg-[#0E7A60] hover:bg-[#0A5F4A] text-white text-sm"
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

// Bundle Offer Dialog Component
const BundleOfferDialog = () => {
  const [offerRate, setOfferRate] = useState("5");
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    console.log("Saving bundle offer rate:", offerRate);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50"
        >
          <BundleOfferIcon />
          <span className="text-sm text-gray-700">Set bundle offer</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Set bundle offer</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="offerRate" className="text-sm font-medium text-gray-700">
              Offer Rate
            </label>
            <Input
              id="offerRate"
              type="text"
              value={offerRate}
              onChange={(e) => setOfferRate(e.target.value)}
              placeholder="5%"
              className="w-full"
            />
          </div>
          <Button
            onClick={handleSave}
            className="w-full bg-[#0E7A60] hover:bg-[#0A5F4A] text-white rounded-lg py-2 font-medium"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Main Dashboard Header Component
const DashboardHeader = ({ dateRange, setDateRange, onRefresh }) => {
  const handleAllTime = () => {
    setDateRange({ from: null, to: null });
  };

  const isAllTime = !dateRange?.from || !dateRange?.to;

  return (
    <div className="flex items-center justify-between py-4 px-2">
      <div className="flex items-center gap-3">
        <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
        <Button
          variant={isAllTime ? "default" : "outline"}
          onClick={handleAllTime}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
            isAllTime
              ? "bg-[#0E7A60] hover:bg-[#0A5F4A] text-white"
              : "bg-white border border-gray-200 hover:bg-gray-50 text-gray-700"
          }`}
        >
          <span className="text-sm">All Time</span>
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <BundleOfferDialog />
        <Button
          variant="outline"
          onClick={onRefresh}
          className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50"
        >
          <RefreshCw className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-700">Refresh</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
