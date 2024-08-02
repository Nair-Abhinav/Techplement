import React from 'react';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-2xl text-center">
        <h1 className="text-4xl mb-6">Welcome to Our Website</h1>
        <p className="text-lg mb-6">Please sign up or log in to continue.</p>
        <div className="flex justify-center gap-4">
          <Link
            to="/signup"
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
