const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://u9filzaclbn:iUYsHoiCHQS5W9j5@projektinf.xdxtl4u.mongodb.net/?retryWrites=true&w=majority&appName=projektinf', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

const messageSchema = new mongoose.Schema({
  message: String,
});

const Message = mongoose.model('Message', messageSchema);

app.post('/send', async (req, res) => {
  const { message } = req.body;

  try {
    const newMessage = new Message({ message });
    await newMessage.save();
    res.send({ status: 'Message received' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).send({ error: 'Error saving message' });
  }
});


app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find();
    res.send(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send({ error: 'Error fetching messages' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

app.delete('/messages', async (req, res) => {
  try {
    await Message.deleteMany();
    res.send({ status: 'All messages deleted successfully' });
  } catch (error) {
    console.error('Error deleting messages:', error);
    res.status(500).send({ error: 'Error deleting messages' });
  }
});