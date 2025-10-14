"use client";
import { useState } from "react";
import Navbar from "@/Components/NavBarNoAUTH2";

const UserDataUpdatePage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const userId = localStorage.getItem("USERID");
    if (!userId) {
      setMessage("User not logged in.");
      setLoading(false);
      return;
    }
    try {
      console.log("Sending request with data:", { userId, ...form });
      const res = await fetch("http://localhost:3500/apiAUTH/user/Update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...form })
      });
      console.log("Response status:", res.status);
      console.log("Response headers:", res.headers);
      const data = await res.json();
      console.log("Response data:", data);
      if (data.success) {
        setMessage("User data updated successfully.");
      } else {
        setMessage(data.message || "Failed to update user data.");
      }
    } catch (error: unknown) {
      console.error("Detailed error:", error);
      if (error instanceof Error) {
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
      }
      setMessage("An error occurred. Please try again.");
    }
    setLoading(false);
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Update User Data</h2>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border rounded px-3 py-2" required />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border rounded px-3 py-2" required />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border rounded px-3 py-2" required />
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="border rounded px-3 py-2" required />
          <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border rounded px-3 py-2" required />
          <button type="submit" className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 cursor-pointer" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
          {message && (() => { console.log('Message label:', message); return <div className="mt-2 text-center text-sm text-blue-600">{message}</div>; })()}
        </form>
      </div>
    </main>
  );
};

export default UserDataUpdatePage;
