import express from 'express';
import PurchaseOrder from '../models/PurchaseOrder.js';

const router = express.Router();

// Get all purchase orders
router.get('/', async (req, res) => {
  try {
    const orders = await PurchaseOrder.find({ userId: req.headers['user-id'] }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new purchase order
router.post('/', async (req, res) => {
  try {
    const order = new PurchaseOrder({ ...req.body, userId: req.headers['user-id'] });
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a purchase order
router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await PurchaseOrder.findOneAndUpdate(
      { _id: req.params.id, userId: req.headers['user-id'] },
      req.body,
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a purchase order
router.delete('/:id', async (req, res) => {
  try {
    await PurchaseOrder.findOneAndDelete({ _id: req.params.id, userId: req.headers['user-id'] });
    res.json({ message: 'Purchase Order deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
