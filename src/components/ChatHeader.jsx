import React from 'react';

const ChatHeader = ({ title, onReset }) => {
  return (
    <div className="chat-header">
      <h1 className="chat-title">{title}</h1>
      <button className="reset-button" onClick={onReset}>
        Reset Session
      </button>
    </div>
  );
};

export default ChatHeader;