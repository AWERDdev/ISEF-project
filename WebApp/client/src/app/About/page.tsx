'use client'
import Navbar from "@/Components/NavBar";
import BottomNav from "@/Components/BottomNav";

export default function About() {
  return (
    <main>
      <header>
        <Navbar />
      </header>
      <div className="main flex flex-col items-center px-4 py-10 max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2 text-blue-700">About MediSupply</h1>
          <p className="text-lg text-gray-700">
            MediSupply is a next-generation medical supply management platform, designed to connect hospitals, pharmacies, and suppliers with real-time inventory, seamless ordering, and secure transactions. Our mission is to simplify and modernize the medical supply chain for healthcare providers everywhere.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Our Mission</h2>
          <p className="text-gray-600">
            To empower healthcare organizations with reliable, efficient, and transparent access to medical supplies, ensuring better patient care and operational excellence.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-purple-700 mb-2">Our Vision</h2>
          <p className="text-gray-600">
            To be the global leader in digital medical supply solutions, trusted by healthcare professionals for innovation, security, and service.
          </p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-orange-600 mb-2">Our Values</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Integrity & Transparency</li>
            <li>Innovation in Healthcare</li>
            <li>Customer-Centric Service</li>
            <li>Security & Compliance</li>
            <li>Collaboration & Teamwork</li>
          </ul>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Who We Are</h2>
          <p className="text-gray-600">
            MediSupply was founded by a team of healthcare and technology professionals passionate about improving the way medical supplies are managed and delivered. Our company is committed to building tools that make a real difference in the lives of patients and providers.
          </p>
        </div>
      </div>
      <div className="sec4">
        <BottomNav />
      </div>
    </main>
  );
}
