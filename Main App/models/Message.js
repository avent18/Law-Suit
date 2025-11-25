const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  lawyerName: String,
  lawyerEmail: String,
  userName: String,
  userEmail: String,
  content: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);
