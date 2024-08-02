import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await axios.get('/api/transactions/account', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error('Failed to fetch account:', error);
        setError('Failed to fetch account balance.');
      }
    };
    fetchAccount();
  }, []);

  const handleDeposit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/transactions/deposit', {amount} , {
        headers: { Authorization: `${localStorage.getItem('token')}` }
      });
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Deposit failed:', error);
      setError('Deposit failed.');
    }
  };

  const handleWithdraw = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/transactions/withdraw', { amount }, {
        headers: { Authorization: `${localStorage.getItem('token')}` }
      });
      setBalance(response.data.balance);
    } catch (error) {
      console.error('Withdrawal failed:', error);
      setError('Withdrawal failed.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Account Balance: ${balance}</h1>
      {error && <p className="text-red-600">{error}</p>}
      <div className="mt-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="border px-3 py-2 rounded-lg"
        />
        <button onClick={handleDeposit} className="ml-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">Deposit</button>
        <button onClick={handleWithdraw} className="ml-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700">Withdraw</button>
      </div>
    </div>
  );
};

export default Dashboard;
