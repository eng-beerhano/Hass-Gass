import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    city: '',
    branch: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/getPackages');
        setProducts(response.data.packages);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchBranches = async () => {
      try {
        const response = await axios.get('/api/getBranches');
        setBranches(response.data.branches);
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    };

    fetchProducts();
    fetchBranches();
  }, []);

  const handlePayNow = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setFormData({
      name: '',
      address: '',
      phone: '',
      city: '',
      branch: '',
    });
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
      const response = await axios.post('/api/trackorders', formData);
      alert(response.data.message);
      handleCloseModal();
    } catch (error) {
      console.error('Error creating track order:', error);
      alert('Error creating track order. Please try again.');
    }
  };

  return (
    <div>
      {/* <Header /> */}
      <div className="py-10 px-5 bg-white">
        <h2 className="text-center text-3xl font-bold mb-8">Why you should choose our products?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="border border-yellow-300 p-5 rounded-lg shadow-lg bg-white">
              <h3 className="text-xl font-bold mb-2">Reason {index + 1}</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            </div>
          ))}
        </div>
        <h2 className="text-center text-3xl font-bold mb-8">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border border-yellow-300 p-5 rounded-lg shadow-lg bg-white"
            >
              <img
                src={`http://localhost:3001/Uploads/${product.image}`}
                alt={product.name}
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">{product.price}</span>
                <button
                  onClick={() => handlePayNow(product)}
                  className="bg-yellow-400 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-500"
                >
                  Pay NOW
                </button>
              </div>
            </div>
          ))}
        </div>

        {showModal && selectedProduct && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">Track Order</h2>
              <form onSubmit={handleSubmit}>
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
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;