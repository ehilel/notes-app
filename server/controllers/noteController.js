const Note = require('../models/Note');

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 });
    return res.json(notes);
  } catch (error) {
    return res.status(500).json({ error: 'Could not fetch notes' });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content = '', creator } = req.body;
    const note = await Note.create({ title, content, creator });
    return res.status(201).json(note);
  } catch (error) {
    return res.status(500).json({ error: 'Could not create note' });
  }
};

const updateNote = async (req, res) => {
  // Security: ensure only note creator can update
  const requestingUser = req.headers['x-user-name'];
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Ownership check
    if (note.creator !== requestingUser) {
      return res.status(403).json({ error: 'שגיאה: אין לך הרשאה לערוך או למחוק פתק זה' });
    }

    note.title = title !== undefined ? title : note.title;
    note.content = content !== undefined ? content : note.content;
    await note.save();

    return res.json(note);
  } catch (error) {
    return res.status(500).json({ error: 'Could not update note' });
  }
};

const deleteNote = async (req, res) => {
  // Security: ensure only note creator can delete
  const requestingUser = req.headers['x-user-name'];
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    // Ownership check
    if (note.creator !== requestingUser) {
      return res.status(403).json({ error: 'שגיאה: אין לך הרשאה לערוך או למחוק פתק זה' });
    }
    await Note.findByIdAndDelete(id);
    return res.json({ message: 'Note deleted' });
  } catch (error) {
    return res.status(500).json({ error: 'Could not delete note' });
  }
};

const toggleStar = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    note.starred = !note.starred;
    await note.save();

    return res.json(note);
  } catch (error) {
    return res.status(500).json({ error: 'Could not update note star status' });
  }
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  toggleStar,
};
