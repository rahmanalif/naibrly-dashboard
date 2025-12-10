
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

// import background images
import leftBg from "@/assets/resetpassbgleft.png";
import rightBg from "@/assets/resetpassright.png";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { changeAdminPassword, validatePassword } from "../../services/settingsService";
import { toast } from "sonner";

const ResetPassword = () => {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validation
      if (!formData.currentPassword) {
        toast.error('Current password is required');
        return;
      }

      if (!formData.newPassword) {
        toast.error('New password is required');
        return;
      }

      const passwordValidation = validatePassword(formData.newPassword);
      if (!passwordValidation.isValid) {
        toast.error(passwordValidation.message);
        return;
      }

      if (!formData.confirmPassword) {
        toast.error('Please confirm your new password');
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        toast.error('New password and confirm password do not match');
        return;
      }

      if (formData.currentPassword === formData.newPassword) {
        toast.error('New password must be different from current password');
        return;
      }

      setLoading(true);

      const response = await changeAdminPassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (response.success) {
        toast.success('Password changed successfully!');
        // Clear form
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        // Navigate back after a short delay
        setTimeout(() => navigate('/dashboard/settings'), 1500);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error(error?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <span className="flex items-center font-semibold lg:text-lg"> <MdOutlineKeyboardArrowLeft size={40} className="cursor-pointer" onClick={() => navigate(-1)} />Change Password</span>
      <div className="relative flex items-center justify-center min-h-screen bg-[#F8FAFC] overflow-hidden px-4">

        {/* Background Images */}
        <img
          src={leftBg}
          alt="Background Left"
          className="absolute left-110 top-32  w-[280px] opacity-80"
        />
        <img
          src={rightBg}
          alt="Background Right"
          className="absolute right-110  bottom-28 w-[280px] opacity-80"
        />

        {/* Reset Password Form */}
        <div className="relative z-10 bg-white shadow-md rounded-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-[#0E7A60] mb-6 text-left">
            Change Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current Password */}
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="********"
                className="mt-1"
                value={formData.currentPassword}
                onChange={(e) => handleInputChange("currentPassword", e.target.value)}
              />
            </div>

            {/* New Password */}
            <div className="relative">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="flex flex-row items-center justify-between">
                <Input
                id="newPassword"
                type={showNew ? "text" : "password"}
                placeholder="********"
                className="mt-1 pr-10"
                value={formData.newPassword}
                onChange={(e) => handleInputChange("newPassword", e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 text-gray-500"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="flex flex-row justify-between items-center">
                <Input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                placeholder="********"
                className="mt-1 pr-10"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3  text-gray-500"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              </div>
            </div>

            {/* Confirm Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-[#0E7A60] hover:bg-[#0E7A60] text-white disabled:opacity-50"
            >
              {loading ? 'Changing Password...' : 'Confirm'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
