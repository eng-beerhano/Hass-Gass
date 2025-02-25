import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Allbranches = () => {
  const [branches, setBranches] = useState([]);
  const [editingBranch, setEditingBranch] = useState(null);
  const [deleteBranchId, setDeleteBranchId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
  });

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

  const handleEdit = (branch) => {
    setEditingBranch(branch._id);
    setFormData({
      name: branch.name,
      address: branch.address,
      phone: branch.phone,
      email: branch.email,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/deleteBranch/${id}`);
      setBranches(branches.filter((branch) => branch._id !== id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting branch:', error);
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
      const response = await axios.put(`/api/updateBranch/${editingBranch}`, formData);
      setBranches(branches.map((branch) => (branch._id === editingBranch ? response.data.branch : branch)));
      setEditingBranch(null);
      setFormData({
        name: '',
        address: '',
        phone: '',
        email: '',
      });
    } catch (error) {
      console.error('Error updating branch:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Branches</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {branches.map((branch) => (
            <tr key={branch._id}>
              <td className="py-2 px-4 border-b">{branch.name}</td>
              <td className="py-2 px-4 border-b">{branch.address}</td>
              <td className="py-2 px-4 border-b">{branch.phone}</td>
              <td className="py-2 px-4 border-b">{branch.email}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleEdit(branch)} className="mr-2 text-blue-500">
                  <FaEdit />
                </button>
                <button onClick={() => { setDeleteBranchId(branch._id); setShowDeleteModal(true); }} className="text-red-500">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingBranch && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg mt-4">
          <h2 className="text-2xl font-bold mb-4">Edit Branch</h2>
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
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Update Branch
          </button>
        </form>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this branch?</h2>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                No
              </button>
              <button
                onClick={() => handleDelete(deleteBranchId)}
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

export default Allbranches;