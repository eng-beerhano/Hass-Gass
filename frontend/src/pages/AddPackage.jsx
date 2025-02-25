import React, { useState } from 'react';
import axios from 'axios';

const AddPackage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    kg: '',
    type: '',
  });
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);

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
    data.append('image', image);
    images.forEach((img, index) => {
      data.append('images', img);
    });

    try {
      const response = await axios.post('/api/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error registering package:', error);
      alert('Error registering package. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Add Package</h2>
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
          <label className="block text-gray-700">KG</label>
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
            required
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
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Add Package
        </button>
      </form>
    </div>
  );
};

export default AddPackage;