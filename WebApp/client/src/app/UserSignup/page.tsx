"use client";
import NavBarNoAUTH from "@/Components/NavBarNoAUTH";
import { API_BASE_URL } from "@/Config";
import { useSignupInputHandling } from "@/Tools/useInputHandling";
import Link from "next/link";
import { ROUTES } from '@/Types/Routes';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { ButtonStyle10 } from '@/Components/ButtonStyles';
const UserSignup: React.FC = () => {
  const navigateTo = useRouter()
  const {
    name, setName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    phone, setPhone,
    address, setAddress,
    errors, 
    validate,
  } = useSignupInputHandling()

  const [apiError, setApiError] = useState("");

  const SendData = async () => {
    setApiError("");
    const response = await fetch(`${API_BASE_URL}/apiAUTH/USER/Signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, phone, address })
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('USERtoken', data.token);
      localStorage.setItem('USERID', data.USER.id);
      localStorage.setItem('USERname', data.USER.name);
      localStorage.setItem('USERemail', data.USER.email);
      localStorage.setItem('userType', 'USER');
      return data.success;
    } else {
      setApiError(data.message || "Signup failed. Please try again.");
      return false;
    }
  };

  const functionHandling = async () => {
    // First validate inputs
    const isValid = await validate();
    
    if (isValid) {
        // If validation passes, send data to API
        const SignupSuccess = await SendData();
        if (SignupSuccess) {
          navigateTo.push('MainPage')
        }
    }
};

  return (
    <>
    <div className="min-h-screen bg-gradient-to-r from-white to-green-50 flex flex-col items-center">
      <NavBarNoAUTH />
      <div className=" w-full max-w-lg bg-white rounded-2xl shadow-2xl mt-10 p-10 border border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <div className="mb-2">
            <span className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
              {/* Placeholder for logo */}
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#2563eb"/><path d="M7 12h10M12 7v10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-center">Create Your Account</h1>
          <p className="text-gray-500 text-center text-sm">Join MediSupply as an individual user</p>
        </div>
        {/* User Information */}
        <div className="mb-6">
          <h2 className="flex items-center text-lg font-semibold mb-2">
            <span className="mr-2 text-blue-600">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#2563eb"/><path d="M7 12h10M12 7v10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            </span>
            Personal Information
          </h2>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-400 rounded-lg px-5 py-4 mb-2 focus:outline-none focus:border-gray-500 focus:bg-gray-50 hover:border-gray-500 hover:bg-gray-50 transition-all duration-200 shadow-sm"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {errors.name && <div className="text-red-500 text-xs mb-3 ml-1">{errors.name}</div>}
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-400 rounded-lg px-5 py-4 mb-2 focus:outline-none focus:border-gray-500 focus:bg-gray-50 hover:border-gray-500 hover:bg-gray-50 transition-all duration-200 shadow-sm"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {errors.email && <div className="text-red-500 text-xs mb-3 ml-1">{errors.email}</div>}
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full border border-gray-400 rounded-lg px-5 py-4 mb-2 focus:outline-none focus:border-gray-500 focus:bg-gray-50 hover:border-gray-500 hover:bg-gray-50 transition-all duration-200 shadow-sm"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          {errors.phone && <div className="text-red-500 text-xs mb-3 ml-1">{errors.phone}</div>}
          <input
            type="text"
            placeholder="Address"
            className="w-full border border-gray-400 rounded-lg px-5 py-4 mb-2 focus:outline-none focus:border-gray-500 focus:bg-gray-50 hover:border-gray-500 hover:bg-gray-50 transition-all duration-200 shadow-sm"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          {errors.address && <div className="text-red-500 text-xs mb-3 ml-1">{errors.address}</div>}
        </div>
        {/* Account Security */}
        <div className="mb-6">
          <h2 className="flex items-center text-lg font-semibold mb-2">
            <span className="mr-2 text-purple-600">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#a21caf"/><path d="M7 12h10M12 7v10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            </span>
            Account Security
          </h2>
          <div className="grid grid-cols-1 gap-2 mb-1">
            <input
              type="password"
              placeholder="Password"
              className="flex-1 border border-gray-400 rounded-lg px-5 py-4 md:mr-2 focus:outline-none focus:border-gray-500 focus:bg-gray-50 hover:border-gray-500 hover:bg-gray-50 transition-all duration-200 shadow-sm"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="flex-1 border border-gray-400 rounded-lg px-5 py-4 focus:outline-none focus:border-gray-500 focus:bg-gray-50 hover:border-gray-500 hover:bg-gray-50 transition-all duration-200 shadow-sm"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
          {errors.password && <div className="text-red-500 text-xs mb-1">{errors.password}</div>}
          {errors.confirmPassword && <div className="text-red-500 text-xs mb-1">{errors.confirmPassword}</div>}
        </div>
        {/* Terms and Create Account */}
        <div className="mb-6 flex items-center">
          <input type="checkbox" id="terms" className="mr-2 accent-blue-600 rounded border border-gray-400 focus:ring-2 focus:ring-gray-500 hover:ring-2 hover:ring-gray-500 transition-all duration-200" />
          <label htmlFor="terms" className="text-sm">I agree to the <a href="#" className="text-blue-600 underline">Terms of Service</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a></label>
        </div>
        {apiError && (
          <div className="mb-4 text-center text-red-600 font-semibold text-sm">{apiError}</div>
        )}
        <ButtonStyle10 ButtonText="Create Account" onClick={functionHandling} className="mb-6 text-center" />
        {/* Company Signup Prompt */}
        <div className="mb-2 text-center">
          <span className="text-gray-700 font-medium">Signing up as a company?</span>
          <Link href={ROUTES.COMPSIGNUP}className="ml-2 text-green-700 font-semibold underline hover:text-green-900">Click here</Link>
        </div>
        {/* Already have an account */}
        <div className="mt-4 text-center text-sm">
          Already have an account? <Link href={ROUTES.USERLOGIN} className="text-blue-600 underline">Sign in here</Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default UserSignup; 