'use client';

import { useAppData } from '@/Tools/useAppData';
import Navbar from '@/Components/NavBarNoAUTH2';
import { User, Building, Mail, Phone, MapPin, Shield, LogOut, Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ButtonStyle3, ButtonStyle4, ButtonStyle7 } from '@/Components/ButtonStyles';
import { LoadingPage } from '@/Components/PageHandle';
import type { Medicine } from "@/Types/Medicine";
import { ROUTES } from '@/Types/Routes';

interface Activity {
  _id: string;
  type: 'favorite' | 'add_to_cart' | 'buy' | 'request_quote';
  medicine: Medicine;
  quantity?: number;
  createdAt: string;
}

export default function ProfilePage() {
  const { isAUTH, isLoading, user, userType, handleLogout } = useAppData();
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activityLoading, setActivityLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAUTH) {
      router.push('/');
    }
  }, [isAUTH, isLoading, router]);

  useEffect(() => {
    const fetchActivities = async () => {
      setActivityLoading(true);
      const userId = localStorage.getItem("USERID") || localStorage.getItem("COMPID");
      if (!userId) {
        setActivities([]);
        setActivityLoading(false);
        return;
      }
      const res = await fetch(`http://localhost:3500/api/user-activity/list/${userId}`);
      const data = await res.json();
      if (data.success) setActivities(data.activities);
      setActivityLoading(false);
    };
    fetchActivities();
  }, []);
  const gotToSelectUpdate = async () =>{
    router.push(ROUTES.SELECTUPDATE)
  }
  const grouped = activities.reduce((acc, act) => {
    acc[act.type] = acc[act.type] || [];
    acc[act.type].push(act);
    return acc;
  }, {} as Record<string, Activity[]>);

  // Calculate statistics
  const ordersPlaced = grouped['buy'] ? grouped['buy'].length : 0;
  const totalSpent = grouped['buy']
    ? grouped['buy'].reduce((sum, act) => sum + ((act.medicine?.price || 0) * (act.quantity || 1)), 0)
    : 0;
  const favoritesCount = grouped['favorite'] ? grouped['favorite'].length : 0;

  if (isLoading) {
    return (
      <main className="bg-gray-50 min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <LoadingPage />
        </div>
      </main>
    );
  }

  if (!isAUTH) {
    return null;
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  {userType === 'USER' ? (
                    <User className="text-white" size={32} />
                  ) : (
                    <Building className="text-white" size={32} />
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">
                    {user?.name || 'Profile'}
                  </h1>
                  <p className="text-gray-600 flex items-center gap-2">
                    {userType === 'USER' ? 'Personal Account' : 'Company Account'}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {userType}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <ButtonStyle3 onClick={gotToSelectUpdate} ButtonText="Edit Profile">
                  <Edit size={16} />
                </ButtonStyle3>
                <ButtonStyle4 ButtonText="Logout" onClick={handleLogout}>
                  <LogOut size={16} />
                </ButtonStyle4>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Shield size={20} className="text-blue-600" />
                Account Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="text-gray-500" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>
                
                {user?.phone && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="text-gray-500" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  </div>
                )}
                
                {user?.address && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="text-gray-500" size={20} />
                    <div>
                      <p className="text-sm text-gray-500">
                        {userType === 'USER' ? 'Address' : 'Business Address'}
                      </p>
                      <p className="font-medium">{user.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Account Statistics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Account Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{ordersPlaced}</div>
                  <div className="text-sm text-gray-600">Orders Placed</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">${totalSpent.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{favoritesCount}</div>
                  <div className="text-sm text-gray-600">Favorites</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">0</div>
                  <div className="text-sm text-gray-600">Reviews</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
            {activityLoading ? (
              <div>Loading...</div>
            ) : activities.length === 0 ? (
              <div className="text-gray-500">No recent activity.</div>
            ) : (
              <div className="grid gap-8">
                {['favorite', 'add_to_cart', 'buy', 'request_quote'].map((type) => (
                  <div key={type}>
                    <h3 className="text-lg font-semibold mb-2 capitalize">{type.replace('_', ' ')}s</h3>
                    {grouped[type]?.length ? (
                      <div className="grid gap-4">
                        {grouped[type].map((act) => (
                          <div key={act._id} className="bg-gray-50 rounded-lg p-4 flex items-center gap-6">
                            <div className="text-2xl text-blue-600">{act.medicine?.image}</div>
                            <div>
                              <div className="font-bold">{act.medicine?.name}</div>
                              <div className="text-gray-600 text-sm">{act.medicine?.category}</div>
                              {act.quantity && <div className="text-gray-500 text-xs">Quantity: {act.quantity}</div>}
                              <div className="text-gray-400 text-xs">{new Date(act.createdAt).toLocaleString()}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-gray-400">No {type.replace('_', ' ')}s yet.</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Account Actions */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Account Actions</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <ButtonStyle7 ButtonText="">
                <div className="font-medium text-gray-800">Change Password</div>
                <div className="text-sm text-gray-500">Update your account password</div>
              </ButtonStyle7>
              <ButtonStyle7 ButtonText="">
                <div className="font-medium text-gray-800">Notification Settings</div>
                <div className="text-sm text-gray-500">Manage your email preferences</div>
              </ButtonStyle7>
              <ButtonStyle7 ButtonText="">
                <div className="font-medium text-gray-800">Privacy Settings</div>
                <div className="text-sm text-gray-500">Control your data and privacy</div>
              </ButtonStyle7>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 