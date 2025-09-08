import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import { AuthProvider } from '../context/AuthContext';
import Footer from '../components/Footer';

const Root = () => {
  return (
    <AuthProvider>
      <div>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default Root;