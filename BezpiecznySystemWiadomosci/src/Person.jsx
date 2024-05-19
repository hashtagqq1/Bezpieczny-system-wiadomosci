import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const Person = ({ personName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [encryptionKey, setEncryptionKey] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleGenerateKey = () => {
    const key = Math.random().toString(36).substring(2, 15);
    setEncryptionKey(key);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const encryptedMessage = CryptoJS.AES.encrypt(newMessage, encryptionKey).toString();
      await axios.post('http://localhost:3000/send', { message: encryptedMessage });
      fetchMessages();
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleDeleteMessages = async () => {
    try {
      await axios.delete('http://localhost:3000/messages');
      setMessages([]);
    } catch (error) {
      console.error('Error deleting messages:', error);
    }
  };

  return (
    <div className="person">
      <h2>{`Person ${personName}`}</h2>
      <div className="chat">
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              {personName === 'A' || personName === 'B'
                ? (personName === 'A'
                  ? CryptoJS.AES.decrypt(message.message, encryptionKey).toString(CryptoJS.enc.Utf8)
                  : message.message)
                : message}
            </li>
          ))}
        </ul>
      </div>
      {(personName === 'A' || personName === 'B') && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Enter your message"
            className="message-input"
          />
          <button type="submit" className="message-button">Send</button>
        </form>
      )}
    </div>
  );
};

export default Person;
