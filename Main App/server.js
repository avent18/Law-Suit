const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const User = require('./models/User');
const Message = require('./models/Message');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB (single connection only)
mongoose.connect('mongodb://127.0.0.1:27017/lawchat', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// -----------------------------
// Messaging Routes
// -----------------------------

// Send message (client or lawyer)
app.post('/send-message', async (req, res) => {
  try {
    const { sender, senderEmail, receiverEmail, content } = req.body;
    const newMessage = new Message({ sender, senderEmail, receiverEmail, content });
    await newMessage.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Get messages between user and lawyer
app.get('/get-messages', async (req, res) => {
  try {
    const { userEmail, lawyerEmail } = req.query;
    const messages = await Message.find({
      $or: [
        { senderEmail: userEmail, receiverEmail: lawyerEmail },
        { senderEmail: lawyerEmail, receiverEmail: userEmail }
      ]
    }).sort({ timestamp: 1 });
    res.json({ success: true, messages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

// -----------------------------
// Auth Routes
// -----------------------------

// Register new user
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).send('Email already registered.');

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error during registration');
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).send('Invalid email');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('Invalid password');

    res.send('Login successful');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error during login');
  }
});

// -----------------------------
// Server Start
// -----------------------------

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
