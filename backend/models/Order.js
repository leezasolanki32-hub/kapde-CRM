import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  category: String,
  quantity: Number,
  price: Number,
  total: Number
});

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  cust: { type: String, required: true },
  amt: { type: mongoose.Schema.Types.Mixed, required: true }, // Mixed to allow backward compatibility before migration script runs
  status: { type: String, default: 'Pending' },
  date: { type: mongoose.Schema.Types.Mixed, required: true }, // Mixed to allow backward compatibility before migration script runs
  ship: { type: String },
  src: { type: String, default: 'Website' },
  exec: { type: String, default: 'Meet Patel' },
  color: { type: String },
  items: [orderItemSchema]
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
