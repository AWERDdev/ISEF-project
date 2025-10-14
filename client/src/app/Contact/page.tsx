'use client'
import Navbar from "@/Components/NavBar";
import BottomNav from "@/Components/BottomNav"
import { Facebook, Phone, Mail, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <main>
      <header>
        <Navbar />
      </header>
      <div className="main flex flex-col items-center px-4 py-10 max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-blue-700">Contact Us</h1>
        <div className="flex flex-col gap-6 w-full">
          <a href="https://facebook.com/medisupply" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg shadow hover:bg-blue-100 transition">
            <Facebook className="text-blue-600" size={32} />
            <span className="text-lg font-semibold text-blue-700">Facebook: facebook.com/medisupply</span>
          </a>
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-green-50 rounded-lg shadow hover:bg-green-100 transition">
            <MessageCircle className="text-green-600" size={32} />
            <span className="text-lg font-semibold text-green-700">WhatsApp: +1 (234) 567-890</span>
          </a>
          <a href="mailto:info@medisupply.com" className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow hover:bg-gray-100 transition">
            <Mail className="text-gray-600" size={32} />
            <span className="text-lg font-semibold text-gray-700">Email: info@medisupply.com</span>
          </a>
          <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg shadow">
            <Phone className="text-yellow-600" size={32} />
            <span className="text-lg font-semibold text-yellow-700">Phone: +1 (XXX) XXX-XXXX</span>
          </div>
        </div>
      </div>
      <div className="sec4">
        <BottomNav />
      </div>
    </main>
  );
}
