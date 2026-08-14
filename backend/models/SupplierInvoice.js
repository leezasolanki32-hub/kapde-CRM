import mongoose from 'mongoose';

const supplierInvoiceItemSchema = new mongoose.Schema({
  description: String,
  qty: Number,
  unit: String,
  rate: Number,
  amount: Number
});

const supplierInvoiceSchema = new mongoose.Schema({
  supplier: { type: String, required: true },
  contact: String,
  invoiceNo: { type: String, required: true, unique: true },
  invoiceDate: { type: String, required: true },
  dueDate: String,
  creditMonth: String,
  taxPercent: { type: String, default: '18' },
  narration: String,
  items: [supplierInvoiceItemSchema],
  taxable: String,
  amount: String,
  status: { type: String, default: 'Unpaid' }
}, { timestamps: true });

export default mongoose.model('SupplierInvoice', supplierInvoiceSchema);
