// Load environment variables at the very top
const path = require('path');
const dotenv = require("dotenv");

// Load environment variables from .env file
const result = dotenv.config({ path: path.join(__dirname, '.env') });
if (result.error) {
  console.error("Error loading .env file:", result.error);
}

console.log("Environment variables:", {
  PORT: process.env.PORT || '(not set)',
  MONGO_URI: process.env.MONGO_URI ? '(set)' : '(not set)',
  JWT_SECRET: process.env.JWT_SECRET ? '(set)' : '(not set)',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '(not set)'
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

// Import routes
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));  // Increased limit for image uploads
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('dev'));

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, './')));

// Serve the face-api.js models with correct content type
app.use('/public/models', express.static(path.join(__dirname, 'public', 'models'), {
    setHeaders: (res, path) => {
        if (path.endsWith('.json')) {
            res.setHeader('Content-Type', 'application/json');
        } else {
            res.setHeader('Content-Type', 'application/octet-stream');
        }
    }
}));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);

// Route for serving frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/property-rental-db')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is busy, trying port ${port + 1}`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
};

startServer(PORT); 