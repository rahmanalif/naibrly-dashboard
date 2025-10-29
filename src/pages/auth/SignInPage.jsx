// import React from "react";

// const SignInPage = () => {
//   return <div>SignInPage</div>;
// };

// export default SignInPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { Eye, EyeOff } from "lucide-react"; // Eye icons for password visibility toggle
import logo from "@/assets/logo.svg"; // Import logo from assets

const SignInPage = () => {
  // State for handling password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Handle sign-in logic
  const handleSignIn = () => {
    // Here you would typically handle authentication
    // For now, we'll just navigate to the dashboard
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      {/* Form Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-16 h-16" />
        </div>

        {/* Form Title */}
        <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>

        {/* Form Fields */}
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent form submission
            handleSignIn();
          }}
        >
          {/* Username Field */}
          <div className="mb-4">
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 mt-1 border border-gray-300 bg-[#F4F7FE] rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your username"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <input
              type={isPasswordVisible ? "text" : "password"} // Toggle between password and text
              id="password"
              name="password"
              className="w-full px-4 py-2 mt-1 border bg-[#F4F7FE] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
            />
            {/* Eye Icon for visibility toggle */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-4 text-gray-600"
            >
              {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="h-4 w-4 text-green-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a href="/forgotpass" className="text-sm text-black hover:text-black">
              Forgot password?
            </a>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit" // Change to submit to trigger form submission
            className="w-full py-2 bg-[#0E7A60] text-white rounded-md hover:bg-[#0E7A60]"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
