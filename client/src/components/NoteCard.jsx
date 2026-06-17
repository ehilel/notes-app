import React from 'react';

const NoteCard = ({ note, onEdit, onDelete, onToggleStar }) => {
  return (
    <article className="note-card">
      <div className="note-card__header">
        <div>
          <h3>{note.title}</h3>
          <p className="note-card__creator">נוצר ע"י:  {note.creator}</p>
        </div>
        <button className="star-button" onClick={() => onToggleStar(note._id)}>
          {note.starred ? '★' : '☆'}
        </button>
      </div>
      <p className="note-card__content">{note.content || 'אין תוכן נוסף.'}</p>
      <div className="note-card__actions">
        <button onClick={() => onEdit(note)}>ערוך</button>
        <button className="danger" onClick={() => onDelete(note._id)}>
          מחק
        </button>
      </div>
    </article>
  );
};

export default NoteCard;
