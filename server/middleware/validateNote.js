const validateNote = (req, res, next) => {
  const { title, creator } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  if (!creator || typeof creator !== 'string' || creator.trim() === '') {
    return res.status(400).json({ error: 'Creator is required' });
  }

  next();
};

module.exports = validateNote;
