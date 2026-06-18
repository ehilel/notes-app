import React, { useState, useEffect } from 'react';

const NoteForm = ({ selectedNote, onSave, onCancel, creator }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content || '');
      return;
    }
    setTitle('');
    setContent('');
  }, [selectedNote]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Attempt to save the note via the parent handler.
    // The onSave function handles API interaction and error management.
    // After a successful save (i.e., no exception thrown), reset form fields.
    try {
      await onSave({ title: title.trim(), content: content.trim(), creator });
      // Reset only when creating a new note (selectedNote is falsy).
      if (!selectedNote) {
        setTitle('');
        setContent('');
        // Increment a counter to force any dependent effects to run if needed.
      }
    } catch (e) {
      // onSave already handles errors and updates UI; just rethrow to satisfy any caller.
      // No state reset on failure.
      console.error(e);
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="noteTitle">כותרת</label>
        <input
          id="noteTitle"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="הכנס כותרת לפתק"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="noteContent">תוכן</label>
        <textarea
          id="noteContent"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="פרטים אופציונליים"
          rows="4"
        />
      </div>
      <div className="form-actions">
        <button type="submit">שמור פתק</button>
        {selectedNote && (
          <button type="button" className="secondary" onClick={onCancel}>
            בטל
          </button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;
