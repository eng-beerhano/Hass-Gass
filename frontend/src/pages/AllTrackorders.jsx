import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AllTrackorders = () => {
  const [trackOrders, setTrackOrders] = useState([]);
  const [editingTrackOrder, setEditingTrackOrder] = useState(null);
  const [deleteTrackOrderId, setDeleteTrackOrderId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    city: '',
    branch: '',
  });

  useEffect(() => {
    const fetchTrackOrders = async () => {
      try {
        const response = await axios.get('/api/trackorders');
        setTrackOrders(response.data);
      } catch (error) {
        console.error('Error fetching track orders:', error);
      }
    };

    fetchTrackOrders();
  }, []);

  const handleEdit = (trackOrder) => {
    setEditingTrackOrder(trackOrder._id);
    setFormData({
      name: trackOrder.name,
      address: trackOrder.address,
      phone: trackOrder.phone,
      city: trackOrder.city,
      branch: trackOrder.branch,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/trackorders/${id}`);
      setTrackOrders(trackOrders.filter((trackOrder) => trackOrder._id !== id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting track order:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/trackorders/${editingTrackOrder}`, formData);
      setTrackOrders(trackOrders.map((trackOrder) => (trackOrder._id === editingTrackOrder ? response.data.trackOrder : trackOrder)));
      setEditingTrackOrder(null);
      setFormData({
        name: '',
        address: '',
        phone: '',
        city: '',
        branch: '',
      });
    } catch (error) {
      console.error('Error updating track order:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Track Orders</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">City</th>
            <th className="py-2 px-4 border-b">Branch</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {trackOrders.map((trackOrder) => (
            <tr key={trackOrder._id}>
              <td className="py-2 px-4 border-b">{trackOrder.name}</td>
              <td className="py-2 px-4 border-b">{trackOrder.address}</td>
              <td className="py-2 px-4 border-b">{trackOrder.phone}</td>
              <td className="py-2 px-4 border-b">{trackOrder.city}</td>
              <td className="py-2 px-4 border-b">{trackOrder.branch}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleEdit(trackOrder)} className="mr-2 text-blue-500">
                  <FaEdit />
                </button>
                <button onClick={() => { setDeleteTrackOrderId(trackOrder._id); setShowDeleteModal(true); }} className="text-red-500">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingTrackOrder && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg mt-4">
          <h2 className="text-2xl font-bold mb-4">Edit Track Order</h2>
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
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Branch</label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Update Track Order
          </button>
        </form>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this track order?</h2>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                No
              </button>
              <button
                onClick={() => handleDelete(deleteTrackOrderId)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTrackorders;