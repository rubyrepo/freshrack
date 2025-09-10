import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h6 className="text-white font-semibold mb-4">Services</h6>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-green-500 transition-colors">Branding</Link></li>
              <li><Link to="/" className="hover:text-green-500 transition-colors">Design</Link></li>
              <li><Link to="/" className="hover:text-green-500 transition-colors">Marketing</Link></li>
              <li><Link to="/" className="hover:text-green-500 transition-colors">Advertisement</Link></li>
            </ul>
          </div>

          <div>
            <h6 className="text-white font-semibold mb-4">Company</h6>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-green-500 transition-colors">About us</Link></li>
              <li><Link to="/" className="hover:text-green-500 transition-colors">Contact</Link></li>
              <li><Link to="/" className="hover:text-green-500 transition-colors">Jobs</Link></li>
              <li><Link to="/" className="hover:text-green-500 transition-colors">Press kit</Link></li>
            </ul>
          </div>

          <div>
            <h6 className="text-white font-semibold mb-4">Legal</h6>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-green-500 transition-colors">Terms of use</Link></li>
              <li><Link to="/" className="hover:text-green-500 transition-colors">Privacy policy</Link></li>
              <li><Link to="/" className="hover:text-green-500 transition-colors">Cookie policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between">
          <Link to="/" className="flex items-center gap-2 mb-4 md:mb-0">
            <img src="/src/assets/icons8-leaf-48.png" alt="logo" className="h-8 w-8" />
            <span className="text-white font-semibold text-lg">FreshRack</span>
          </Link>

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} FreshRack. All rights reserved.
          </p>

          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-green-500 transition-colors">Twitter</a>
            <a href="#" className="hover:text-green-500 transition-colors">Facebook</a>
            <a href="#" className="hover:text-green-500 transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
