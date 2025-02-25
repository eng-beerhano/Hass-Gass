import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaList, FaBuilding, FaUserPlus, FaUsers, FaInbox, FaChartBar, FaSignOutAlt, FaListAlt } from 'react-icons/fa';

const AdminDash = () => {
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
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <ul className="space-y-4">
          <li>
            <Link to="/addpackage" className="flex items-center hover:text-yellow-500">
              <FaPlus className="mr-2" /> Add Package
            </Link>
          </li>
          <li>
            <Link to="/allpackages" className="flex items-center hover:text-yellow-500">
              <FaList className="mr-2" /> All Packages
            </Link>
          </li>
          <li>
            <Link to="/addbranch" className="flex items-center hover:text-yellow-500">
              <FaBuilding className="mr-2" /> Add Branch
            </Link>
          </li>
          <li>
            <Link to="/allbranches" className="flex items-center hover:text-yellow-500">
              <FaList className="mr-2" /> All Branches
            </Link>
          </li>
          <li>
            <Link to="/addsubadmin" className="flex items-center hover:text-yellow-500">
              <FaUserPlus className="mr-2" /> Add Subadmin
            </Link>
          </li>
          <li>
            <Link to="/allsubadmins" className="flex items-center hover:text-yellow-500">
              <FaUsers className="mr-2" /> All Subadmins
            </Link>
          </li>
          <li>
            <Link to="/Alltruckorders" className="flex items-center hover:text-yellow-500">
              <FaListAlt className="mr-2" /> All Trackorders
            </Link>
          </li>
          <li>
            <Link to="/inbox" className="flex items-center hover:text-yellow-500">
              <FaInbox className="mr-2" /> Inbox
            </Link>
          </li>
          <li>
            <Link to="/reports" className="flex items-center hover:text-yellow-500">
              <FaChartBar className="mr-2" /> Reports
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

export default AdminDash;