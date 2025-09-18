import React, { useRef, useEffect } from 'react';
import Message from './Message';

const MessageList = ({ messages, isTyping }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.map((msg, idx) => (
        <Message key={idx} message={msg} />
      ))}
      {isTyping && <div className="typing-indicator">Typing...</div>}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;