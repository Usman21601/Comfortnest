# Property Rental Application

A full-stack property rental web application built with Node.js, Express, MongoDB, and vanilla JavaScript frontend.

## Features

- User authentication (register, login, profile management)
- Property listings with search and filter functionality
- Property management (create, update, delete)
- Responsive design

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JSON Web Tokens for authentication
  - bcrypt.js for password hashing

- **Frontend**:
  - HTML5
  - CSS3
  - Vanilla JavaScript
  - Responsive design

## Installation

1. **Clone the repository**
```
git clone <repository-url>
cd property-rental-app
```

2. **Install dependencies**
```
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/property-rental-db
JWT_SECRET=your_secret_key
```

4. **Start MongoDB**
Make sure MongoDB is running on your system.

5. **Start the application**
```
npm run dev
```

The application should now be running on `http://localhost:5000`.

## Usage

- Visit `http://localhost:5000` to access the application
- Register a new account or login
- Browse properties or add your own listings
- Use the dashboard to manage your properties

## API Endpoints

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Properties
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get a single property
- `POST /api/properties` - Create a new property (protected)
- `PUT /api/properties/:id` - Update a property (protected)
- `DELETE /api/properties/:id` - Delete a property (protected)

## Directory Structure

```
/
├── controllers/         # Route controllers
├── middleware/          # Custom middleware
├── models/              # Mongoose models
├── routes/              # Express routes
├── js/                  # Frontend JavaScript
├── css/                 # CSS styles
├── images/              # Image files
├── *.html               # HTML pages
├── server.js            # Express app
└── package.json         # Project dependencies
```

## License

This project is licensed under the MIT License. 