import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AllSubAdmins = () => {
  const [subAdmins, setSubAdmins] = useState([]);
  const [editingSubAdmin, setEditingSubAdmin] = useState(null);
  const [deleteSubAdminId, setDeleteSubAdminId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    branch: '',
  });

  useEffect(() => {
    const fetchSubAdmins = async () => {
      try {
        const response = await axios.get('/api/getSubAdmin');
        setSubAdmins(response.data.subAdmins);
      } catch (error) {
        console.error('Error fetching sub-admins:', error);
      }
    };

    fetchSubAdmins();
  }, []);

  const handleEdit = (subAdmin) => {
    setEditingSubAdmin(subAdmin._id);
    setFormData({
      name: subAdmin.name,
      email: subAdmin.email,
      branch: subAdmin.branch,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/deleteSubAdmin/${id}`);
      setSubAdmins(subAdmins.filter((subAdmin) => subAdmin._id !== id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting sub-admin:', error);
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
      const response = await axios.put(`/api/updateSubAdmin/${editingSubAdmin}`, formData);
      setSubAdmins(subAdmins.map((subAdmin) => (subAdmin._id === editingSubAdmin ? response.data.subAdmin : subAdmin)));
      setEditingSubAdmin(null);
      setFormData({
        name: '',
        email: '',
        branch: '',
      });
    } catch (error) {
      console.error('Error updating sub-admin:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Sub-Admins</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Branch</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subAdmins.map((subAdmin) => (
            <tr key={subAdmin._id}>
              <td className="py-2 px-4 border-b">{subAdmin.name}</td>
              <td className="py-2 px-4 border-b">{subAdmin.email}</td>
              <td className="py-2 px-4 border-b">{subAdmin.branch}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleEdit(subAdmin)} className="mr-2 text-blue-500">
                  <FaEdit />
                </button>
                <button onClick={() => { setDeleteSubAdminId(subAdmin._id); setShowDeleteModal(true); }} className="text-red-500">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingSubAdmin && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg mt-4">
          <h2 className="text-2xl font-bold mb-4">Edit Sub-Admin</h2>
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
            Update Sub-Admin
          </button>
        </form>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this sub-admin?</h2>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                No
              </button>
              <button
                onClick={() => handleDelete(deleteSubAdminId)}
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

export default AllSubAdmins;