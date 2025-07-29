const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zipCode: String,
  country: String
}, { _id: false });

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a property title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a property description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a property price'],
    },
    location: {
      type: String,
      required: [true, 'Please provide a property location'],
    },
    address: {
      type: addressSchema,
      required: [true, 'Please provide property address details']
    },
    bedrooms: {
      type: Number,
      required: [true, 'Please provide number of bedrooms'],
    },
    bathrooms: {
      type: Number,
      required: [true, 'Please provide number of bathrooms'],
    },
    size: {
      type: Number,
      required: [true, 'Please provide property size in sq ft'],
    },
    propertyType: {
      type: String,
      required: [true, 'Please provide property type'],
      enum: ['House', 'Apartment', 'Condo', 'Villa', 'Studio', 'Other'],
    },
    images: [String],
    amenities: [String],
    yearBuilt: {
      type: Number,
      min: 1800,
      max: new Date().getFullYear()
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Property = mongoose.model('Property', propertySchema);

module.exports = Property; 