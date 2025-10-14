"use client";
import NavBarNoAUTH from "@/Components/NavBarNoAUTH";
import { API_BASE_URL } from "@/Config";
import { useUserLoginInputHandling } from "@/Tools/useInputHandling";
import Link from "next/link";
import  { ROUTES } from "@/Types/Routes"
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { ButtonStyle11 } from '@/Components/ButtonStyles';
const UserLogin: React.FC = () => {
  const navigateTo = useRouter()
  const {
    email, setEmail,
    password, setPassword,
    errors, 
    validate,
  } = useUserLoginInputHandling()
  const [ApiError,setApiError] = useState('')

  const SendData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/apiAUTH/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email,password})
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log("Login successful");
        console.log("Response data:", data);
        
        // Handle different possible response structures
        const userData = data.USER || data.user || data;
        const token = data.token || data.accessToken || data.access_token;
        
        if (!userData || !token) {
          console.error("Invalid response structure:", data);
          setApiError("Invalid response from server");
          return { success: false, error: "Invalid response from server" };
        }
        
        localStorage.setItem('USERtoken', token);
        localStorage.setItem('USERID', userData.id || userData._id || '');
        localStorage.setItem('USERname', userData.name || userData.username || '');
        localStorage.setItem('USERemail', userData.email || '');
        localStorage.setItem('userType', 'USER');
        
        return { success: true, data };
      } else {
        // Handle different error status codes
        if (response.status === 401) {
          setApiError("Invalid email or password");
          return { success: false, error: "Invalid email or password" };
        } else if (response.status === 429) {
          setApiError("Too many attempts. Please try again later.");
          return { success: false, error: "Too many attempts" };
        } else if (response.status === 500) {
          setApiError("Server error. Please try again later.");
          return { success: false, error: "Server error" };
        } else {
          setApiError(data.message || "Login failed");
          return { success: false, error: data.message || "Login failed" };
        }
      }
    } catch (error) {
      console.error("Network error:", error);
      setApiError("Network error. Please check your connection.");
      return { success: false, error: "Network error" };
    }
  };

  const functionHandling = async () => {
    // Clear any previous API errors
    setApiError('');
    
    // First validate inputs
    const isValid = await validate();
    
    if (isValid) {
        // If validation passes, send data to API
        const result = await SendData();
        if (result.success) {
          navigateTo.push('MainPage')
        }
        // If not successful, the error is already set in SendData
    }
};

  return (
    <div className="min-h-screen bg-gradient-to-r from-white to-green-50 flex flex-col items-center">
      <NavBarNoAUTH />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl mt-20 p-10 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <span className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-2">
            {/* Placeholder for logo */}
            <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#22c55e"/><path d="M7 12h10M12 7v10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          </span>
          <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
          <p className="text-gray-500 text-center text-sm">Sign in to your personal account</p>
        </div>
          <input type="email" placeholder="Email" className="w-full border border-gray-400 rounded-lg px-5 py-4 mb-2 focus:outline-none focus:border-gray-500 focus:bg-gray-50 hover:border-gray-500 hover:bg-gray-50 transition-all duration-200 shadow-sm" onChange={(e)=> setEmail(e.target.value)} />
          {errors.email && <div className="text-red-500 text-xs mb-3 ml-1">{errors.email}</div>}
          <input type="password" placeholder="Password" className="w-full border border-gray-400 rounded-lg px-5 py-4 mb-2 focus:outline-none focus:border-gray-500 focus:bg-gray-50 hover:border-gray-500 hover:bg-gray-50 transition-all duration-200 shadow-sm" onChange={(e)=> setPassword(e.target.value)} />
          {errors.password && <div className="text-red-500 text-xs mb-3 ml-1">{errors.password}</div>}
          
          {/* API Error Display */}
          {ApiError && (
            <div className="w-full bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4">
              <div className="text-red-800 text-sm">{ApiError}</div>
            </div>
          )}
          
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm select-none">
              <input type="checkbox" className="mr-2 accent-green-600 rounded border border-gray-400 focus:ring-2 focus:ring-gray-500 hover:ring-2 hover:ring-gray-500 transition-all duration-200" /> Remember me
            </label>
            <a href="#" className="text-blue-600 underline text-sm hover:text-blue-800 transition">Forgot password?</a>
          </div>
          <ButtonStyle11 className="mb-6 text-center" ButtonText="Sign In" onClick={functionHandling} />
            {/* Company Signup Prompt */}
            <div className="mb-2 text-center">
          <span className="text-gray-700 font-medium">Signing up as a company?</span>
          <Link href={ROUTES.COMPSIGNUP} className="ml-2 text-green-700 font-semibold underline hover:text-green-900">Click here</Link>
        </div>
        
        <div className="mt-4 text-center text-sm">
          Dont have an account? <Link href={ROUTES.USERSIGNUP} className="text-green-700 underline">Sign up for free</Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin; 