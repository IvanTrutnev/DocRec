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
});

module.exports = model('Users', schema);
