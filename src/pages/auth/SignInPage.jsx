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
import api from "@/lib/api"; // Import API client

const SignInPage = () => {
  // State for handling password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Handle sign-in logic
  const handleSignIn = async (e) => {
    if (e) e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Clear previous errors
    setError("");

    // Validate inputs
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Attempting login with:", { username, baseURL: import.meta.env.VITE_API_BASE_URL });
      const response = await api.post("/admin/login", {
        username,
        password,
      });

      console.log("Login response:", response.data);

      if (response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("admin", JSON.stringify(response.data.data.admin));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      let errorMessage = "Login failed. Please check your credentials.";
      const responseData = error.response?.data;

      if (typeof responseData === 'string') {
        if (responseData.includes('ngrok')) {
          errorMessage = "Backend server is unreachable via Ngrok. Please ensure the server is running on port 5000.";
        } else {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (responseData?.message) {
        errorMessage = responseData.message;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
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

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

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
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
