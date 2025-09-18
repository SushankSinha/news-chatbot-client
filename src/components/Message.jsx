import React from 'react';

const Message = ({ message }) => {
  return (
    <div className={`message ${message.role}`}>
      <span className="message-content">{message.content}</span>
    </div>
  );
};

export default Message;