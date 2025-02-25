import { FaPhone, FaEnvelope, FaFacebookF, FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/Hass-Logo.jpeg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      {/* Top bar */}
      <div className="bg-orange-500 text-white flex justify-between items-center px-6 py-2 text-sm md:flex hidden">
        <div className="flex items-center space-x-4">
          <FaPhone />
          <span>+252-61 7001189</span>
          <FaEnvelope />
          <span>websupport@hass.com</span>
          <FaFacebookF />
          <span>Facebook</span>
          <FaWhatsapp />
          <span>WhatsApp</span>
        </div>
        <div>Mogadishu, Somalia</div>
      </div>

      {/* Navigation Bar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <img src={Logo} alt="Hass Gas Logo" className="h-12" />
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
        <ul className={`flex-col md:flex-row md:flex space-x-6 text-gray-700 font-medium ${menuOpen ? 'flex' : 'hidden'}`}>
          <li className="cursor-pointer hover:text-yellow-500 font-bold">
            <Link to="/Home">Home</Link>
          </li>
          <li className="cursor-pointer hover:text-yellow-500 font-bold">
            <Link to="/about">About Us</Link>
          </li>
          <li className="cursor-pointer hover:text-yellow-500 font-bold">
            <Link to="/products">Products</Link>
          </li>
          <li className="cursor-pointer hover:text-yellow-500 font-bold">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="cursor-pointer hover:text-yellow-500 font-bold bg-blue-950 rounded-md px-4 py-1 text-white">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;