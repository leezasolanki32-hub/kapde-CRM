import mongoose from 'mongoose';

const quotationItemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  description: String,
  quantity: Number,
  price: Number,
  total: Number
});

const quotationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  quoteNumber: { type: String, required: true, unique: true },
  customerName: String,
  customerPhone: String,
  date: String,
  validUntil: String,
  amount: Number,
  items: [quotationItemSchema],
  notes: String,
  terms: String,
  type: { type: String, default: 'Quotations' },
  executive: String
}, { timestamps: true });

export default mongoose.model('Quotation', quotationSchema);
