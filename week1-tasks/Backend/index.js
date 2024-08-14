const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transaction');
const cors = require('cors');
const connection_DB = require('./db/index.db');
dotenv.config();
app.use(cors());  
// {
//   origin: ['https://techplement-task-frontend.vercel.app'],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }
app.use(express.json());
connection_DB();

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
