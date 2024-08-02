const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transaction');
const cors = require('cors');
const connection_DB = require('./db/index.db');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());  
connection_DB();
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
