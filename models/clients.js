const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Client = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number
  },
  balance: {
    type: Number
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Clients', Client);
