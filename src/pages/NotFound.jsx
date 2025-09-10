import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-green-500">404</h1>
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-2">Oops! Page Not Found</h2>
          <p className="text-gray-600 mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="btn bg-green-500 text-white hover:bg-green-600"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;