const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


let messages = [];


app.post('/send', (req, res) => {
  const { message } = req.body;
  messages.push(message);
  res.send({ status: 'Message received' });
});

app.get('/messages', (req, res) => {
  res.send(messages);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
