"use client";
import Navbar from "@/Components/NavBarNoAUTH2";
import { useEffect, useState } from "react";
import type { Medicine } from "@/Types/Medicine";
import { useRouter } from 'next/navigation';
import { ButtonStyle8 } from '@/Components/ButtonStyles';
interface Activity {
  _id: string;
  medicine: Medicine;
  createdAt: string;
}

const FavoritesPage: React.FC = () => {
  const router = useRouter();
  const [favorites, setFavorites] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      const userId = localStorage.getItem("USERID") || localStorage.getItem("COMPID");
      if (!userId) {
        setFavorites([]);
        setLoading(false);
        return;
      }
      const res = await fetch(`http://localhost:3500/api/user-activity/list/${userId}?type=favorite`);
      const data = await res.json();
      if (data.success) setFavorites(data.activities);
      setLoading(false);
    };
    fetchFavorites();
  }, []);

  const handleMedicineClick = (medicineId: string) => {
    router.push(`/medicine/${medicineId}`);
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Favorite Medicines</h2>
        {loading ? (
          <div>Loading...</div>
        ) : favorites.length === 0 ? (
          <div>You have no favorite medicines yet.</div>
        ) : (
          <div className="grid gap-6">
            {favorites.map((fav) => (
               !fav.medicine ? null : (
              <div onClick={() => handleMedicineClick(fav.medicine._id)} key={fav._id} className="bg-white rounded-xl shadow-md p-6 flex items-center gap-6 cursor-pointer">
                <div className="text-5xl text-blue-600">{fav.medicine.image}</div>
                <div className="flex gap-6">
                  <div className="grid">
                  <div className="font-bold">{fav.medicine.name}</div>
                  <div className="text-gray-600 text-sm">{fav.medicine.category}</div>
                  <div className="text-gray-400 text-xs">{new Date(fav.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <ButtonStyle8 ButtonText="View Detail" />
                  </div>
                </div>
              </div>
            )))}
          </div>
        )}
      </div>
    </main>
  );
};

export default FavoritesPage; 