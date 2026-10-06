import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  purchases: [{
    item: String,
    amount: Number,
    date: {
      type: Date,
      default: Date.now,
    }
  }],
}, {
  timestamps: true,
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
