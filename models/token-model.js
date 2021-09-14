const { Schema, model } = require('mongoose');

const schema = new Schema({
  refreshToken: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = model('Token', schema);
