import mongoose from 'mongoose';

const connectionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  business: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    default: 'Mr.',
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  countryCode: {
    type: String,
    default: '+91',
  },
  mobile: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  categories: {
    Customer: { type: Boolean, default: false },
    Supplier: { type: Boolean, default: false },
    Neighbour: { type: Boolean, default: false },
    Friend: { type: Boolean, default: false },
  },
  notes: {
    type: String,
  }
}, {
  timestamps: true,
});

const Connection = mongoose.model('Connection', connectionSchema);
export default Connection;
