'use client';

import Navbar from "@/Components/NavBarNoAUTH2";
import { ArrowLeft, ShoppingCart, Heart, Share2, Star, Truck, Shield, Clock } from "lucide-react";
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ButtonStyle2, ButtonStyle5, ButtonStyle6,  ButtonStyle9 } from '@/Components/ButtonStyles';
import { LoadingPage, ErrorPage } from '@/Components/PageHandle';
import type { Medicine } from "@/Types/Medicine";


const MedicineDetail: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`http://localhost:3500/api/MEDPage/${params?.id}`);
        const data = await response.json();
        
        if (data.success) {
          setMedicine(data.medicine);
        } else {
          setError('Medicine not found');
        }
      } catch (err) {
        setError('Failed to load medicine details');
        console.error('Error fetching medicine:', err);
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) fetchMedicine();
  }, [params]);

  const handleQuantityChange = (newQuantity: number) => {
    if (medicine && newQuantity >= 1 && newQuantity <= medicine.maxOrder) {
      setQuantity(newQuantity);
    }
  };

  const logActivity = async (type: 'favorite' | 'add_to_cart' | 'buy' | 'request_quote', quantityOverride?: number) => {
    if (!medicine) return;
    const userId = localStorage.getItem('USERID') || localStorage.getItem('COMPID');
    if (!userId) return;
    await fetch('http://localhost:3500/api/user-activity/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, type, medicineId: medicine._id, quantity: quantityOverride ?? quantity })
    });
  };

  const handleRequestQuote = async () => {
    if (medicine) {
      const userId = localStorage.getItem('USERID') || localStorage.getItem('COMPID');
      if (!userId) return alert('Please log in first.');
      await fetch('http://localhost:3500/api/QuoteRequest/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, medicineId: medicine._id, quantity })
      });
      await logActivity('request_quote');
      alert(`Quote requested for ${quantity} units of ${medicine.name}`);
    }
  };

  const handleMedicinepurchase = async () => {
    if (medicine) {
      localStorage.setItem('purchase', JSON.stringify([{ medicineId: medicine._id, quantity, MEDPrice:medicine.price }]));
      await logActivity('buy');
      router.push('/PurchasePage');
    }
  };

  const handleAddToCart = async () => {
    if (medicine) {
      const userId = localStorage.getItem('USERID') || localStorage.getItem('COMPID');
      if (!userId) return alert('Please log in first.');
      const cart: Array<{medicineId: string, quantity: number}> = JSON.parse(localStorage.getItem('cart') || '[]');
      const idx = cart.findIndex((item) => item.medicineId === medicine._id);
      if (idx > -1) {
        cart[idx].quantity = quantity;
      } else {
        cart.push({ medicineId: medicine._id, quantity });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      await fetch('http://localhost:3500/api/ShoppingCart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, medicineId: medicine._id, quantity })
      });
      await logActivity('add_to_cart');
      alert(`${quantity} units of ${medicine.name} added to cart`);
    }
  };

  const handleFavorite = async () => {
    setIsFavorite(!isFavorite);
    await logActivity('favorite', 1);
  };

  if (loading) {
    return (
      <main className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <LoadingPage />
        </div>
      </main>
    );
  }

  if (error || !medicine) {
    return (
      <main className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <ErrorPage error={error || 'Medicine not found'} />
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            Back to Catalog
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Image and Basic Info */}
          <div>
            {/* Medicine Image */}
            <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
              <div className="relative h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                <div className="text-8xl text-blue-600 font-bold">{medicine.image}</div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <ButtonStyle5 
                    ButtonText="" 
                    onClick={handleFavorite}
                    className={isFavorite ? 'bg-red-100 text-red-600' : ''}
                  >
                    <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                  </ButtonStyle5>
                  <ButtonStyle5 ButtonText="">
                    <Share2 size={20} />
                  </ButtonStyle5>
                </div>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 text-center shadow-md">
                <Truck className="text-blue-600 mx-auto mb-2" size={24} />
                <div className="text-sm text-gray-600">Delivery</div>
                <div className="font-semibold">{medicine.deliveryTime}</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md">
                <Shield className="text-green-600 mx-auto mb-2" size={24} />
                <div className="text-sm text-gray-600">Stock</div>
                <div className="font-semibold text-green-600">{medicine.stock}</div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center shadow-md">
                <Clock className="text-orange-600 mx-auto mb-2" size={24} />
                <div className="text-sm text-gray-600">Expires</div>
                <div className="font-semibold">{new Date(medicine.expiryDate).toLocaleDateString()}</div>
              </div>
            </div>
          </div>

          {/* Right Column - Details and Actions */}
          <div>
            {/* Medicine Header */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="mb-4">
                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                  {medicine.category}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{medicine.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400" size={16} fill="currentColor" />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">(4.8/5)</span>
                </div>
                <span className="text-sm text-gray-500">• 127 reviews</span>
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-4">
                ${medicine.price.toFixed(2)} per unit
              </div>
              <p className="text-gray-600 mb-6">{medicine.description}</p>
            </div>

            {/* Quantity and Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Order Details</h3>
              
              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity (Minimum: {medicine.minimumOrder})
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <ButtonStyle6
                      ButtonText="-"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    />
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      min={1}
                      max={medicine.maxOrder}
                      className="w-20 text-center border-x py-2 focus:outline-none"
                    />
                    <ButtonStyle6
                      ButtonText="+"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= medicine.maxOrder}
                    />
                  </div>
                  <span className="text-sm text-gray-500">
                    Max: {medicine.maxOrder.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Price:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${(medicine.price * quantity).toFixed(2)}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {quantity} units × ${medicine.price.toFixed(2)} per unit
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <ButtonStyle9
                  ButtonText="Add to Cart"
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                </ButtonStyle9>
                <ButtonStyle2
                  ButtonText="Request Quote"
                  onClick={handleRequestQuote}
                  className="flex-1 border-2 border-blue-600 hover:bg-blue-600 hover:text-white"
                />
                 <ButtonStyle2
                  ButtonText="Buy Medicine"
                  onClick={handleMedicinepurchase}
                  className="flex-1 border-2 border-blue-600 hover:bg-blue-600 hover:text-white"
                />
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {medicine.certifications.map((cert, index) => (
                  <span key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="mt-12">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Detailed Description */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Detailed Description</h3>
              <div className="prose prose-sm max-w-none">
                {medicine.description &&
                  medicine.description.split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index} className="mb-4 text-gray-600 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Specifications</h3>
              <div className="space-y-4">
                <div>
                  <span className="font-medium text-gray-700">Dosage:</span>
                  <p className="text-gray-600">{medicine.dosage}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Manufacturer:</span>
                  <p className="text-gray-600">{medicine.manufacturer}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Side Effects:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {medicine.sideEffects.map((effect, index) => (
                      <span key={index} className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                        {effect}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Contraindications:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {medicine.contraindications.map((contra, index) => (
                      <span key={index} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                        {contra}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MedicineDetail; 