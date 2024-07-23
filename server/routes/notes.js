const express = require('express');
const Note = require('../models/Note');
const protect = require('../middleware/auth');

const router = express.Router();



// Create a new note
router.post('/api', async (req, res) => {
    const { title, content } = req.body;

    try {
        const newNote = new Note({
            title,
            content,
        });

        const savedNote = await newNote.save();
        res.json(savedNote);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a note by ID
router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a note by ID
router.put('/:id', async (req, res) => {
    const { title, content } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );

        res.json(updatedNote);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a note by ID
router.delete('/:id', async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Note deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
