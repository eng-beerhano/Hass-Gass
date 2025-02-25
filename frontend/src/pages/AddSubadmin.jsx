import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSubadmin = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    branch: '',
  });
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get('/api/getBranches');
        setBranches(response.data.branches);
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchBranches();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/registerSubAdmin', formData);
      alert(response.data.message);
      setFormData({
        name: '',
        email: '',
        password: '',
        branch: '',
      });
    } catch (error) {
      console.error('Error registering sub-admin:', error);
      alert('Error registering sub-admin. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Add Subadmin</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Branch</label>
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="">Select Branch</option>
            {branches.map((branch) => (
              <option key={branch._id} value={branch.name}>
                {branch.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Add Subadmin
        </button>
      </form>
    </div>
  );
};

export default AddSubadmin;