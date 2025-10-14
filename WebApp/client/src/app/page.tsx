'use client';

import Navbar from "@/Components/NavBar";
import { ButtonStyle1 , ButtonStyle2 } from "@/Components/ButtonStyles";
import BottomNav from "@/Components/BottomNav"
import Card from "@/Components/Card";
import { Box, Search, Building, Truck, Shield, Headphones } from "lucide-react";
import { useRouter } from 'next/navigation';

const Home: React.FC = () => {
  const router = useRouter();
  const goToSelectSignup = () => {
    router.push('/SelectSignup');
  };

  return (
    <main className="bg-gradient-to-b from-blue-50 to-green-50 min-h-screen flex flex-col">
      <Navbar />
      <section className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        {/* Hero Section */}
        <div className="w-full max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Medical Supply <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Made Simple</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Connect hospitals and pharmacies with reliable medicine suppliers. Real-time inventory, seamless ordering, and professional healthcare solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonStyle1 ButtonText='Get Started' onClick={goToSelectSignup} />
          </div>
        </div>
        {/* Features Section */}
        <div className="w-full max-w-5xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-2">Why Choose MediSupply?</h2>
          <p className="text-gray-500 text-center mb-8">Everything you need to manage medical supplies efficiently and reliably</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            <Card Title={<span className="text-blue-600 font-bold">Real-time Inventory</span>} P='Track medicine stock levels in real-time across all your locations' ICON={<Box className="text-blue-600" size={40} />} />
            <Card Title={<span className="text-green-600 font-bold">Smart Search</span>} P='Find medicines quickly with our advanced search and filtering system' ICON={<Search className="text-green-600" size={40} />} />
            <Card Title={<span className="text-purple-600 font-bold">Multi-Location</span>} P='Manage multiple hospitals and pharmacy locations from one dashboard' ICON={<Building className="text-purple-600" size={40} />} />
            <Card Title={<span className="text-orange-500 font-bold">Fast Delivery</span>} P='Reliable delivery network ensuring medicines reach you on time' ICON={<Truck className="text-orange-500" size={40} />} />
            <Card Title={<span className="text-red-600 font-bold">Secure & Compliant</span>} P='HIPAA compliant with enterprise-grade security for all transactions' ICON={<Shield className="text-red-600" size={40} />} />
            <Card Title={<span className="text-teal-600 font-bold">24/7 Support</span>} P='Round-the-clock customer support for all your medical supply needs' ICON={<Headphones className="text-teal-600" size={40} />} />
          </div>
        </div>
        {/* Call to Action Section */}
        <div className="w-full max-w-2xl mx-auto text-center justify-center items-center mt-12 mb-8">
          <h2 className="text-3xl font-bold mb-2">Ready to Transform Your Medical Supply Chain?</h2>
          <p className="text-gray-600 mb-6">Join thousands of healthcare providers who trust MediSupply for their medicine needs</p>
          <ButtonStyle2 className="grid justify-self-center" ButtonText='Start Free Trial' onClick={goToSelectSignup} />
        </div>
      </section>
      <BottomNav />
    </main>
  );
}
export default Home