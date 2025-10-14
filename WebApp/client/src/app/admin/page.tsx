"use client";
// import { useState } from "react";
import { useRouter } from "next/navigation";
import { Package, ShoppingBag, LogOut } from "lucide-react";

const AdminDashboard: React.FC = () => {
  const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("USERID");
    localStorage.removeItem("COMPID");
    localStorage.removeItem("token");
    router.push("/SelectLogin");
  };

  const adminFeatures = [
    {
      title: "Stock Management",
      description: "View and manage medicine stock status",
      icon: Package,
      path: "/admin/stock",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Order Management", 
      description: "View and update order status",
      icon: ShoppingBag,
      path: "/admin/orders",
      color: "bg-green-500 hover:bg-green-600"
    }
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-2">Welcome to Admin Panel</h2>
            <p className="text-gray-600">
              Manage your medical inventory and track customer orders efficiently.
            </p>
          </div>

          {/* Admin Features Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {adminFeatures.map((feature, index) => (
              <div
                key={index}
                onClick={() => router.push(feature.path)}
                className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-200 border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${feature.color} text-white`}>
                    <feature.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Medicines</p>
                  <p className="text-2xl font-bold text-gray-800">--</p>
                </div>
                <Package className="text-blue-500" size={24} />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-800">--</p>
                </div>
                <ShoppingBag className="text-green-500" size={24} />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Pending Orders</p>
                  <p className="text-2xl font-bold text-orange-500">--</p>
                </div>
                <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard; 