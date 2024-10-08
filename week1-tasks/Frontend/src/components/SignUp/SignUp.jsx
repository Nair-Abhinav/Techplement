import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { url } from '../../lib/environment';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [balance , setBalance] = useState(0);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      alert("Entered try block");
      alert('Signup Started');
      const response = await axios.post('https://techplement-backend-eight.vercel.app/api/auth/register', {email , password , balance} );
      alert('Signup Successful');
      navigate('/login');
    } catch (error) {
      alert('Signup failed:', error.response?.data || error.message); 
    }
  };


  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="balance" className="block text-sm font-bold mb-2">Balance</label>
          <input
            type="number"
            id="balance"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-700"
          />
        </div>
        <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignUp;
