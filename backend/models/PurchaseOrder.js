import mongoose from 'mongoose';

const purchaseOrderItemSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  description: String,
  qty: Number,
  unit: String,
  rate: Number,
  amount: Number
});

const purchaseOrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  supplier: { type: String, required: true },
  contact: String,
  orderNumber: { type: String, required: true, unique: true },
  orderDate: { type: String, required: true },
  deliveryDate: String,
  status: { type: String, default: 'Pending' },
  taxPercent: { type: String, default: '18' },
  narration: String,
  shippingAddress: String,
  items: [purchaseOrderItemSchema],
  taxable: String,
  amount: String
}, { timestamps: true });

export default mongoose.model('PurchaseOrder', purchaseOrderSchema);
