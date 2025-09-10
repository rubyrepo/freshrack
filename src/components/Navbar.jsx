import React, { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const UserProfile = () => (
    <div className="flex items-center gap-4">
      <div className="relative group">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.username}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-green-600 text-white font-semibold">
            {user?.username?.[0]?.toUpperCase()}
          </div>
        )}

        <div className="absolute hidden group-hover:block -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap">
          {user?.username}
        </div>
      </div>
      <button
        onClick={logout}
        className="text-gray-600 hover:text-red-500 transition-colors"
      >
        Logout
      </button>
    </div>
  );

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/fridge", label: "Fridge" },
    ...(user
      ? [
          { to: "/add-food", label: "Add Food" },
          { to: "/my-items", label: "My Items" },
        ]
      : []),
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <img src="/src/assets/icons8-leaf-48.png" alt="logo" className="h-8 w-8" />
            <span className="text-gray-800">FreshRack</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <UserProfile />
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-green-600 transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-white shadow-sm">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="block text-gray-600 hover:text-green-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-4 pt-2 border-t border-gray-200">
              <UserProfile />
            </div>
          ) : (
            <div className="flex gap-4 pt-2 border-t border-gray-200">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-green-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
