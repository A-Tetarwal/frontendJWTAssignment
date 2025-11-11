import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

const UserDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/dashboard/user`);
        setDashboardData(response.data.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-xl">Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              User Dashboard
            </h1>
            <p className="text-gray-600">Welcome, {user?.name}!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-500 text-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">My Tasks</p>
                  <p className="text-4xl font-bold">{dashboardData?.stats?.tasks || 0}</p>
                </div>
                <div className="text-5xl opacity-50">📋</div>
              </div>
            </div>

            <div className="bg-green-500 text-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Notifications</p>
                  <p className="text-4xl font-bold">{dashboardData?.stats?.notifications || 0}</p>
                </div>
                <div className="text-5xl opacity-50">🔔</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your Information
            </h2>
            <div className="space-y-3">
              <div className="flex items-center border-b pb-3">
                <span className="text-gray-600 font-semibold w-32">Name:</span>
                <span className="text-gray-800">{user?.name}</span>
              </div>
              <div className="flex items-center border-b pb-3">
                <span className="text-gray-600 font-semibold w-32">Email:</span>
                <span className="text-gray-800">{user?.email}</span>
              </div>
              <div className="flex items-center border-b pb-3">
                <span className="text-gray-600 font-semibold w-32">Role:</span>
                <span className="capitalize bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-yellow-400 text-2xl">ℹ️</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <span className="font-semibold">User Access Level:</span> You have basic access to view your profile and tasks.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            {(user?.role === 'manager' || user?.role === 'admin') && (
              <Link
                to="/dashboard/manager"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
              >
                Go to Manager Dashboard
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link
                to="/dashboard/admin"
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
              >
                Go to Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
