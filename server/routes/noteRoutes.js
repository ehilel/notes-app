const express = require('express');
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  toggleStar,
} = require('../controllers/noteController');
const validateNote = require('../middleware/validateNote');

const router = express.Router();

router
  .route('/')
  .get(getNotes)
  .post(validateNote, createNote);

router
  .route('/:id')
  .put(validateNote, updateNote)
  .delete(deleteNote);

router.patch('/:id/star', toggleStar);

module.exports = router;
