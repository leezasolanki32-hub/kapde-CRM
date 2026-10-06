import mongoose from 'mongoose';

const invoiceItemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  description: String,
  quantity: Number,
  price: Number,
  total: Number
});

const invoiceSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  invoiceNumber: { type: String, required: true, unique: true },
  customerName: String,
  customerPhone: String,
  date: String,
  dueDate: String,
  amount: Number,
  items: [invoiceItemSchema],
  notes: String,
  terms: String,
  status: { type: String, default: 'Unpaid' },
  executive: String
}, { timestamps: true });

export default mongoose.model('Invoice', invoiceSchema);
