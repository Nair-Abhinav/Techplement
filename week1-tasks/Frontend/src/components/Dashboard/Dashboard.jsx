import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { url } from '../../lib/environment';


const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('');

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

  const handleTransaction = async () => {
    try {
      const url = transactionType === 'deposit'
        ? `/api/transactions/deposit`
        : `/api/transactions/withdraw`;

      const response = await axios.post(url, { amount }, {
        headers: { Authorization: `${localStorage.getItem('token')}` }
      });
      setBalance(response.data.balance);
      setIsModalOpen(false);
      setAmount('');
    } catch (error) {
      console.error(`${transactionType} failed:`, error);
      setError(`${transactionType} failed.`);
    }
  };

  return (
    <div className="p-40">
      <h1 className="text-xl font-bold text-center">Account Balance: ${balance}</h1>
      {error && <p className="text-red-600">{error}</p>}
      <div className="mt-4 flex justify-center">
        <button 
          onClick={() => { setTransactionType('deposit'); setIsModalOpen(true); }}
          className="ml-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Deposit
        </button>
        <button 
          onClick={() => { setTransactionType('withdraw'); setIsModalOpen(true); }}
          className="ml-2 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
        >
          Withdraw
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">{transactionType === 'deposit' ? 'Deposit' : 'Withdraw'} Amount</h2>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="border px-3 py-2 rounded-lg w-full mb-4"
            />
            <div className="flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 mr-2"
              >
                Cancel
              </button>
              <button 
                onClick={handleTransaction}
                className={`bg-${transactionType === 'deposit' ? 'green' : 'red'}-600 text-white py-2 px-4 rounded-lg hover:bg-${transactionType === 'deposit' ? 'green' : 'red'}-700`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
