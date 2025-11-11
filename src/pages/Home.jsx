import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDashboardNavigation = () => {
    if (user) {
      navigate(`/dashboard/${user.role}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            JWT Authentication System
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Role-Based Access Control with MERN Stack
          </p>
          <div className="bg-white text-gray-800 rounded-lg p-8 mb-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <ul className="space-y-3 text-left">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Secure JWT token-based authentication</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Three role levels: User, Manager, and Admin</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Protected routes with role-based authorization</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Responsive design with Tailwind CSS</span>
              </li>
            </ul>
          </div>
          {user ? (
            <div className="space-y-4">
              <button
                onClick={handleDashboardNavigation}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
              >
                Go to My Dashboard
              </button>
              <p className="text-lg">
                Logged in as: <span className="font-bold capitalize">{user.role}</span>
              </p>
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="inline-block bg-green-500 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition shadow-lg"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
