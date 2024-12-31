const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  cpp: {
    type: String,
    required: true,
  },
  python: {
    type: String,
    required: true,
  },
  javascript: {
    type: String,
    required: true,
  },
});

const starterCode = mongoose.model("starter_code", schema);

module.exports = starterCode;
