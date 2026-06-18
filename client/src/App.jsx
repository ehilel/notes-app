import React, { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteCard from './components/NoteCard';
import FilterBar from './components/FilterBar';
import { fetchNotes, createNote, updateNote, deleteNote, toggleStarNote } from './services/api';

const STORAGE_KEY = 'my_notes_app_user';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [filter, setFilter] = useState('all');
  const [user, setUser] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      setUser(savedUser);
    } else {
      setModalOpen(true);
    }
  }, []);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchNotes();
        setNotes(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadNotes();
  }, []);

  const handleSaveNote = async (noteData) => {
    try {
      if (!user) {
        setErrorMessage('אנא הזן שם משתמש לפני יצירת פתקים.');
        return;
      }
      const payload = {
        ...noteData,
        creator: user,
      };

      if (selectedNote) {
        const updated = await updateNote(selectedNote._id, payload);
        setNotes((current) => current.map((item) => (item._id === updated._id ? updated : item)));
        setSelectedNote(null);
      } else {
        const created = await createNote(payload);
        setNotes((current) => [created, ...current]);
      }
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteNote = async (id) => {
    const confirmed = window.confirm('להסיר את הפתק הזה לצמיתות?');
    if (!confirmed) return;

    try {
      await deleteNote(id);
      setNotes((current) => current.filter((note) => note._id !== id));
      if (selectedNote && selectedNote._id === id) {
        setSelectedNote(null);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleToggleStar = async (id) => {
    try {
      const updated = await toggleStarNote(id);
      setNotes((current) => current.map((note) => (note._id === updated._id ? updated : note)));
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser('');
    setModalOpen(true);
  };

  const handleSaveUser = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) {
      setErrorMessage('אנא הכנס שם תקין.');
      return;
    }
    localStorage.setItem(STORAGE_KEY, trimmed);
    setUser(trimmed);
    setModalOpen(false);
    setNameInput('');
    setErrorMessage('');
  };

  const visibleNotes = notes.filter((note) => (filter === 'starred' ? note.starred : true));

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>פתקים</h1>
          <p className="app-header__meta">יוצר: {user || 'אורח'}</p>
        </div>
      </header>

      <main className="content-grid">
        <section className="dashboard-panel">
          <div className="panel-header">
            <h2>{selectedNote ? 'ערוך פתק' : 'פתק חדש'}</h2>
          </div>
          <NoteForm selectedNote={selectedNote} onSave={handleSaveNote} onCancel={() => setSelectedNote(null)} creator={user} />
        </section>

        <section className="notes-panel">
          <FilterBar filter={filter} onFilterChange={handleFilterChange} onLogout={handleLogout} />
          {errorMessage && <div className="error-banner">{errorMessage}</div>}
          <div className="notes-grid">
            {visibleNotes.length === 0 ? (
              <div className="empty-state">לא נמצאו פתקים עבור הסינון הזה.</div>
            ) : (
              visibleNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={handleEditNote}
                  onDelete={handleDeleteNote}
                  onToggleStar={handleToggleStar}
                />
              ))
            )}
          </div>
        </section>
      </main>

      {modalOpen && (
        <div className="modal-backdrop">
          <div className="user-modal">
            <h2>ברוכים הבאים</h2>
            <p>הכנס את שמך כדי להתאים אישית כל פתק.</p>
            <input
              value={nameInput}
              onChange={(event) => setNameInput(event.target.value)}
              placeholder="השם שלך"
            />
            <div className="modal-actions">
              <button onClick={handleSaveUser}>שמור</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
