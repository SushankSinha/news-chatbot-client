# RAG Chatbot Frontend

## Project Structure
The frontend follows a modular, scalable structure typical for React + Vite projects, separating concerns like components, API utilities, and core app logic. This organization promotes maintainability, with reusable components in a dedicated folder and API handling isolated for easy updates (e.g., for production deployments). The structure is inspired by best practices for mid-sized React apps, emphasizing separation of UI (components), data fetching (API), and main orchestration (App.jsx).

frontend/
├── public/                
│   └── vite.svg           
├── src/                    
│   ├── api/                
│   │   └── axiosClient.js  
│   ├── components/         
│   │   ├── ChatHeader.jsx  
│   │   ├── ChatInput.jsx   
│   │   ├── Message.jsx     
│   │   └── MessageList.jsx 
│   ├── App.jsx             
│   ├── App.scss            
│   ├── main.jsx            
│   └── index.css           
├── .env                    
├── .gitignore              
├── index.html              
├── package.json            
├── vite.config.js          
└── README.md               

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
