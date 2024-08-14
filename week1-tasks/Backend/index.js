const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transaction');
const cors = require('cors');
const connection_DB = require('./db/index.db');
dotenv.config();
app.use(cors());  
app.use(express.json());
connection_DB();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://techplement-task-frontend.vercel.app'); // Set the exact origin
    res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE'); // Optional: Allow specific methods
    res.header('Access-Control-Allow-Headers', 'Content-Type'); // Optional: Allow specific headers
    next();
});
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
