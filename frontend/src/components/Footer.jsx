import React from "react";
import Logo from "../assets/Hass-Logo.jpeg";
const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-900 to-blue-600 text-white py-10 px-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <img src={Logo} alt="Company Logo" className="w-24 mb-4" />
          <p className="text-sm mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lectus elit,
            malesuada a velit eget, viverra volutpat nisl.
          </p>
          <div className="flex space-x-3">
            <a href="#" className="text-white text-lg"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-white text-lg"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-white text-lg"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" className="text-white text-lg"><i className="fab fa-instagram"></i></a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Pages</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Home & Work</a></li>
            <li><a href="#" className="hover:underline">Pricing</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Demo</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Service</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Shopify</a></li>
            <li><a href="#" className="hover:underline">WordPress</a></li>
            <li><a href="#" className="hover:underline">UI/UX Design</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3">Contact</h3>
          <p className="text-sm flex items-center space-x-2">
            <i className="fas fa-phone"></i>
            <span>(406) 555-0120</span>
          </p>
          <p className="text-sm flex items-center space-x-2 mt-2">
            <i className="fas fa-envelope"></i>
            <span>manager@sitecompany.com</span>
          </p>
          <p className="text-sm flex items-center space-x-2 mt-2">
            <i className="fas fa-map-marker-alt"></i>
            <span>2072 Westhexam Rd, Santa Ana, Illinois 85660</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
