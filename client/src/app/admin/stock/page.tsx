"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Package, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { API_BASE_URL } from "@/Config";
import type { Medicine } from "@/Types/Medicine";

const StockManagement: React.FC = () => {
  const router = useRouter();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/MEDPage/all`,{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',

        },
        body:JSON.stringify({page:1,limit:20})
      });
      const data = await response.json();
      
      if (data.success) {
        setMedicines(data.medicines);
      } else {
        setError("Failed to load medicines");
      }
    } catch (error) {
      setError("Network error");
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const toggleStockStatus = async (medicineId: string, currentStatus: boolean) => {
    try {
      setUpdating(medicineId);
      const response = await fetch(`${API_BASE_URL}/api/MEDPage/${medicineId}/stock`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inStock: !currentStatus
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setMedicines(prev => 
          prev.map(medicine => 
            medicine._id === medicineId 
              ? { ...medicine, inStock: !currentStatus }
              : medicine
          )
        );
      } else {
        setError("Failed to update stock status");
      }
    } catch (error) {
      setError("Network error");
      console.log(error)
    } finally {
      setUpdating(null);
    }
  };

  if (loading) {
    return (
      <main className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <RefreshCw className="animate-spin mx-auto mb-4 text-blue-500" size={32} />
              <p className="text-gray-600">Loading medicines...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push("/admin")}
                className="cursor-pointer flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Dashboard
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Stock Management</h1>
            </div>
            <button
              onClick={fetchMedicines}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Medicines</p>
                  <p className="text-2xl font-bold text-gray-800">{medicines.length}</p>
                </div>
                <Package className="text-blue-500" size={24} />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">In Stock</p>
                  <p className="text-2xl font-bold text-green-600">
                    {medicines.filter(m => m.inStock).length}
                  </p>
                </div>
                <CheckCircle className="text-green-500" size={24} />
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Out of Stock</p>
                  <p className="text-2xl font-bold text-red-600">
                    {medicines.filter(m => !m.inStock).length}
                  </p>
                </div>
                <XCircle className="text-red-500" size={24} />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Medicines Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Medicine Inventory</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Medicine
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {medicines.map((medicine) => (
                    <tr key={medicine._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-2xl text-blue-600 mr-3">
                            {medicine.image}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {medicine.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {medicine.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${medicine.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {medicine.stock.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          medicine.inStock 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {medicine.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => toggleStockStatus(medicine._id, medicine.inStock)}
                          disabled={updating === medicine._id}
                          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                            medicine.inStock
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          } ${updating === medicine._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {updating === medicine._id ? (
                            <RefreshCw className="animate-spin" size={14} />
                          ) : (
                            medicine.inStock ? 'Set Out of Stock' : 'Set In Stock'
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default StockManagement; 