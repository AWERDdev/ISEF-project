'use client'

import Navbar from "@/Components/NavBarNoAUTH2";
import { useRouter } from 'next/navigation';
import { useAppData } from '@/Tools/useAppData';
import { AuthGuard } from '@/Components/AuthGuard';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from "@/Config";
import type {Medicine} from '@/Types/Medicine'
import { ButtonStyle8, ButtonStyle9 } from '@/Components/ButtonStyles';
import { LoadingPage, ErrorPage } from '@/Components/PageHandle';
import { ROUTES } from "@/Types/Routes";

  const MainPage: React.FC = ()=> {
  const router = useRouter();
  const { user, userType } = useAppData();
  const [ medicines, setMedicines ] = useState<Medicine[]>([]);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState<string | null>(null);
  const goToCONTACT = () => {
    router.push(ROUTES.CONTACT);
  };

  const verifyToken = async () => {
    
    try {
      const token = localStorage.getItem('USERtoken') || localStorage.getItem('COMPtoken');
      if (!token) {
        return false;
      }
      const response = await fetch(`${API_BASE_URL}/apiAUTH/validateToken`,{
        method:"GET",
        headers:{
          'Authorization': `Bearer ${token}` 
        }
      });
      const data = await response.json();
      
      return data.AUTH === true;
    } catch (error) {
      console.log(`failed to validate ${error}`);
      return false;
    }
  }
  const fetchMedicines = async () => {
    
    try {
      setLoading(true);
      setError(null);
      console.log('fetching medicine')
      // fetch-and-store
      const response = await fetch(`${API_BASE_URL}/api/MEDPage/all`,{
        method:"Post",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('USERtoken')||localStorage.getItem('COMPtoken')} ` 
        },
        // body:JSON.stringify({source:"local",count:20})
         body:JSON.stringify({page:1, limit:20})
      });
      const data = await response.json();
      console.log('Medicines fetched:', data);
      // Check if the response is ok and contains the expected data
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch medicines');
      }
      if (data.success) {
        setMedicines(data.medicines);
      } else {
        setError('Failed to load medicines');
      }
    } catch (err) {
      setError('Failed to load medicines');
      console.error('Error fetching medicines:', err);
    } finally {
      setLoading(false);
    }
  };
  const handleFunctions = async () => {
    const tokenVerified = await verifyToken();

    if (!tokenVerified) {
      console.log('token invalid');
      router.push(ROUTES.HOME);
    } else {
      fetchMedicines();
    }
  };

  useEffect(() => {
    handleFunctions();
  },[]);

  const handleMedicineClick = (medicineId: string) => {
    router.push(`/medicine/${medicineId}`);
  };

  return (
    <AuthGuard>
      <main className="bg-gray-50 min-h-screen">
        <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name || 'User'}!
          </h2>
          <p className="text-gray-600">
            {userType === 'USER' 
              ? 'Browse our medicine catalog and place orders for your needs.'
              : 'Manage your hospital\'s medicine supply chain efficiently.'
            }
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-2 text-center">Available Medicines</h2>
        <p className="text-gray-600 mb-8 text-center">Click on any medicine to view detailed information and place orders</p>
        
        {loading ? (
          <LoadingPage />
        ) : error ? (
          <ErrorPage error={error} />
        ) : (
          /* Medicine Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {medicines.map((medicine) => (
              <div
                key={medicine._id}
                onClick={() => handleMedicineClick(medicine._id)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 cursor-pointer group"
              >
                {/* Medicine Image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-xl overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-6xl text-blue-600 font-bold">{medicine.image}</div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      medicine.stock === "In Stock" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-orange-100 text-orange-700"
                    }`}>
                      {medicine.stock}
                    </span>
                  </div>
                </div>

                {/* Medicine Info */}
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                      {medicine.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {medicine.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {medicine.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                      ${medicine.price.toFixed(2)}
                    </span>
                    <ButtonStyle8 ButtonText="View Detail" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12 grid justify-center ">
          <p className="text-gray-600 mb-4 ">Need more medicines or bulk orders?</p>
          <ButtonStyle9 onClick={goToCONTACT} ButtonText="Contact sales Team" />
        </div>
      </div>
      </main>
    </AuthGuard>
  );
}

export default MainPage