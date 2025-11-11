import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import axios from 'axios';

const ManagerDashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/dashboard/manager');
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
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-lg p-8 mb-6">
            <h1 className="text-3xl font-bold mb-2">Manager Dashboard</h1>
            <p className="text-purple-100">Welcome, {user?.name}! Manage your team efficiently.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Team Members</p>
                  <p className="text-3xl font-bold text-gray-800">{dashboardData?.stats?.teamMembers || 0}</p>
                </div>
                <div className="text-4xl">👥</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Active Projects</p>
                  <p className="text-3xl font-bold text-gray-800">{dashboardData?.stats?.projects || 0}</p>
                </div>
                <div className="text-4xl">📊</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">Pending Approvals</p>
                  <p className="text-3xl font-bold text-gray-800">{dashboardData?.stats?.pendingApprovals || 0}</p>
                </div>
                <div className="text-4xl">⏳</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">📝</span> Recent Activities
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-gray-700">Approved project proposal from Team A</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700">Reviewed performance reports</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  <span className="text-gray-700">Scheduled team meeting for next week</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span>
                  <span className="text-gray-700">Assigned new tasks to team members</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">👤</span> Manager Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center border-b pb-2">
                  <span className="text-gray-600 font-semibold w-24">Name:</span>
                  <span className="text-gray-800">{user?.name}</span>
                </div>
                <div className="flex items-center border-b pb-2">
                  <span className="text-gray-600 font-semibold w-24">Email:</span>
                  <span className="text-gray-800">{user?.email}</span>
                </div>
                <div className="flex items-center border-b pb-2">
                  <span className="text-gray-600 font-semibold w-24">Role:</span>
                  <span className="capitalize bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {user?.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-blue-400 text-2xl">ℹ️</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <span className="font-semibold">Manager Access Level:</span> You can manage team members, approve requests, and oversee projects.
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

export default ManagerDashboard;
