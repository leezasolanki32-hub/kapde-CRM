import express from 'express';
import CreditNote from '../models/CreditNote.js';

const router = express.Router();

// Get all credit notes
router.get('/', async (req, res) => {
  try {
    const notes = await CreditNote.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new credit note
router.post('/', async (req, res) => {
  try {
    const note = new CreditNote(req.body);
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a credit note
router.put('/:id', async (req, res) => {
  try {
    const updatedNote = await CreditNote.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a credit note
router.delete('/:id', async (req, res) => {
  try {
    await CreditNote.findByIdAndDelete(req.params.id);
    res.json({ message: 'Credit Note deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
