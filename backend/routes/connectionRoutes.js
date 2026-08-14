import express from 'express';
import Connection from '../models/Connection.js';

const router = express.Router();

// Get all connections, optionally filter by category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category) {
      query[`categories.${category}`] = true;
    }
    const connections = await Connection.find(query).sort({ createdAt: -1 });
    res.json(connections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new connection
router.post('/', async (req, res) => {
  try {
    const connection = new Connection(req.body);
    const newConnection = await connection.save();
    res.status(201).json(newConnection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a connection
router.put('/:id', async (req, res) => {
  try {
    const updatedConnection = await Connection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedConnection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a connection
router.delete('/:id', async (req, res) => {
  try {
    await Connection.findByIdAndDelete(req.params.id);
    res.json({ message: 'Connection deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
