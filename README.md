# LetsCode Frontend

Web client for **LetsCode** — a LeetCode-style coding practice platform. Browse problems, write code in the browser, submit solutions, and get real-time evaluation results.

**Live demo:** [letscode.vinaybadgujar.online](https://letscode.vinaybadgujar.online)

## Features

- Problem list and problem detail pages
- In-browser code editor (Ace) with Python, Java, and C++ stubs
- Firebase Google authentication
- Code submission with live Socket.IO results
- Admin flow to add new problems

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS + DaisyUI
- Firebase Auth
- Socket.IO client
- React Router
- Axios

## Getting started

### Prerequisites

- Node.js 18+
- Running [LetsCode backend](https://github.com/vinaybadgujar102/LetsCodeBackend) services
- Firebase project (Auth enabled)

### Setup

```bash
git clone https://github.com/vinaybadgujar102/letsCodeFrontend.git
cd letsCodeFrontend
npm install
```

Create a `.env` file:

```env
VITE_PROBLEM_ADMIN_BASE_URL=http://localhost:3000
VITE_SUBMISSION_SERVICE_URL=http://localhost:3001
VITE_SOCKET_SERVICE_URL=http://localhost:3003

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

### Run

```bash
npm run dev
```

App runs at `http://localhost:5173`.

### Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── apis/           # REST API clients
├── components/     # UI components (editor, navbar, etc.)
├── config/         # Firebase config
├── context/        # Auth context
├── hooks/          # Custom hooks
├── pages/          # Route pages
└── services/       # Socket + Firebase helpers
```

## Related

- Backend: [LetsCodeBackend](https://github.com/vinaybadgujar102/LetsCodeBackend)
