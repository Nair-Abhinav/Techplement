const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transaction');
const cors = require('cors');
const connection_DB = require('./db/index.db');
dotenv.config();
app.use(express.json());
app.use(cors());  
connection_DB();
app.use((req, res, next) => {
  const allowedOrigins = [
    'https://techplement-task-frontend.vercel.app',
    'https://techplement-eta.vercel.app',
    'https://techplement-backend-eight.vercel.app'
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
