# Software Design Specification (SDS)
## ComfortNest - Real Estate Property Website

**Document Version:** 1.0  
**Date:** January 2025  
**Project:** ComfortNest Real Estate Platform  
**Contact:** comfortnestproject@gmail.com

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [System Architecture](#2-system-architecture)
3. [Database Design](#3-database-design)
4. [API Design](#4-api-design)
5. [Frontend Design](#5-frontend-design)
6. [Security Design](#6-security-design)
7. [File Management Design](#7-file-management-design)
8. [Error Handling Design](#8-error-handling-design)
9. [Performance Design](#9-performance-design)
10. [Deployment Design](#10-deployment-design)

---

## 1. Introduction

### 1.1 Purpose
This Software Design Specification (SDS) document provides detailed technical design for the ComfortNest Real Estate Property Website. It describes the system architecture, database design, API specifications, and implementation details based on the requirements defined in the SRS document.

### 1.2 Scope
This document covers the technical design aspects including:
- System architecture and component design
- Database schema and data modeling
- RESTful API design and endpoints
- Frontend architecture and user interface design
- Security implementation and authentication flow
- File management and image handling
- Error handling and logging mechanisms
- Performance optimization strategies

### 1.3 Design Principles
- **Modularity**: Separation of concerns with clear module boundaries
- **Scalability**: Design supports horizontal and vertical scaling
- **Security**: Security-first approach with proper authentication and authorization
- **Maintainability**: Clean, readable, and well-documented code
- **Performance**: Optimized for fast loading and efficient resource usage
- **Responsiveness**: Mobile-first responsive design approach

---

## 2. System Architecture

### 2.1 Overall Architecture
The ComfortNest system follows a three-tier architecture pattern:

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION TIER                        │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐ │
│  │   HTML5     │ │    CSS3     │ │    JavaScript (ES6+)    │ │
│  │   Pages     │ │   Styles    │ │    Frontend Logic       │ │
│  └─────────────┘ └─────────────┘ └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION TIER                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐ │
│  │   Express   │ │ Controllers │ │      Middleware         │ │
│  │   Router    │ │   Business  │ │   Authentication &      │ │
│  │             │ │    Logic    │ │    Authorization        │ │
│  └─────────────┘ └─────────────┘ └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      DATA TIER                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐ │
│  │   MongoDB   │ │  Mongoose   │ │    File System          │ │
│  │  Database   │ │    ODM      │ │   Image Storage         │ │
│  └─────────────┘ └─────────────┘ └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Component Architecture

#### 2.2.1 Frontend Components
```
Frontend/
├── Pages/
│   ├── index.html          # Homepage with property listings
│   ├── admin.html          # Admin dashboard
│   ├── login.html          # User authentication
│   ├── sign up.html        # User registration
│   ├── add-property.html   # Property creation
│   ├── edit-property.html  # Property editing
│   ├── detail.html         # Property details
│   ├── contact.html        # Contact page
│   └── about.html          # About page
├── Scripts/
│   ├── api.js              # API communication layer
│   ├── admin.js            # Admin dashboard logic
│   ├── auth.js             # Authentication handling
│   ├── property.js         # Property management
│   └── utils.js            # Utility functions
└── Styles/
    ├── styles.css          # Global styles
    ├── admin.css           # Admin-specific styles
    └── responsive.css      # Mobile responsiveness
```

#### 2.2.2 Backend Components
```
Backend/
├── Controllers/
│   ├── userController.js       # User management logic
│   └── propertyController.js   # Property management logic
├── Models/
│   ├── userModel.js           # User data model
│   └── propertyModel.js       # Property data model
├── Routes/
│   ├── userRoutes.js          # User API endpoints
│   └── propertyRoutes.js      # Property API endpoints
├── Middleware/
│   └── authMiddleware.js      # Authentication middleware
└── Utils/
    ├── validation.js          # Input validation
    ├── fileUpload.js          # File handling
    └── errorHandler.js        # Error management
```

### 2.3 Technology Stack Design

#### 2.3.1 Frontend Stack
- **HTML5**: Semantic markup with modern HTML features
- **CSS3**: Modern styling with Flexbox, Grid, and CSS Variables
- **JavaScript ES6+**: Modern JavaScript with async/await, modules
- **Bootstrap 5**: Responsive framework for UI components
- **Font Awesome**: Icon library for consistent iconography
- **Swiper.js**: Touch slider for image galleries

#### 2.3.2 Backend Stack
- **Node.js**: JavaScript runtime for server-side execution
- **Express.js**: Web framework for API development
- **MongoDB**: NoSQL document database for data storage
- **Mongoose**: ODM for MongoDB with schema validation
- **JWT**: Token-based authentication system
- **bcrypt.js**: Password hashing and security
- **Multer**: File upload middleware
- **CORS**: Cross-origin resource sharing
- **Morgan**: HTTP request logging

---

## 3. Database Design

### 3.1 Database Architecture
The system uses MongoDB as the primary database with the following design principles:
- **Document-oriented**: Flexible schema design
- **Embedded documents**: Related data stored together
- **Indexing**: Optimized queries with proper indexes
- **Validation**: Schema-level data validation

### 3.2 Collection Design

#### 3.2.1 Users Collection
```javascript
// users collection schema
{
  _id: ObjectId,                    // Primary key
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [emailValidator, 'Invalid email format']
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false                   // Exclude from queries by default
  },
  phone: {
    type: String,
    trim: true,
    validate: [phoneValidator, 'Invalid phone format']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  displayId: {
    type: String,
    unique: true,
    sparse: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}

// Indexes
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "displayId": 1 }, { unique: true, sparse: true })
db.users.createIndex({ "role": 1 })
```

#### 3.2.2 Properties Collection
```javascript
// properties collection schema
{
  _id: ObjectId,                    // Primary key
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    validate: [priceValidator, 'Price must be a positive number']
  },
  location: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  bedrooms: {
    type: Number,
    min: 0,
    max: 20,
    default: 1
  },
  bathrooms: {
    type: Number,
    min: 0,
    max: 20,
    default: 1
  },
  propertyType: {
    type: String,
    enum: ['house', 'apartment', 'condo', 'townhouse', 'commercial'],
    required: true
  },
  images: [{
    type: String,                   // Array of image URLs/paths
    validate: [imageValidator, 'Invalid image format']
  }],
  owner: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}

// Indexes
db.properties.createIndex({ "location": 1 })
db.properties.createIndex({ "price": 1 })
db.properties.createIndex({ "propertyType": 1 })
db.properties.createIndex({ "bedrooms": 1 })
db.properties.createIndex({ "isActive": 1 })
db.properties.createIndex({ "owner": 1 })
db.properties.createIndex({ "createdAt": -1 })
// Compound indexes for common queries
db.properties.createIndex({ "isActive": 1, "price": 1 })
db.properties.createIndex({ "location": 1, "propertyType": 1 })
```

### 3.3 Data Relationships
```javascript
// User-Property Relationship (One-to-Many)
User (1) ←→ (Many) Properties

// Example query with population
Property.find().populate('owner', 'name email phone')
```

### 3.4 Database Operations Design

#### 3.4.1 CRUD Operations
```javascript
// Create
const createProperty = async (propertyData) => {
  const property = new Property(propertyData);
  return await property.save();
};

// Read with filtering and pagination
const getProperties = async (filters, page, limit) => {
  const query = Property.find(filters);
  return await query
    .populate('owner', 'name email phone')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
};

// Update
const updateProperty = async (id, updateData) => {
  return await Property.findByIdAndUpdate(
    id, 
    { ...updateData, updatedAt: new Date() },
    { new: true, runValidators: true }
  );
};

// Delete (soft delete)
const deleteProperty = async (id) => {
  return await Property.findByIdAndUpdate(
    id,
    { isActive: false, updatedAt: new Date() }
  );
};
```

---

## 4. API Design

### 4.1 RESTful API Architecture
The API follows REST principles with the following design patterns:
- **Resource-based URLs**: `/api/users`, `/api/properties`
- **HTTP methods**: GET, POST, PUT, DELETE for CRUD operations
- **Status codes**: Proper HTTP status codes for responses
- **JSON format**: All data exchange in JSON format
- **Stateless**: Each request contains all necessary information

### 4.2 API Endpoint Design

#### 4.2.1 Authentication Endpoints
```javascript
// User Registration
POST /api/users/register
Request Body: {
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
  phone: "+1234567890"
}
Response: {
  success: true,
  message: "User registered successfully",
  user: { id, name, email, role },
  token: "jwt_token_here"
}

// User Login
POST /api/users/login
Request Body: {
  email: "john@example.com",
  password: "password123"
}
Response: {
  success: true,
  message: "Login successful",
  user: { id, name, email, role },
  token: "jwt_token_here"
}

// Password Reset OTP
POST /api/users/send-password-reset-otp
Request Body: {
  email: "john@example.com"
}
Response: {
  success: true,
  message: "OTP sent successfully"
}

// Reset Password
POST /api/users/reset-password
Request Body: {
  email: "john@example.com",
  otp: "123456",
  newPassword: "newpassword123"
}
Response: {
  success: true,
  message: "Password reset successfully"
}
```

#### 4.2.2 Property Management Endpoints
```javascript
// Get All Properties (with filtering)
GET /api/properties?location=city&minPrice=100000&maxPrice=500000&bedrooms=3&propertyType=house&page=1&limit=10
Response: {
  success: true,
  data: [
    {
      _id: "property_id",
      title: "Beautiful House",
      description: "A lovely family home...",
      price: 250000,
      location: "New York",
      bedrooms: 3,
      bathrooms: 2,
      propertyType: "house",
      images: ["image1.jpg", "image2.jpg"],
      owner: {
        _id: "owner_id",
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890"
      },
      createdAt: "2025-01-01T00:00:00.000Z"
    }
  ],
  pagination: {
    currentPage: 1,
    totalPages: 5,
    totalProperties: 50,
    hasNext: true,
    hasPrev: false
  }
}

// Get Single Property
GET /api/properties/:id
Response: {
  success: true,
  data: {
    _id: "property_id",
    title: "Beautiful House",
    description: "A lovely family home...",
    price: 250000,
    location: "New York",
    bedrooms: 3,
    bathrooms: 2,
    propertyType: "house",
    images: ["image1.jpg", "image2.jpg"],
    owner: {
      _id: "owner_id",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890"
    },
    views: 125,
    createdAt: "2025-01-01T00:00:00.000Z"
  }
}

// Create Property (Protected)
POST /api/properties
Headers: { Authorization: "Bearer jwt_token" }
Request Body: {
  title: "Beautiful House",
  description: "A lovely family home...",
  price: 250000,
  location: "New York",
  bedrooms: 3,
  bathrooms: 2,
  propertyType: "house"
}
Files: images[] (multipart/form-data)
Response: {
  success: true,
  message: "Property created successfully",
  data: { property_object }
}

// Update Property (Protected)
PUT /api/properties/:id
Headers: { Authorization: "Bearer jwt_token" }
Request Body: {
  title: "Updated Beautiful House",
  price: 275000
}
Response: {
  success: true,
  message: "Property updated successfully",
  data: { updated_property_object }
}

// Delete Property (Protected)
DELETE /api/properties/:id
Headers: { Authorization: "Bearer jwt_token" }
Response: {
  success: true,
  message: "Property deleted successfully"
}
```

#### 4.2.3 User Management Endpoints (Admin)
```javascript
// Get All Users (Admin only)
GET /api/users
Headers: { Authorization: "Bearer admin_jwt_token" }
Response: {
  success: true,
  data: [
    {
      _id: "user_id",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      role: "user",
      isVerified: true,
      createdAt: "2025-01-01T00:00:00.000Z"
    }
  ]
}

// Update User (Admin only)
PUT /api/users/:id
Headers: { Authorization: "Bearer admin_jwt_token" }
Request Body: {
  name: "Updated Name",
  role: "admin"
}
Response: {
  success: true,
  message: "User updated successfully",
  data: { updated_user_object }
}

// Delete User (Admin only)
DELETE /api/users/:id
Headers: { Authorization: "Bearer admin_jwt_token" }
Response: {
  success: true,
  message: "User deleted successfully"
}
```

### 4.3 API Response Design

#### 4.3.1 Success Response Format
```javascript
{
  success: true,
  message: "Operation completed successfully",
  data: { /* response data */ },
  pagination: { /* pagination info if applicable */ }
}
```

#### 4.3.2 Error Response Format
```javascript
{
  success: false,
  message: "Error description",
  error: "Detailed error message",
  code: "ERROR_CODE",
  timestamp: "2025-01-01T00:00:00.000Z"
}
```

#### 4.3.3 HTTP Status Codes
- **200**: Success (GET, PUT)
- **201**: Created (POST)
- **204**: No Content (DELETE)
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (authentication required)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found (resource doesn't exist)
- **409**: Conflict (duplicate data)
- **500**: Internal Server Error

---

## 5. Frontend Design

### 5.1 Frontend Architecture
The frontend follows a modular architecture with separation of concerns:

```javascript
// Frontend Module Structure
const ComfortNest = {
  // Core modules
  API: {
    // API communication layer
    baseURL: 'http://localhost:5000/api',
    request: async (endpoint, options) => { /* implementation */ },
    auth: { /* authentication methods */ },
    properties: { /* property API methods */ },
    users: { /* user API methods */ }
  },

  // UI modules
  UI: {
    // User interface components
    components: { /* reusable UI components */ },
    pages: { /* page-specific logic */ },
    utils: { /* UI utility functions */ }
  },

  // State management
  State: {
    // Application state
    user: null,
    properties: [],
    filters: {},
    pagination: {}
  },

  // Event handling
  Events: {
    // Event listeners and handlers
    init: () => { /* initialize event listeners */ },
    handlers: { /* event handler functions */ }
  }
};
```

### 5.2 Page Design Architecture

#### 5.2.1 Homepage Design (index.html)
```javascript
// Homepage Components
const Homepage = {
  // Hero section with search
  hero: {
    searchForm: document.getElementById('search-form'),
    filters: {
      location: document.getElementById('location-filter'),
      priceRange: document.getElementById('price-range'),
      bedrooms: document.getElementById('bedrooms-filter'),
      propertyType: document.getElementById('property-type-filter')
    }
  },

  // Property listings grid
  propertyGrid: {
    container: document.getElementById('property-container'),
    loadProperties: async (filters) => { /* load and display properties */ },
    renderProperty: (property) => { /* render single property card */ },
    pagination: { /* pagination controls */ }
  },

  // Featured properties section
  featured: {
    container: document.getElementById('featured-properties'),
    loadFeatured: async () => { /* load featured properties */ }
  }
};
```

#### 5.2.2 Admin Dashboard Design (admin.html)
```javascript
// Admin Dashboard Components
const AdminDashboard = {
  // Authentication check
  auth: {
    checkAdminAuth: () => { /* verify admin authentication */ },
    redirectToLogin: () => { /* redirect if not authenticated */ }
  },

  // Dashboard sections
  sections: {
    overview: {
      stats: { /* user and property statistics */ },
      charts: { /* analytics charts */ }
    },

    userManagement: {
      userTable: document.getElementById('users-table'),
      loadUsers: async () => { /* load and display users */ },
      editUser: (userId) => { /* edit user modal */ },
      deleteUser: (userId) => { /* delete user confirmation */ }
    },

    propertyManagement: {
      propertyTable: document.getElementById('properties-table'),
      loadProperties: async () => { /* load and display properties */ },
      editProperty: (propertyId) => { /* edit property modal */ },
      deleteProperty: (propertyId) => { /* delete property confirmation */ }
    }
  }
};
```

### 5.3 Responsive Design Strategy

#### 5.3.1 Breakpoint Design
```css
/* Mobile First Approach */
/* Base styles for mobile (320px+) */
.property-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .property-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .property-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
}

/* Large Desktop (1200px+) */
@media (min-width: 1200px) {
  .property-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

#### 5.3.2 Component Responsiveness
```css
/* Navigation Design */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

/* Mobile menu */
@media (max-width: 767px) {
  .navbar-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .navbar-menu.active {
    display: block;
  }

  .hamburger {
    display: block;
  }
}

/* Desktop menu */
@media (min-width: 768px) {
  .navbar-menu {
    display: flex;
  }

  .hamburger {
    display: none;
  }
}
```

---

## 6. Security Design

### 6.1 Authentication Design

#### 6.1.1 JWT Token Structure
```javascript
// JWT Token Payload
{
  header: {
    alg: "HS256",
    typ: "JWT"
  },
  payload: {
    id: "user_id",
    email: "user@example.com",
    role: "user",
    iat: 1640995200,  // issued at
    exp: 1641081600   // expires at (24 hours)
  },
  signature: "encrypted_signature"
}

// Token Generation
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};
```

#### 6.1.2 Authentication Middleware Design
```javascript
// Authentication Middleware
const protect = async (req, res, next) => {
  try {
    // 1. Check if token exists
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Check if user still exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token is no longer valid.'
      });
    }

    // 4. Attach user to request
    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token.'
    });
  }
};

// Admin Authorization Middleware
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    });
  }
  next();
};
```

### 6.2 Password Security Design

#### 6.2.1 Password Hashing
```javascript
// Password hashing before saving
userSchema.pre('save', async function(next) {
  // Only hash if password is modified
  if (!this.isModified('password')) return next();

  // Hash password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Password comparison method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
```

#### 6.2.2 Password Validation
```javascript
// Password strength validation
const validatePassword = (password) => {
  const minLength = 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const errors = [];

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }

  if (!hasUpperCase) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!hasLowerCase) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!hasNumbers) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
};
```

### 6.3 Input Validation Design

#### 6.3.1 Server-side Validation
```javascript
// Property validation schema
const propertyValidation = {
  title: {
    required: true,
    type: 'string',
    minLength: 5,
    maxLength: 200,
    sanitize: true
  },
  description: {
    required: true,
    type: 'string',
    minLength: 20,
    maxLength: 2000,
    sanitize: true
  },
  price: {
    required: true,
    type: 'number',
    min: 0,
    max: 100000000
  },
  location: {
    required: true,
    type: 'string',
    minLength: 2,
    maxLength: 200,
    sanitize: true
  },
  bedrooms: {
    type: 'number',
    min: 0,
    max: 20,
    default: 1
  },
  bathrooms: {
    type: 'number',
    min: 0,
    max: 20,
    default: 1
  },
  propertyType: {
    required: true,
    type: 'string',
    enum: ['house', 'apartment', 'condo', 'townhouse', 'commercial']
  }
};

