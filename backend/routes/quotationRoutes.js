import express from 'express';
import Quotation from '../models/Quotation.js';

const router = express.Router();

// Get all quotations
router.get('/', async (req, res) => {
  try {
    const quotations = await Quotation.find().sort({ createdAt: -1 });
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new quotation
router.post('/', async (req, res) => {
  try {
    const quotation = new Quotation(req.body);
    const newQuotation = await quotation.save();
    res.status(201).json(newQuotation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a quotation
router.put('/:id', async (req, res) => {
  try {
    const updatedQuotation = await Quotation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedQuotation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a quotation
router.delete('/:id', async (req, res) => {
  try {
    await Quotation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Quotation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
