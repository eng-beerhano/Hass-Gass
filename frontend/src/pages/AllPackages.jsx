import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AllPackages = () => {
  const [packages, setPackages] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null);
  const [deletePackageId, setDeletePackageId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    kg: '',
    type: '',
  });
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('/api/getPackages');
        setPackages(response.data.packages);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  const handleEdit = (pkg) => {
    setEditingPackage(pkg._id);
    setFormData({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      kg: pkg.kg,
      type: pkg.type,
    });
    setImage(null);
    setImages([]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/deletePackage/${id}`);
      setPackages(packages.filter((pkg) => pkg._id !== id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting package:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImagesChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('kg', formData.kg);
    data.append('type', formData.type);
    if (image) {
      data.append('image', image);
    }
    images.forEach((img, index) => {
      data.append('images', img);
    });

    try {
      const response = await axios.put(`/api/updatePackage/${editingPackage}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPackages(packages.map((pkg) => (pkg._id === editingPackage ? response.data.package : pkg)));
      setEditingPackage(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        kg: '',
        type: '',
      });
      setImage(null);
      setImages([]);
    } catch (error) {
      console.error('Error updating package:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Packages</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Weight</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg._id}>
              <td className="py-2 px-4 border-b">{pkg.name}</td>
              <td className="py-2 px-4 border-b">{pkg.description}</td>
              <td className="py-2 px-4 border-b">${pkg.price}</td>
              <td className="py-2 px-4 border-b">{pkg.kg} kg</td>
              <td className="py-2 px-4 border-b">{pkg.type}</td>
              <td className="py-2 px-4 border-b">
                <button onClick={() => handleEdit(pkg)} className="mr-2 text-blue-500">
                  <FaEdit />
                </button>
                <button onClick={() => { setDeletePackageId(pkg._id); setShowDeleteModal(true); }} className="text-red-500">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingPackage && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg mt-4">
          <h2 className="text-2xl font-bold mb-4">Edit Package</h2>
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
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Weight</label>
            <input
              type="text"
              name="kg"
              value={formData.kg}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Additional Images</label>
            <input
              type="file"
              name="images"
              onChange={handleImagesChange}
              className="w-full px-3 py-2 border rounded"
              multiple
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Update Package
          </button>
        </form>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Are you sure you want to delete this package?</h2>
            <div className="flex justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                No
              </button>
              <button
                onClick={() => handleDelete(deletePackageId)}
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

export default AllPackages;