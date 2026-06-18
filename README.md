# My Notes App

A full-stack notes application built with a monorepo architecture.

## Overview

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React + Vite
- Features: create, edit, delete, star notes, user identity prompt, local storage persistence, filtering

## Setup

1. Install dependencies for server and client:
   ```bash
   cd ..\server
   npm install
   cd ..\client
   npm install
   ```

2. Create `.env` in `server`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/noatesapp
   ```

3. Start backend and frontend in separate terminals:
   ```bash
   cd c:\Users\gilad\OneDrive\מסמכים\noate-app\server
   npm run dev
   
   cd c:\Users\gilad\OneDrive\מסמכים\noate-app\client
   npm run dev
   ```

## Production

- Build the frontend with `npm run build` from `client`
- Serve static files or deploy separately from backend.

## API Endpoints

- `GET /api/notes`
- `POST /api/notes`
- `PUT /api/notes/:id`
- `DELETE /api/notes/:id`
- `PATCH /api/notes/:id/star`
