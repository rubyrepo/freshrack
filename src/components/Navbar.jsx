import React from 'react';
import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  // Dummy login function for testing
  const handleDummyLogin = () => {
    const { login } = useAuth();
    login({ username: 'JohnDoe', email: 'john@example.com' });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/fridge">Fridge</Link></li>
            {user ? (
              <>
                <li><Link to="/add-food">Add Food</Link></li>
                <li><Link to="/my-items">My Items</Link></li>
              </>
            ) : null}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">FreshRack</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/fridge">Fridge</Link></li>
          {user ? (
            <>
              <li><Link to="/add-food">Add Food</Link></li>
              <li><Link to="/my-items">My Items</Link></li>
            </>
          ) : null}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {user ? (
          <>
            <div className="tooltip tooltip-bottom" data-tip={user.username}>
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content rounded-full w-8">
                  <span className="text-xl">{user.username[0]}</span>
                </div>
              </div>
            </div>
            <button onClick={logout} className="btn btn-ghost">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-ghost">Login</Link>
            <Link to="/register" className="btn btn-primary">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;