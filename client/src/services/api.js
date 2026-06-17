const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const error = body.error || 'API request failed';
    throw new Error(error);
  }
  return response.json();
};

export const fetchNotes = async () => {
  const response = await fetch(`${API_BASE}/notes`);
  return handleResponse(response);
};

export const createNote = async (noteData) => {
  const response = await fetch(`${API_BASE}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(noteData),
  });
  return handleResponse(response);
};

export const updateNote = async (id, noteData) => {
  const response = await fetch(`${API_BASE}/notes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(noteData),
  });
  return handleResponse(response);
};

export const deleteNote = async (id) => {
  const response = await fetch(`${API_BASE}/notes/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

export const toggleStarNote = async (id) => {
  const response = await fetch(`${API_BASE}/notes/${id}/star`, {
    method: 'PATCH',
  });
  return handleResponse(response);
};
