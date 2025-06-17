// MongoDB Schemas for ComfortNest Project
// This file contains the schemas for all collections used in the frontend

// User Schema
const userSchema = {
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String, default: '' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  profilePic: String,  // Base64 or URL to profile picture
  profilePicture: String, // Alternative field name for compatibility
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  faceFeatures: Object, // For face recognition
  lastLogin: Date,
  // Add any other fields used in the frontend
};

// Property Schema
const propertySchema = {
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  propertyType: { type: String, required: true }, // e.g., 'Apartment', 'House', 'Villa'
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  size: { type: Number, required: true }, // in square feet/meters
  images: [String], // Array of image URLs or base64 strings
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: 'Pakistan' }
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  // Add any other fields used in the frontend
};

// API Routes needed based on frontend code:

// User Routes
// POST /api/users/register - Register a new user
// POST /api/users/login - Login a user
// GET /api/users - Get all users (admin only)
// GET /api/users/:id - Get a specific user
// PUT /api/users/:id - Update a user
// DELETE /api/users/:id - Delete a user
// POST /api/users/check-face-duplicate - Check for duplicate face
// POST /api/users/:id/profile-image - Upload profile image
// POST /api/users/profile-image - Alternative endpoint for profile image upload
// POST /api/users/face-login - Login with face recognition
// POST /api/users/reset-password - Reset password

// Property Routes
// GET /api/properties - Get all properties
// GET /api/properties/:id - Get a specific property
// POST /api/properties - Create a new property
// PUT /api/properties/:id - Update a property
// DELETE /api/properties/:id - Delete a property
// POST /api/properties/:id/images - Upload property images

// Example MongoDB connection and model setup:
/*
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comfortnest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Create User model
const User = mongoose.model('User', new mongoose.Schema(userSchema));

// Create Property model
const Property = mongoose.model('Property', new mongoose.Schema(propertySchema));

module.exports = { User, Property };
*/
