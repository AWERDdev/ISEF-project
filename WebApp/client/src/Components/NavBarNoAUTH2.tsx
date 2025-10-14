import { ROUTES } from "@/Types/Routes";
import Link from "next/link";
import { Box, ShoppingCart, User, LogOut } from "lucide-react";
import type { userProps } from '@/Types/User';
import { useAppData } from '@/Tools/useAppData';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  UserData?: userProps | null;
}

const Navbar: React.FC<NavbarProps> = () => {
  const { isAUTH, handleLogout } = useAppData();
  const [cartItems, setCartItems] = useState<Array<{ medicineId: string, quantity: number }>>([]);
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCart(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const goToCart = () => {
    router.push(ROUTES.SHOPPING_CART);
  };

  const handleBuyItem = (medicineId: string, quantity: number) => {
    localStorage.setItem('purchase', JSON.stringify([{ medicineId, quantity }]));
    router.push(ROUTES.PURCHASE_PAGE);
  };

  return (
    <>
      <main className="bg-white shadow-md w-full">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="webName flex items-center gap-2">
            <Link href={ROUTES.MAIN_PAGE}>
              <span className="bg-blue-100 flex rounded-lg p-1">
                <Box className="text-blue-600" size={28} />
                <h1 className="text-2xl flex font-bold text-blue-700">MediSupply</h1>
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="elements flex gap-8 items-center">
            {!isAUTH ? (
              <>
                <div className="elment">
                  <Link href={ROUTES.FEATURES} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Features</Link>
                </div>
                <div className="elment">
                  <Link href={ROUTES.ABOUT} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">ABOUT</Link>
                </div>
                <div className="elment">
                  <Link href={ROUTES.CONTACT} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">CONTACT</Link>
                </div>
              </>
            ) : (
              <>
                <div className="elment">
                  <Link href={ROUTES.FAVORITES} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Favorites</Link>
                </div>
                {/* Cart Dropdown */}
                <div className="relative" ref={cartRef}>
                  <button
                    onClick={() => setShowCart((v) => !v)}
                    className=" cursor-pointer relative p-2 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    <ShoppingCart className="text-blue-600" size={28} />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                        {cartItems.length}
                      </span>
                    )}
                  </button>
                  {showCart && (
                    <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg z-50 p-4">
                      <h4 className="font-bold mb-2">Cart Items</h4>
                      {cartItems.length === 0 ? (
                        <div className="text-gray-500">No items in cart.</div>
                      ) : (
                        <ul className="divide-y divide-gray-200">
                          {cartItems.map((item, idx) => (
                            <li key={item.medicineId + idx} className="py-2 flex items-center justify-between">
                              <span>Qty: {item.quantity}</span>
                              <button
                                className="text-blue-600 underline ml-2"
                                onClick={() => handleBuyItem(item.medicineId, item.quantity)}
                              >
                                Buy
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                      <button
                        className="mt-3 w-full bg-blue-600 text-white rounded px-4 py-2 font-bold hover:bg-blue-700"
                        onClick={goToCart}
                      >
                        Go to Cart
                      </button>
                    </div>
                  )}
                </div>
                <div className="elment">
                  <Link href={ROUTES.MAIN_PAGE} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Home</Link>
                </div>
                <div className="elment">
                  <Link
                    href={ROUTES.PROFILE}
                    className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors font-medium flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg"
                  >
                    <User size={16} />
                    Profile
                  </Link>
                </div>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 hover:text-red-800 transition-colors font-medium flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Navbar;