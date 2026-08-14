import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true,
    trim: true,
  },
  ownerName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  plan: {
    type: String,
    enum: ['Starter', 'Professional', 'Business'],
    default: 'Starter',
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
export default User;
