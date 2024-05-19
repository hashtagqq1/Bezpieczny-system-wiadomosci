import React, { useState } from 'react';
import Person from './Person';
import axios from 'axios';

const App = () => {
  const [messages, setMessages] = useState([]);

  const handleDeleteAllMessages = async () => {
    try {
      await axios.delete('http://localhost:3000/messages');
      setMessages([]);
    } catch (error) {
      console.error('Error deleting messages:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDeleteAllMessages}>Delete All Messages</button>
      <Person personName="A" messages={messages} setMessages={setMessages} />
      <Person personName="B" messages={messages} setMessages={setMessages} />
    </div>
  );
};

export default App;
