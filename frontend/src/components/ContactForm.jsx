import React, { useState } from "react";
import axios from "axios";

const ContactForm = () => {
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
  );
};

export default ContactForm;