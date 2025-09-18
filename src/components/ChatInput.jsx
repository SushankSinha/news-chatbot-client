import React from 'react';

const ChatInput = ({ value, onChange, onSend }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend(value);
    }
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about news..."
        className="input-field"
      />
      <button onClick={() => onSend(value)} className="send-button">
        Send
      </button>
    </div>
  );
};

export default ChatInput;