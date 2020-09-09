const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: null
  },
  password: {
    type: String,
    default: null
  }
});

module.exports = model("Users", schema);
