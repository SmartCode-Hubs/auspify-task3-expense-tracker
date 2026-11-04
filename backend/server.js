const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Windows DNS Fix

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

// Add near your other route imports
const userRoutes = require('./routes/userRoutes');

// Add near your other app.use routes
app.use('/api/users', userRoutes);

// Health Check
app.get('/', (req, res) => res.status(200).json({ message: 'Expense API running' }));

// Start Server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('[Database] MongoDB Connected Successfully');
    app.listen(PORT, () => console.log(`[Server] Running on port ${PORT}`));
  } catch (err) {
    console.error('[Database] Connection Error:', err.message);
    process.exit(1);
  }
};

startServer();