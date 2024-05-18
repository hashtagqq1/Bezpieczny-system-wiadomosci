import React from 'react';
import SendMessage from './sendMessage';
import ReceiveMessages from './ReciveMessage'

const App = () => {
  return (
    <div>
      <h1>Secure Messaging App</h1>
      <SendMessage />
      <ReceiveMessages />
    </div>
  );
};

export default App;
