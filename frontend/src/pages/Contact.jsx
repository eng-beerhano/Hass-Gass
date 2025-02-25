import React, { useState } from "react";
import axios from "axios";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/contact', formData);
      alert(response.data.message);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending contact message:', error);
      alert('Failed to send contact message. Please try again.');
    }
  };

  return (
    <div>
      <div className="bg-gray-200 p-6 text-center mt-9">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-lg mt-2">Feel free to reach out to us for any inquiries or collaborations.</p>
      </div>
      {/* Reasons to choose our products */}
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
      </div>
      {/* Contact Form */}
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Your First Name"
                className="w-full p-2 border border-yellow-400 rounded"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Your Last Name"
                className="w-full p-2 border border-yellow-400 rounded"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-2 border border-yellow-400 rounded"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full p-2 border border-yellow-400 rounded"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone Number"
                className="w-full p-2 border border-yellow-400 rounded"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message here ..."
                className="w-full p-2 border border-yellow-400 rounded h-20"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white p-2 rounded hover:bg-blue-800"
            >
              Send
            </button>
          </form>
        </div>
      </div>
      {/* Contact Information */}
      <div className="w-full md:w-1/2 p-4 flex flex-col space-y-4">
        <div className="flex items-center p-4 bg-white border border-gray-300 rounded shadow-md">
          <FaPhone className="text-2xl text-blue-500 mr-4" />
          <p className="text-gray-700">+252 617 22 44 88</p>
        </div>
        <div className="flex items-center p-4 bg-white border border-gray-300 rounded shadow-md">
          <FaEnvelope className="text-2xl text-blue-500 mr-4" />
          <p className="text-gray-700">info@HassGass.com</p>
        </div>
        <div className="flex items-center p-4 bg-white border border-gray-300 rounded shadow-md">
          <FaMapMarkerAlt className="text-2xl text-blue-500 mr-4" />
          <p className="text-gray-700"> Mogadisho, Somalia</p>
        </div>
        <div className="flex items-center p-4 bg-white border border-gray-300 rounded shadow-md">
          <FaTwitter className="text-2xl text-blue-500 mr-4" />
          <FaFacebook className="text-2xl text-blue-500 mr-4" />
          <FaInstagram className="text-2xl text-blue-500 mr-4" />
          <p className="text-gray-700">Follow us on social media</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;