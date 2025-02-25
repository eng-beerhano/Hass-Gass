import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTruck, FaSignOutAlt } from 'react-icons/fa';

const SubAdminDash = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/users/logout');
      alert(response.data.message);
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Error logging out. Please try again.');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-6">Sub-Admin Dashboard</h1>
        <ul className="space-y-4">
          <li>
            <Link to="/branchTrack" className="flex items-center hover:text-yellow-500">
              <FaTruck className="mr-2" /> Branch Truck
            </Link>
          </li>
        </ul>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
      {/* Main Content */}
      <div className="w-3/4 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default SubAdminDash;