// Validation middleware
const validateProperty = (req, res, next) => {
  const errors = [];

  // Validate each field
  Object.keys(propertyValidation).forEach(field => {
    const rules = propertyValidation[field];
    const value = req.body[field];

    // Required field check
    if (rules.required && (!value || value.toString().trim() === '')) {
      errors.push(`${field} is required`);
      return;
    }

    // Type validation
    if (value && rules.type === 'number' && isNaN(value)) {
      errors.push(`${field} must be a number`);
      return;
    }

    // String length validation
    if (value && rules.type === 'string') {
      if (rules.minLength && value.length < rules.minLength) {
        errors.push(`${field} must be at least ${rules.minLength} characters`);
      }
      if (rules.maxLength && value.length > rules.maxLength) {
        errors.push(`${field} must not exceed ${rules.maxLength} characters`);
      }
    }

    // Number range validation
    if (value && rules.type === 'number') {
      if (rules.min !== undefined && value < rules.min) {
        errors.push(`${field} must be at least ${rules.min}`);
      }
      if (rules.max !== undefined && value > rules.max) {
        errors.push(`${field} must not exceed ${rules.max}`);
      }
    }

    // Enum validation
    if (value && rules.enum && !rules.enum.includes(value)) {
      errors.push(`${field} must be one of: ${rules.enum.join(', ')}`);
    }

    // Sanitization
    if (rules.sanitize && typeof value === 'string') {
      req.body[field] = value.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    }
  });

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors
    });
  }

  next();
};
```

---

## 7. File Management Design

### 7.1 Image Upload Architecture

#### 7.1.1 Multer Configuration
```javascript
// File upload configuration
const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  // Check file type
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Upload configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 10 // Maximum 10 files
  }
});

