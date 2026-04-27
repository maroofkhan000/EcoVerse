# EcoVerse Backend

Express.js REST API for the EcoVerse volunteer and program management system.

## Setup

```bash
cd backend
npm install
npm start        # production
npm run dev      # development (auto-restarts on file change)
```

## Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/join` | Submit a volunteer application |
| PUT | `/api/join/:id/confirm` | Admin: confirm a volunteer |
| GET | `/api/data` | Fetch all data (programs, events, volunteers) |
| POST | `/api/programs` | Upload a new restoration program |
| POST | `/api/events` | Create a new event |

## Data Storage

Data is persisted locally in `data.json` (auto-created on first run).
