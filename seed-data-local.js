// This script creates dummy data in local storage for testing
// since MongoDB is not available

// Dummy Users
const dummyUsers = [
  {
    _id: '60d0fe4f5311236168a109ca',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    phone: '123-456-7890',
    role: 'admin'
  },
  {
    _id: '60d0fe4f5311236168a109cb',
    name: 'John Smith',
    email: 'john@example.com',
    password: 'password123',
    phone: '987-654-3210',
    role: 'user'
  },
  {
    _id: '60d0fe4f5311236168a109cc',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    password: 'password123',
    phone: '555-123-4567',
    role: 'user'
  }
];

// Dummy Properties
const dummyProperties = [
  {
    _id: '60d0fe4f5311236168a10a01',
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
    owner: '60d0fe4f5311236168a109cb',
    isAvailable: true
  },
  {
    _id: '60d0fe4f5311236168a10a02',
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
    owner: '60d0fe4f5311236168a109ca',
    isAvailable: true
  },
  {
    _id: '60d0fe4f5311236168a10a03',
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
    owner: '60d0fe4f5311236168a109cc',
    isAvailable: true
  },
  {
    _id: '60d0fe4f5311236168a10a04',
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
    owner: '60d0fe4f5311236168a109cb',
    isAvailable: true
  },
  {
    _id: '60d0fe4f5311236168a10a05',
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
    owner: '60d0fe4f5311236168a109ca',
    isAvailable: true
  }
];

// Save to localStorage when opened in browser
console.log('// Copy and paste this in your browser console:');
console.log(`
// Store dummy users and properties in localStorage
localStorage.setItem('dummyUsers', JSON.stringify(${JSON.stringify(dummyUsers)}));
localStorage.setItem('dummyProperties', JSON.stringify(${JSON.stringify(dummyProperties)}));
localStorage.setItem('token', 'dummy-token-for-testing');
localStorage.setItem('user', JSON.stringify(${JSON.stringify(dummyUsers[0])}));
console.log('Dummy data loaded successfully!');
`);

console.log('\nInstructions:');
console.log('1. Open index.html in your browser');
console.log('2. Press F12 to open developer tools');
console.log('3. Go to the Console tab');
console.log('4. Copy and paste the code above into the console and press Enter');
console.log('5. You will now be able to test the frontend with dummy data');
console.log('6. For admin access, use: admin@example.com / password123');
console.log('7. For regular user access, use: john@example.com / password123'); 