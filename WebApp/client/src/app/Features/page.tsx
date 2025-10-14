'use client'
import Navbar from "@/Components/NavBar";
import BottomNav from "@/Components/BottomNav";
import { Box, Search, Building, Truck, Shield, Headphones, Globe, CheckCircle } from "lucide-react";

export default function Features() {
  return (
    <main>
      <header>
        <Navbar />
      </header>
      <div className="main flex flex-col items-center px-4 py-10 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-green-700">Platform Features</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <Box className="text-blue-600 mb-2" size={40} />
            <h2 className="font-bold text-lg mb-1">Real-time Inventory</h2>
            <p className="text-gray-600 text-center">Track medicine stock levels instantly across all your locations.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <Search className="text-green-600 mb-2" size={40} />
            <h2 className="font-bold text-lg mb-1">Smart Search</h2>
            <p className="text-gray-600 text-center">Find medicines quickly with advanced search and filtering.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <Building className="text-purple-600 mb-2" size={40} />
            <h2 className="font-bold text-lg mb-1">Multi-Location Management</h2>
            <p className="text-gray-600 text-center">Manage multiple hospitals and pharmacies from one dashboard.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <Truck className="text-orange-500 mb-2" size={40} />
            <h2 className="font-bold text-lg mb-1">Fast & Reliable Delivery</h2>
            <p className="text-gray-600 text-center">Our network ensures medicines reach you on time, every time.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <Shield className="text-red-600 mb-2" size={40} />
            <h2 className="font-bold text-lg mb-1">Secure & Compliant</h2>
            <p className="text-gray-600 text-center">HIPAA compliant with enterprise-grade security for all transactions.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <Headphones className="text-teal-600 mb-2" size={40} />
            <h2 className="font-bold text-lg mb-1">24/7 Support</h2>
            <p className="text-gray-600 text-center">Round-the-clock customer support for all your medical supply needs.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <Globe className="text-indigo-600 mb-2" size={40} />
            <h2 className="font-bold text-lg mb-1">Global Supplier Network</h2>
            <p className="text-gray-600 text-center">Access a wide range of trusted suppliers worldwide.</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
            <CheckCircle className="text-green-700 mb-2" size={40} />
            <h2 className="font-bold text-lg mb-1">Order Accuracy</h2>
            <p className="text-gray-600 text-center">Automated checks ensure you get exactly what you order.</p>
          </div>
        </div>
      </div>
      <div className="sec4">
        <BottomNav />
      </div>
    </main>
  );
}
