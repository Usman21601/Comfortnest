require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/userModel');
const Property = require('./models/propertyModel');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/property-rental-db')
  .then(() => console.log('MongoDB connected for seeding data'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Create dummy users
const createUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});
    
    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      phone: '123-456-7890',
      role: 'admin'
    });
    
    // Create regular users
    const user1 = await User.create({
      name: 'John Smith',
      email: 'john@example.com',
      password: 'password123',
      phone: '987-654-3210',
      role: 'user'
    });
    
    const user2 = await User.create({
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      password: 'password123',
      phone: '555-123-4567',
      role: 'user'
    });
    
    console.log('Dummy users created successfully');
    return [adminUser, user1, user2];
  } catch (error) {
    console.error('Error creating dummy users:', error);
    process.exit(1);
  }
};

// Create dummy properties
const createProperties = async (users) => {
  try {
    // Clear existing properties
    await Property.deleteMany({});
    
    // Create properties
    await Property.create([
      {
        title: 'Modern Apartment in City Center',
        description: 'A beautiful modern apartment located in the heart of the city with easy access to public transportation, restaurants, and shopping centers.',
        price: 120000,
        location: 'Downtown, Metro City',
        bedrooms: 2,
        bathrooms: 1,
        size: 1200,
        propertyType: 'Apartment',
        images: ['./images/pic1.jpg', './images/pic2.jpg'],
        amenities: ['Air Conditioning', 'WiFi', 'Parking', 'Gym'],
        owner: users[1]._id,
        isAvailable: true
      },
      {
        title: 'Luxury Villa with Pool',
        description: 'Spacious luxury villa with private pool, garden, and breathtaking views of the mountains.',
        price: 500000,
        location: 'Highland Estates, Metro City',
        bedrooms: 4,
        bathrooms: 3,
        size: 3500,
        propertyType: 'Villa',
        images: ['./images/pic3.jpg', './images/pic4.jpg'],
        amenities: ['Swimming Pool', 'Garden', 'BBQ Area', 'Security System', 'Parking'],
        owner: users[0]._id,
        isAvailable: true
      },
      {
        title: 'Cozy Studio for Students',
        description: 'Perfect studio apartment for students or young professionals. Close to university and shopping centers.',
        price: 75000,
        location: 'University District, Metro City',
        bedrooms: 1,
        bathrooms: 1,
        size: 500,
        propertyType: 'Studio',
        images: ['./images/pic5.jpg', './images/pic6.jpg'],
        amenities: ['WiFi', 'Laundry', 'Study Desk'],
        owner: users[2]._id,
        isAvailable: true
      },
      {
        title: 'Family Home with Garden',
        description: 'Comfortable family home with large garden, perfect for families with children. Located in a quiet residential area.',
        price: 320000,
        location: 'Peaceful Valley, Metro City',
        bedrooms: 3,
        bathrooms: 2,
        size: 2200,
        propertyType: 'House',
        images: ['./images/pic2.jpg', './images/pic3.jpg'],
        amenities: ['Garden', 'Parking', 'Playground', 'Storage Room'],
        owner: users[1]._id,
        isAvailable: true
      },
      {
        title: 'Penthouse with City View',
        description: 'Luxurious penthouse with panoramic city views, modern amenities, and spacious living areas.',
        price: 750000,
        location: 'Skyline Towers, Metro City',
        bedrooms: 3,
        bathrooms: 2,
        size: 2800,
        propertyType: 'Apartment',
        images: ['./images/pic4.jpg', './images/pic5.jpg'],
        amenities: ['Air Conditioning', 'WiFi', 'Gym', 'Pool', 'Security System'],
        owner: users[0]._id,
        isAvailable: true
      }
    ]);
    
    console.log('Dummy properties created successfully');
  } catch (error) {
    console.error('Error creating dummy properties:', error);
  }
};

// Run the seeding process
const seedData = async () => {
  try {
    const users = await createUsers();
    await createProperties(users);
    console.log('Data seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData(); 