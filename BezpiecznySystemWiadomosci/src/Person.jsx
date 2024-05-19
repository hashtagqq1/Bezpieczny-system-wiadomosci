import { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const Person = ({ name }) => {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/messages');
        if (response.data && response.data.length > 0) {
          const decryptedMessages = response.data.map((msg) => {
            return CryptoJS.AES.decrypt(msg, 'your_private_key').toString(CryptoJS.enc.Utf8);
          });
          setReceivedMessages(decryptedMessages);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (!message) return;

    const publicKeyB = 'public_key_of_person_B';

    const encryptedMessage = CryptoJS.AES.encrypt(message, publicKeyB).toString();

    try {
      await axios.post('http://localhost:3000/send', { message: encryptedMessage });
      console.log('Message sent successfully');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h2>{name}</h2>
      <div>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <div>
        <h3>Received Messages</h3>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Person;
