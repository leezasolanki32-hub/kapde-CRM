import express from 'express';
import SupplierInvoice from '../models/SupplierInvoice.js';

const router = express.Router();

// Get all supplier invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await SupplierInvoice.find({ userId: req.headers['user-id'] }).sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new supplier invoice
router.post('/', async (req, res) => {
  try {
    const invoice = new SupplierInvoice({ ...req.body, userId: req.headers['user-id'] });
    const newInvoice = await invoice.save();
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a supplier invoice
router.put('/:id', async (req, res) => {
  try {
    const updatedInvoice = await SupplierInvoice.findOneAndUpdate(
      { _id: req.params.id, userId: req.headers['user-id'] },
      req.body,
      { new: true }
    );
    res.json(updatedInvoice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a supplier invoice
router.delete('/:id', async (req, res) => {
  try {
    await SupplierInvoice.findOneAndDelete({ _id: req.params.id, userId: req.headers['user-id'] });
    res.json({ message: 'Supplier Invoice deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
