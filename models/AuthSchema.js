const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Auth", AuthSchema);