// Middleware for property images
const uploadPropertyImages = upload.array('images', 10);
```

### 7.2 File Storage Strategy

#### 7.2.1 Directory Structure
```
public/
├── uploads/
│   ├── properties/           # Property images
│   └── temp/                 # Temporary uploads
├── static/
│   ├── images/              # Static site images
│   ├── css/                 # Stylesheets
│   └── js/                  # JavaScript files
```

---

## 8. Error Handling Design

### 8.1 Global Error Handler
```javascript
// Global error handling middleware
const globalErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = { message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
```

---

## 9. Performance Design

### 9.1 Database Performance
```javascript
// Optimized property search with aggregation
const searchProperties = async (filters, page = 1, limit = 10) => {
  const pipeline = [];

  // Match stage for filtering
  const matchStage = { isActive: true };

  if (filters.location) {
    matchStage.location = { $regex: filters.location, $options: 'i' };
  }

  if (filters.minPrice || filters.maxPrice) {
    matchStage.price = {};
    if (filters.minPrice) matchStage.price.$gte = parseInt(filters.minPrice);
    if (filters.maxPrice) matchStage.price.$lte = parseInt(filters.maxPrice);
  }

  pipeline.push({ $match: matchStage });

  // Lookup owner information
  pipeline.push({
    $lookup: {
      from: 'users',
      localField: 'owner',
      foreignField: '_id',
      as: 'owner',
      pipeline: [{ $project: { name: 1, email: 1, phone: 1 } }]
    }
  });

  // Sort and paginate
  pipeline.push({ $sort: { createdAt: -1 } });
  pipeline.push({
    $facet: {
      data: [
        { $skip: (page - 1) * limit },
        { $limit: limit }
      ],
      count: [{ $count: 'total' }]
    }
  });

  const result = await Property.aggregate(pipeline);
  return {
    properties: result[0].data,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil((result[0].count[0]?.total || 0) / limit),
      totalProperties: result[0].count[0]?.total || 0
    }
  };
};
```

### 9.2 Frontend Performance
```javascript
// Image lazy loading
const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
};

// Debounce utility for search
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
```

---

## 10. Deployment Design

### 10.1 Environment Configuration
```javascript
// Production configuration
const config = {
  production: {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpire: process.env.JWT_EXPIRE || '24h',
    logLevel: 'error'
  }
};

// Security middleware for production
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);
```

### 10.2 Health Monitoring
```javascript
// Health check endpoint
app.get('/api/health', async (req, res) => {
  const health = {
    database: await checkDatabaseHealth(),
    memory: checkMemoryUsage(),
    uptime: process.uptime()
  };

  const isHealthy = Object.values(health).every(check =>
    check.status === 'healthy'
  );

  res.status(isHealthy ? 200 : 503).json(health);
});
```

---

**Document End**

*This SDS document provides comprehensive technical design specifications for the ComfortNest Real Estate Property Website development project.*
```
```
