import axios from 'axios';
import { useState } from 'react';

const SendMessage = () => {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    try {
      await axios.post('http://localhost:3000/send', { message });
      console.log('Message sent');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default SendMessage;
