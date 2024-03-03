const express = require('express');
const connectDB = require('./app/config/database');
const routes = require('./app/routes/routes');

const app = express();

// Load environment variables from .env file
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/', routes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});