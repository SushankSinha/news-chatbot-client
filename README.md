# RAG Chatbot Frontend

## Project Structure
The frontend follows a modular, scalable structure typical for React + Vite projects, separating concerns like components, API utilities, and core app logic. This organization promotes maintainability, with reusable components in a dedicated folder and API handling isolated for easy updates (e.g., for production deployments). The structure is inspired by best practices for mid-sized React apps, emphasizing separation of UI (components), data fetching (API), and main orchestration (App.jsx).

frontend/
├── public/                 # Static assets (e.g., favicon, images)
│   └── vite.svg            # Default Vite icon (replace as needed)
├── src/                    # Source code
│   ├── api/                # API utilities and clients
│   │   └── axiosClient.js  # Axios instance for backend requests (with interceptors, timeout, and env-based baseURL)
│   ├── components/         # Reusable React components for the chat UI
│   │   ├── ChatHeader.jsx  # Header with title and reset button
│   │   ├── ChatInput.jsx   # Input field and send button with Enter key support
│   │   ├── Message.jsx     # Individual message bubble (user/assistant styling)
│   │   └── MessageList.jsx # List of messages with scrolling and typing indicator
│   ├── App.jsx             # Main app component (orchestrates state, socket, and sub-components)
│   ├── App.scss            # Global SCSS styles for the chat UI (modern, responsive design)
│   ├── main.jsx            # Entry point (renders App to DOM)
│   └── index.css           # Default global CSS (if needed, but SCSS handles most)
├── .env                    # Environment variables (e.g., VITE_API_BASE_URL=http://localhost:3000)
├── .gitignore              # Git ignore rules (e.g., node_modules, .env)
├── index.html              # Vite entry HTML (mounts #root)
├── package.json            # Dependencies and scripts (React, Vite, axios, socket.io-client, uuid, sass)
├── vite.config.js          # Vite configuration (plugins, proxy for API routing to backend)
└── README.md               # This file
text### Key Design Decisions
- **Modularity**: Components are atomic and focused (e.g., `Message` for single bubbles, `MessageList` for the scrollable area), making the code easier to test and extend.
- **API Isolation**: `axiosClient.js` centralizes HTTP requests with interceptors for logging/errors, using `VITE_API_BASE_URL` from `.env` for flexibility (dev/prod switching).
- **Styling**: Pure SCSS for a modern chat UI (gradient backgrounds, animations, responsive design) without external libraries like Ant Design.
- **State Management**: Simple React hooks (useState, useEffect, useRef) for chat history, session, and socket streaming—no Redux needed for this scope.
- **Vite-Specific**: Uses Vite's fast dev server with proxy in `vite.config.js` to route API calls (e.g., `/api/history`) to the backend, avoiding CORS issues.

For larger apps, this could evolve to include `hooks/` (custom hooks), `pages/` (if multi-page), or `utils/` (helpers), but it's optimized for this single-chat app.

## Setup
1. Install dependencies: `npm install` (includes React, Vite, axios, socket.io-client, uuid, sass).
2. Ensure `.env` is set with `VITE_API_BASE_URL=http://localhost:3000` (for backend connection).
3. Run: `npm run dev` (starts Vite dev server at http://localhost:5173).
4. For production: Run `npm run build` to generate `dist/` folder, then deploy to Vercel/Netlify. Update `VITE_API_BASE_URL` in `.env` to your deployed backend URL (e.g., Render).

## Running the App
- Opens at http://localhost:5173.
- Connects to backend at http://localhost:3000 (via API proxy or direct env URL).
- Features: Displays chat history, streams bot responses, handles new messages, and resets sessions.
- For production, update the backend URL in `.env` and rebuild.

## Troubleshooting
- If API calls fail (e.g., CORS or routing): Check `vite.config.js` proxy and ensure backend is running on port 3000 (verified at 07:53 PM IST, September 18, 2025).
- If messages don't load: Verify `/history` endpoint returns JSON array; add console logs in `axiosClient.js` for debugging.
- Mobile Testing: The SCSS includes responsive media queries for screens <768px.

This structure ensures clean code organization while adhering to the assignment's React + SCSS stack. For further improvements, consider adding TypeScript or custom hooks.