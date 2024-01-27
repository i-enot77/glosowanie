const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  useremail: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Vote", voteSchema);
