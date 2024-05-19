import React from 'react';
import SendMessage from './sendMessage';
import ReciveMessages from './ReciveMessage'

const App = () => {
  return (
    <div>
      <h1>Secure Messaging App</h1>
      <SendMessage />
      <ReciveMessages />
    </div>
  );
};

export default App;
