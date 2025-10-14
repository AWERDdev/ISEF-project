"use client";
import Navbar from "@/Components/NavBarNoAUTH2";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/Types/Routes";
import type { Medicine } from "@/Types/Medicine";

const ShoppingCartPage: React.FC = () => {
  const [cart, setCart] = useState<Array<{ medicine: Medicine; quantity: number }>>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      const userId = localStorage.getItem("USERID") || localStorage.getItem("COMPID");
      if (!userId) {
        setCart([]);
        setLoading(false);
        return;
      }
      // Get cart from localStorage
      const localCart: Array<{ medicineId: string; quantity: number }> = JSON.parse(localStorage.getItem("cart") || "[]");
      if (localCart.length === 0) {
        setCart([]);
        setLoading(false);
        return;
      }
      // Fetch medicine details for each item
      const items = await Promise.all(
        localCart.map(async (item) => {
          const res = await fetch(`http://localhost:3500/api/MEDPage/${item.medicineId}`);
          const data = await res.json();
          return data.success ? { medicine: data.medicine, quantity: item.quantity } : null;
        })
      );
      setCart(items.filter(Boolean) as Array<{ medicine: Medicine; quantity: number }>);
      setLoading(false);
    };
    fetchCart();
  }, []);

  const handleRemove = async (medicineId: string) => {
    const userId = localStorage.getItem("USERID") || localStorage.getItem("COMPID");
    if (!userId) return;
    // Remove from localStorage
    const localCart: Array<{ medicineId: string; quantity: number }> = JSON.parse(localStorage.getItem("cart") || "[]");
    const newCart = localCart.filter((item) => item.medicineId !== medicineId);
    localStorage.setItem("cart", JSON.stringify(newCart));
    // Remove from DB
    await fetch("http://localhost:3500/api/ShoppingCart/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, medicineId })
    });
    setCart((prev) => prev.filter((item) => item.medicine._id !== medicineId));
  };

  const handleBuy = () => {
    // Store purchase info and go to PurchasePage
    const purchase = cart.map((item) => ({ medicineId: item.medicine._id, quantity: item.quantity }));
    localStorage.setItem("purchase", JSON.stringify(purchase));
    router.push(ROUTES.PURCHASE_PAGE);
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
        {loading ? (
          <div>Loading...</div>
        ) : cart.length === 0 ? (
          <div>Your cart is empty.</div>
        ) : (
          <>
            <div className="grid gap-6 mb-8">
              {cart.map((item) => (
                <div key={item.medicine._id} className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="text-5xl text-blue-600">{item.medicine.image}</div>
                    <div>
                      <h3 className="text-xl font-semibold">{item.medicine.name}</h3>
                      <div className="text-gray-600">{item.medicine.category}</div>
                      <div className="text-gray-500">{item.quantity} × ${item.medicine.price.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-4 md:mt-0">
                    <button onClick={() => handleRemove(item.medicine._id)} className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 cursor-pointer">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button onClick={handleBuy} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 cursor-pointer">Buy All</button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default ShoppingCartPage;
