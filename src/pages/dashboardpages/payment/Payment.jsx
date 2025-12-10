import StatsSection from "@/components/dashboardcomponents/dashboardOverview/StatsSection";
import PaymentHistory from "@/components/dashboardcomponents/payment/PaymentHistory";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from 'sonner';
import { getCommissionSettings, updateCommissionSettings } from '@/services/paymentService';

// Manage Charge Icon SVG Component
const ManageChargeIcon = () => (
  <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.75 8.75H18.75" stroke="#666666" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M12.75 4.75L14.75 4.75" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.75 11.75V9.75C18.75 5.50736 18.75 3.38604 17.432 2.06802C16.114 0.75 13.9926 0.75 9.75 0.75C5.50736 0.75 3.38604 0.75 2.06802 2.06802C0.75 3.38604 0.75 5.50736 0.75 9.75V11.75C0.75 15.9926 0.75 18.114 2.06802 19.432C3.38604 20.75 5.50736 20.75 9.75 20.75C13.9926 20.75 16.114 20.75 17.432 19.432C18.75 18.114 18.75 15.9926 18.75 11.75Z" stroke="#666666" strokeWidth="1.5"/>
    <path d="M4.75 12.75H5.27632M9.48684 12.75H10.0132M14.2237 12.75H14.75" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.75 16.75H5.27632M9.48684 16.75H10.0132M14.2237 16.75H14.75" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Payment = () => {
  const [isManageChargeOpen, setIsManageChargeOpen] = useState(false);
  const [serviceCommission, setServiceCommission] = useState("");
  const [bundleCommission, setBundleCommission] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch current commission settings
  const fetchCommissionSettings = async () => {
    try {
      setLoading(true);
      const response = await getCommissionSettings();

      if (response.success) {
        setServiceCommission(response.data.settings.serviceCommission.toString());
        setBundleCommission(response.data.settings.bundleCommission.toString());
      }
    } catch (error) {
      console.error('Error fetching commission settings:', error);
      toast.error(error.message || 'Failed to fetch commission settings');
    } finally {
      setLoading(false);
    }
  };

  // Load commission settings on mount
  useEffect(() => {
    fetchCommissionSettings();
  }, []);

  // Open dialog and load current settings
  const handleOpenDialog = () => {
    fetchCommissionSettings();
    setIsManageChargeOpen(true);
  };

  const handleSaveCharge = async () => {
    const serviceValue = parseFloat(serviceCommission);
    const bundleValue = parseFloat(bundleCommission);

    // Validation
    if (isNaN(serviceValue) || isNaN(bundleValue)) {
      toast.error('Please enter valid numbers for commission rates');
      return;
    }

    if (serviceValue < 0 || serviceValue > 50) {
      toast.error('Service commission must be between 0% and 50%');
      return;
    }

    if (bundleValue < 0 || bundleValue > 50) {
      toast.error('Bundle commission must be between 0% and 50%');
      return;
    }

    try {
      setSubmitting(true);
      const response = await updateCommissionSettings({
        serviceCommission: serviceValue,
        bundleCommission: bundleValue
      });

      if (response.success) {
        toast.success('Commission settings updated successfully');
        setIsManageChargeOpen(false);
      }
    } catch (error) {
      console.error('Error updating commission settings:', error);
      toast.error(error.message || 'Failed to update commission settings');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Payment Header with Manage Charge Button */}
      <div className="flex justify-end items-center mb-4">
        <Button
          variant="outline"
          onClick={handleOpenDialog}
          className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50"
        >
          <ManageChargeIcon />
          <span className="text-sm text-gray-700">Manage Charge</span>
        </Button>
      </div>

      <StatsSection showBalance={true}></StatsSection>
      <PaymentHistory></PaymentHistory>

      {/* Commission Control Dialog */}
      <Dialog open={isManageChargeOpen} onOpenChange={setIsManageChargeOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Commission Control</DialogTitle>
          </DialogHeader>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-[#0E7A60]" />
            </div>
          ) : (
            <div className="flex flex-col gap-4 py-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="serviceCommission" className="text-base font-medium text-gray-900">
                  Service Commission Rate (%)
                </label>
                <Input
                  id="serviceCommission"
                  type="number"
                  min="0"
                  max="50"
                  step="0.1"
                  value={serviceCommission}
                  onChange={(e) => setServiceCommission(e.target.value)}
                  placeholder="5"
                  className="w-full text-base py-6"
                  disabled={submitting}
                />
                <p className="text-xs text-gray-500">
                  Commission rate for individual services (0% - 50%)
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="bundleCommission" className="text-base font-medium text-gray-900">
                  Bundle Commission Rate (%)
                </label>
                <Input
                  id="bundleCommission"
                  type="number"
                  min="0"
                  max="50"
                  step="0.1"
                  value={bundleCommission}
                  onChange={(e) => setBundleCommission(e.target.value)}
                  placeholder="5"
                  className="w-full text-base py-6"
                  disabled={submitting}
                />
                <p className="text-xs text-gray-500">
                  Commission rate for bundle packages (0% - 50%)
                </p>
              </div>

              <Button
                onClick={handleSaveCharge}
                className="w-full bg-[#0E7A60] hover:bg-[#0A5F4A] text-white rounded-lg py-6 font-medium text-base"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  'Save'
                )}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payment;
