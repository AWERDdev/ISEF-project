"use client";
import Navbar from "@/Components/NavBarNoAUTH2";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/Config";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface PaymentData {
  name: string;
  email: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  amount: number;
  items: CartItem[];
}

const PurchasePage: React.FC = () => {
  const [paymentData, setPaymentData] = useState<PaymentData>({
    name: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
    amount: 0,
    items: []
  });
  const [loading, setLoading] = useState(false);
  const [loadingCart, setLoadingCart] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Load cart data from localStorage and fetch medicine details
    const loadCartData = async () => {
      setLoadingCart(true);
      const cart = localStorage.getItem("cart");
      const purchase = localStorage.getItem("purchase");
      
      let itemsToProcess: Array<{ medicineId: string, quantity: number }> = [];
      
      if (purchase) {
        // If purchase exists, use it (from "Buy Medicine" button)
        itemsToProcess = JSON.parse(purchase);
      } else if (cart) {
        // Otherwise use cart (from "Buy All" in shopping cart)
        itemsToProcess = JSON.parse(cart);
      }
      
      if (itemsToProcess.length > 0) {
        try {
          // Fetch medicine details for each item
          const cartItemsPromises = itemsToProcess.map(async (item) => {
            const response = await fetch(`${API_BASE_URL}/api/MEDPage/${item.medicineId}`);
            const data = await response.json();
            
            if (data.success) {
              return {
                name: data.medicine.name,
                price: data.medicine.price,
                quantity: item.quantity
              };
            } else {
              console.error('Failed to fetch medicine:', item.medicineId);
              return null;
            }
          });
          
          const cartItemsResults = await Promise.all(cartItemsPromises);
          const validItems = cartItemsResults.filter((item): item is CartItem => item !== null);
          const total = validItems.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
          
          setPaymentData(prev => ({
            ...prev,
            items: validItems,
            amount: total
          }));
        } catch (error) {
          console.error('Error loading cart data:', error);
          setError('Failed to load cart items. Please try again.');
        }
      }
      setLoadingCart(false);
    };
    
    loadCartData();
  }, []);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateForm = () => {
    if (!paymentData.name || !paymentData.email || !paymentData.cardNumber || 
        !paymentData.expiryDate || !paymentData.cvv || !paymentData.address || 
        !paymentData.city || !paymentData.zipCode || !paymentData.country) {
      setError("Please fill in all fields");
      return false;
    }

    if (paymentData.cardNumber.replace(/\s/g, '').length !== 16) {
      setError("Please enter a valid 16-digit card number");
      return false;
    }

    if (paymentData.cvv.length !== 3) {
      setError("Please enter a valid 3-digit CVV");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(paymentData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/payment/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...paymentData,
          cardNumber: paymentData.cardNumber.replace(/\s/g, ''),
          amount: paymentData.amount * 100, // Convert to cents for Stripe
          currency: 'usd'
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
    localStorage.removeItem("cart");
    localStorage.removeItem("purchase");
        // Redirect to success page or show success message
        setTimeout(() => {
          window.location.href = '/MainPage';
        }, 3000);
      } else {
        setError(result.message || "Payment failed. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof PaymentData, value: string) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    }

    setPaymentData(prev => ({
      ...prev,
      [field]: formattedValue
    }));
  };

  if (success) {
    return (
      <main className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-4 text-green-600">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">Your order has been placed successfully.</p>
            <p className="text-sm text-gray-500">Redirecting to main page...</p>
          </div>
        </div>
      </main>
    );
  }

  if (loadingCart) {
    return (
      <main className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Loading Cart...</h2>
            <p className="text-gray-600">Please wait while we load your items.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Complete Your Purchase</h2>
          
          {paymentData.items.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">🛒</div>
              <h3 className="text-xl font-semibold mb-2">No Items Found</h3>
              <p className="text-gray-600 mb-4">It looks like your cart is empty or the items couldn&apos;t be loaded.</p>
              <button 
                onClick={() => window.location.href = '/MainPage'}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Order Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              {paymentData.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${paymentData.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                
                <label className="block">
                  <span className="text-gray-700 font-medium">Full Name</span>
                  <input
                    type="text"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={paymentData.name}
                    onChange={e => handleInputChange('name', e.target.value)}
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-700 font-medium">Email</span>
                  <input
                    type="email"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={paymentData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    required
                  />
                </label>
              </div>

              {/* Payment Information */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
                
                <label className="block">
                  <span className="text-gray-700 font-medium">Card Number</span>
                  <input
                    type="text"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={paymentData.cardNumber}
                    onChange={e => handleInputChange('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </label>

                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-gray-700 font-medium">Expiry Date</span>
                    <input
                      type="text"
                      className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={paymentData.expiryDate}
                      onChange={e => handleInputChange('expiryDate', e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="text-gray-700 font-medium">CVV</span>
                    <input
                      type="text"
                      className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={paymentData.cvv}
                      onChange={e => handleInputChange('cvv', e.target.value)}
                      placeholder="123"
                      maxLength={3}
                      required
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-gray-700 font-medium">Street Address</span>
                  <input
                    type="text"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={paymentData.address}
                    onChange={e => handleInputChange('address', e.target.value)}
                    required
                  />
                </label>

                <label className="block">
                  <span className="text-gray-700 font-medium">City</span>
                  <input
                    type="text"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={paymentData.city}
                    onChange={e => handleInputChange('city', e.target.value)}
                    required
                  />
          </label>

                <label className="block">
                  <span className="text-gray-700 font-medium">ZIP Code</span>
                  <input
                    type="text"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={paymentData.zipCode}
                    onChange={e => handleInputChange('zipCode', e.target.value)}
                    required
                  />
          </label>

                <label className="block">
                  <span className="text-gray-700 font-medium">Country</span>
                  <input
                    type="text"
                    className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={paymentData.country}
                    onChange={e => handleInputChange('country', e.target.value)}
                    required
                  />
          </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Processing Payment..." : `Pay $${paymentData.amount.toFixed(2)}`}
            </button>
        </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default PurchasePage;
