

import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Eye, EyeOff, MoveLeft } from "lucide-react"; // Eye icons for password visibility toggle
import logo from "@/assets/logo.svg"; // Import logo from assets
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  // State for handling password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      {/* Form Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-16 h-16" />
        </div>

        {/* Form Title */}
        <h2 className="text-2xl font-semibold text-center mb-4 flex gap-2 items-center justify-center"><MoveLeft onClick={() => { navigate(-1) }} /> Forgot Password</h2>

        {/* Form Fields */}
        <form>
          {/* Username Field */}
          <div className="mb-4">
            <p className="text-center py-4 text-[1rem] text-[#666666]">Please enter your email address to reset
              your password.</p>

            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 mt-1 border border-gray-300 bg-[#F4F7FE] rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email address"
            />
          </div>





          {/* Sign In Button */}
          <Button onClick={()=>{navigate("/otpverification")}} className="w-full py-2 bg-[#0E7A60] text-white rounded-md hover:bg-[#0E7A60]">
            Send OTP
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
