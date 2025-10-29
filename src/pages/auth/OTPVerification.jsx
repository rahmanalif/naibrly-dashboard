// import React from "react";

// const OTPVerification = () => {
//   return <div>OTPVerification</div>;
// };

// export default OTPVerification;


import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { ChevronLeft, MoveLeft } from "lucide-react"; // Back arrow icon
import logo from "@/assets/logo.svg"; // Import logo from assets
import { useNavigate } from "react-router-dom";

const OTPVerification = () => {
  // State to store OTP inputs
  const [otp, setOtp] = useState(Array(6).fill(""));

  // Handle OTP input change
  const handleOtpChange = (e, index) => {
    let value = e.target.value;
    if (/[^0-9]/.test(value)) return; // Only numbers are allowed
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus(); // Auto focus next input
    }
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

        {/* Back Button */}
        <div className="flex items-center justify-center mb-4">
          <MoveLeft size={24} onClick={()=>{navigate(-1)}}/>
          <span className="ml-2 text-lg font-medium text-gray-700">Verify Email</span>
        </div>

        {/* Form Title */}
        <h2 className="text-2xl font-semibold text-center mb-4">Verify Email</h2>

        {/* Instructions */}
        <p className="text-sm text-center text-gray-500 mb-6">
          Please enter the OTP we have sent you in your email.
        </p>

        {/* OTP Input Fields */}
        <div className="flex justify-between mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              className="w-12 h-12 text-center bg-[#0E7A60] text-white border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2"
              placeholder="-"
            />
          ))}
        </div>

        {/* Verify Email Button */}
        <Button className="w-full py-2 bg-[#0E7A60] text-white rounded-md hover:bg-[#0E7A60]">
          Verify Email
        </Button>
      </div>
    </div>
  );
};

export default OTPVerification;
