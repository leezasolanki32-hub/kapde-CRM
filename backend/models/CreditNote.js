import mongoose from 'mongoose';

const creditNoteItemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  description: String,
  quantity: Number,
  price: Number,
  total: Number
});

const creditNoteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  creditNoteNumber: { type: String, required: true, unique: true },
  customerName: String,
  customerPhone: String,
  originalInvoiceRef: String,
  date: String,
  items: [creditNoteItemSchema],
  notes: String,
  terms: String,
  amount: Number,
  status: { type: String, default: 'Unused' }
}, { timestamps: true });

export default mongoose.model('CreditNote', creditNoteSchema);
