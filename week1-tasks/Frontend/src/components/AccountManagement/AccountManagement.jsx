import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AccountManagement = () => {
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('/api/auth/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        setError('Failed to fetch user details.');
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Account Management</h1>
      {error && <p className="text-red-600">{error}</p>}
      <div className="mt-4">
        <p><strong>Name:</strong> {userDetails.name}</p>
        <p><strong>Email:</strong> {userDetails.email}</p>
        {/* Add more fields as needed */}
      </div>
    </div>
  );
};

export default AccountManagement;
