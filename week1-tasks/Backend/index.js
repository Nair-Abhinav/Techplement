const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transaction');
const cors = require('cors');
const connection_DB = require('./db/index.db');
dotenv.config();
const app = express();
app.use(express.json());
connection_DB();
const corsOptions = {
  origin: 'https://techplement-2tr6.vercel.app',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));  
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
