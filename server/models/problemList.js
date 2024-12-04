const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  topics: {
    type: Array,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
});

const db = mongoose.model("problemList", schema);

module.exports = db;
