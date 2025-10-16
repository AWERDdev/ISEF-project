"use client";
import Navbar from "@/Components/NavBarNoAUTH";
import { useCompanySignupInputHandling } from "@/Tools/useInputHandling";
import { API_BASE_URL } from "@/Config";
import  { ROUTES } from "@/Types/Routes"
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { ButtonStyle10 } from '@/Components/ButtonStyles';

const Signup: React.FC = () => {
  const navigateTo = useRouter()
  const [apiError, setApiError] = useState("");
  const {
    companyName, setCompanyName,
    companyType, setCompanyType,
    medicalLicense, setMedicalLicense,
    adminName, setAdminName,
    phone, setPhone,
    companyEmail, setCompanyEmail,
    businessAddress, setBusinessAddress,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    errors,
    validate,
  } = useCompanySignupInputHandling()
  
  const SendData = async () => {
    setApiError("");
    const response = await fetch(`${API_BASE_URL}/apiAUTH/COMP/Signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({companyName,companyType,medicalLicense,password,phone,adminName,companyEmail,businessAddress})
    });
    const data = await response.json();
    if (response.ok) {
      console.log("Data sent successfully");
      console.log(data)
      localStorage.setItem('COMPtoken',data.token)
      localStorage.setItem('COMPID',data.COMP.id)
      localStorage.setItem('COMPname',data.COMP.name)
      localStorage.setItem('COMPemail',data.COMP.email)
      localStorage.setItem('userType', 'COMP');
      return data.success;
    } else {
      setApiError(data.message || "Signup failed. Please try again.");
      console.log("Failed to send data");
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
    <div className="min-h-screen bg-gradient-to-r from-white to-green-50 flex flex-col items-center">
      <Navbar />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl mt-10 p-10 border border-gray-100">
    
          <div className="flex flex-col items-center mb-6">
            <div className="mb-2">
              <span className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
                {/* Placeholder for logo */}
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#2563eb"/><path d="M7 12h10M12 7v10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              </span>
            </div>
            <h1 className="text-2xl font-bold text-center">Create Company Account</h1>
            <p className="text-gray-500 text-center text-sm">Join thousands of healthcare providers using MediSupply</p>
          </div>
          {/* Company Information */}
          <div className="mb-6">
            <h2 className="flex items-center text-lg font-semibold mb-2">
              <span className="mr-2 text-blue-600">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#2563eb"/><path d="M7 12h10M12 7v10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              </span>
              Company Information
            </h2>
            <div className="grid grid-cols-1 gap-2 md:flex md:gap-2 mb-2">
              <input
                type="text"
                placeholder="Company Name"
                className="flex-1 border border-gray-400 rounded-lg px-5 py-4 md:mr-2 focus:outline-none focus:border-gray-500 focus:bg-gray-50 hover:border-gray-500 hover:bg-gray-50 transition-all duration-200 shadow-sm"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
              />
              <select
                className="flex-1 border border-gray-400 rounded-lg px-5 py-4 text-gray-500 focus:outline-none focus:border-gray-500 focus:bg-gray-50 hover:border-gray-500 hover:bg-gray-50 transition-all duration-200 shadow-sm"
                value={companyType}
                onChange={e => setCompanyType(e.target.value)}
              >
                <option value="">Select type</option>
                <option value="Hospital">Hospital</option>
                <option value="Clinic">Clinic</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {errors.companyName && <div className="text-red-500 text-xs mb-1">{errors.companyName}</div>}
            {errors.companyType && <div className="text-red-500 text-xs mb-1">{errors.companyType}</div>}
            <input
              type="text"
              placeholder="Medical License Number"
              className="w-full border border-gray-400 rounded-lg px-4 py-3 mb-2 focus:outline-none focus:border-gray-500 focus:bg-gray-50 hover:border-gray-500 hover:bg-gray-50 transition-all duration-200 shadow-sm"
              value={medicalLicense}
              onChange={e => setMedicalLicense(e.target.value)}
            />
            {errors.medicalLicense && <div className="text-red-500 text-xs mb-1">{errors.medicalLicense}</div>}
          </div>
          {/* Contact Information */}
          <div className="mb-6">
            <h2 className="flex items-center text-lg font-semibold mb-2">
              <span className="mr-2 text-green-600">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="6" fill="#22c55e"/><path d="M7 12h10M12 7v10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              </span>
              Contact Information
            </h2>
            <div className="grid grid-cols-1 gap-2  mb-2">
              <input
                type="text"
                placeholder="Administrator Name"
                className="flex-1 border border-gray-400 rounded-lg px-5 py-4 md:mr-2 focus:outline-none focus:border-gray-500 focus:bg-gray-50 hover:border-gray-500 hover:bg-gray-50 transition-all duration-200 shadow-sm"
                value={adminName}
                onChange={e => setAdminName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="flex-1 border border-gray-400 rounded-lg px-5 py-4 focus:outline-none focus:border-gray-500 focus:bg-gray-50 hover:border-gray-500 hover:bg-gray-50 transition-all duration-200 shadow-sm"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
            {errors.adminName && <div className="text-red-500 text-xs mb-1">{errors.adminName}</div>}
            {errors.phone && <div className="text-red-500 text-xs mb-1">{errors.phone}</div>}
            <input
              type="email"
              placeholder="Company Email"
              className="w-full border border-gray-400 rounded-lg px-4 py-3 mb-2 focus:outline-none focus:border-gray-500 focus:bg-gray-50 hover:border-gray-500 hover:bg-gray-50 transition-all duration-200 shadow-sm"
              value={companyEmail}
              onChange={e => setCompanyEmail(e.target.value)}
            />
            {errors.companyEmail && <div className="text-red-500 text-xs mb-1">{errors.companyEmail}</div>}
            <input
              type="text"
              placeholder="Business Address"
              className="w-full border border-gray-400 rounded-lg px-4 py-3 mb-2 focus:outline-none focus:border-gray-500 focus:bg-gray-50 hover:border-gray-500 hover:bg-gray-50 transition-all duration-200 shadow-sm"
              value={businessAddress}
              onChange={e => setBusinessAddress(e.target.value)}
            />
            {errors.businessAddress && <div className="text-red-500 text-xs mb-1">{errors.businessAddress}</div>}
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
          <span className="text-gray-700 font-medium">Signing up as a User?</span>
          <Link href={ROUTES.USERSIGNUP}className="ml-2 text-green-700 font-semibold underline hover:text-green-900">Click here</Link>
        </div>
        
        <div className="mt-4 text-center text-sm">
          Already have an account? <Link href={ROUTES.COMPLOGIN} className="text-green-700 underline">Sign in </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup; 