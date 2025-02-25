import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', formData);
      alert(response.data.message);
      localStorage.setItem('token', response.data.token);

      // Navigate based on user role
      if (response.data.role === 'admin') {
        navigate('/admin');
      } else if (response.data.role === 'subadmin') {
        navigate('/subadmin');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
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
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;