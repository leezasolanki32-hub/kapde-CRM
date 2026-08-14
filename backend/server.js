import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import connectionRoutes from './routes/connectionRoutes.js';
import quotationRoutes from './routes/quotationRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import purchaseOrderRoutes from './routes/purchaseOrderRoutes.js';
import supplierInvoiceRoutes from './routes/supplierInvoiceRoutes.js';
import creditNoteRoutes from './routes/creditNoteRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('Kapde CRM Backend is running! 🚀');
});
app.use('/api/connections', connectionRoutes);
app.use('/api/quotations', quotationRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/purchase-orders', purchaseOrderRoutes);
app.use('/api/supplier-invoices', supplierInvoiceRoutes);
app.use('/api/credit-notes', creditNoteRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);

// MongoDB Connection
const connectDB = async () => {
  try {
    console.log(
      "Mongo URI:",
      process.env.MONGO_URI?.replace(/:\/\/.*@/, "://***:***@")
    );

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host} ✅`);
  } catch (error) {
    console.error(`Error: ${error.message} ❌`);
    process.exit(1);
  }
};

// Start Server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT} 🚀`);
});
