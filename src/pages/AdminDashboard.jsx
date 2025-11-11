import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import axios from 'axios';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/dashboard/admin');
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
          <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg shadow-lg p-8 mb-6">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-red-100">
              Welcome, {user?.name}! You have full system control.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Total Users</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {dashboardData?.stats?.totalUsers || 0}
                  </p>
                </div>
                <div className="text-4xl">👤</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Total Managers</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {dashboardData?.stats?.totalManagers || 0}
                  </p>
                </div>
                <div className="text-4xl">👥</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Total Admins</p>
                  <p className="text-3xl font-bold text-gray-800">
                    {dashboardData?.stats?.totalAdmins || 0}
                  </p>
                </div>
                <div className="text-4xl">⚡</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">System Health</p>
                  <p className="text-lg font-bold text-green-600">
                    {dashboardData?.stats?.systemHealth || 'Good'}
                  </p>
                </div>
                <div className="text-4xl">✅</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🔧</span> Admin Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition">
                  <span className="font-semibold text-blue-700">Manage Users</span>
                  <p className="text-sm text-gray-600">Add, edit, or remove users</p>
                </button>
                <button className="w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition">
                  <span className="font-semibold text-purple-700">System Settings</span>
                  <p className="text-sm text-gray-600">Configure system preferences</p>
                </button>
                <button className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition">
                  <span className="font-semibold text-green-700">View Logs</span>
                  <p className="text-sm text-gray-600">Access system audit logs</p>
                </button>
                <button className="w-full text-left px-4 py-3 bg-red-50 hover:bg-red-100 rounded-lg transition">
                  <span className="font-semibold text-red-700">Security Settings</span>
                  <p className="text-sm text-gray-600">Manage security configurations</p>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">📊</span> Recent Admin Activities
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start pb-3 border-b">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  <div>
                    <p className="text-gray-700 font-semibold">User account created</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </li>
                <li className="flex items-start pb-3 border-b">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  <div>
                    <p className="text-gray-700 font-semibold">System backup completed</p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                </li>
                <li className="flex items-start pb-3 border-b">
                  <span className="text-yellow-500 mr-2 mt-1">•</span>
                  <div>
                    <p className="text-gray-700 font-semibold">Security patch applied</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2 mt-1">•</span>
                  <div>
                    <p className="text-gray-700 font-semibold">Database optimized</p>
                    <p className="text-xs text-gray-500">2 days ago</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Admin Information
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center border-b pb-3">
                <span className="text-gray-600 font-semibold w-24">Name:</span>
                <span className="text-gray-800">{user?.name}</span>
              </div>
              <div className="flex items-center border-b pb-3">
                <span className="text-gray-600 font-semibold w-24">Email:</span>
                <span className="text-gray-800">{user?.email}</span>
              </div>
              <div className="flex items-center border-b pb-3">
                <span className="text-gray-600 font-semibold w-24">Role:</span>
                <span className="capitalize bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {user?.role}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-400 text-2xl">⚠️</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  <span className="font-semibold">Admin Access Level:</span> You have complete access to all system features, user management, and configurations. Use this power responsibly.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <Link
              to="/dashboard/user"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              View User Dashboard
            </Link>
            <Link
              to="/dashboard/manager"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              View Manager Dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
