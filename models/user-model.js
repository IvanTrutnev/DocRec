const { Schema, model } = require('mongoose');

const schema = new Schema({
  username: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

module.exports = model('User', schema);
