import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import axiosClient from './api/axiosClient'; // Import the API instance
import { v4 as uuidv4 } from 'uuid';
import ChatHeader from './components/ChatHeader';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import './App.scss';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Use env var for consistency

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState(localStorage.getItem('sessionId') || null);
  const [isTyping, setIsTyping] = useState(false);
  const socket = useRef(null);

  // Handle socket connection and history fetch
  useEffect(() => {
    let currentSessionId = sessionId;
    if (!currentSessionId) {
      currentSessionId = uuidv4();
      setSessionId(currentSessionId);
      localStorage.setItem('sessionId', currentSessionId);
    }

    // Fetch history using axiosClient
    axiosClient.get('/history', { params: { sessionId: currentSessionId } })
      .then(res => setMessages(res.data))
      .catch(err => console.error('History error:', err));

    // Connect socket
    socket.current = io(API_BASE_URL);
    socket.current.on('connect', () => console.log('Socket connected'));
    socket.current.on('connect_error', (err) => console.error('Socket error:', err));

    socket.current.on('sessionId', (id) => {
      setSessionId(id);
      localStorage.setItem('sessionId', id);
    });

    socket.current.on('response_chunk', ({ chunk }) => {
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last && last.role === 'assistant') {
          last.content += chunk;
          return [...prev.slice(0, -1), { ...last }];
        } else {
          return [...prev, { role: 'assistant', content: chunk }];
        }
      });
    });

    socket.current.on('response_end', () => {
      setIsTyping(false);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [sessionId]); // Re-run on sessionId change

  // Send message handler
  const sendMessage = (query) => {
    if (!query.trim()) return;
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    if (socket.current) {
      socket.current.emit('message', { sessionId, query });
      setInput('')
    }
    setIsTyping(true);
  };

  // Reset session handler using axiosClient
  const resetSession = () => {
    if (!sessionId) return;
    axiosClient.post(`/clear/${ sessionId }`)
      .then(() => {
        const newId = uuidv4();
        setSessionId(newId);
        localStorage.setItem('sessionId', newId);
        setMessages([]);
      })
      .catch(err => console.error('Clear error:', err));
  };

  return (
    <div className="chat-app">
      <div className="chat-container">
        <ChatHeader title="News Chatbot" onReset={resetSession} />
        <MessageList messages={messages} isTyping={isTyping} />
        <ChatInput value={input} onChange={setInput} onSend={sendMessage} />
      </div>
    </div>
  );
}

export default App;