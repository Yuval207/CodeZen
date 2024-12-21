const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    ref: "problemList",
  },
  problemStatement: {
    type: String,
    required: true,
  },
  examples: {
    type: Array,
    required: true,
  },
  constraints: {
    type: Array,
    required: true,
  },
  testcase: {
    type: Array,
    default: [],
  },
  filepath: {
    type: String,
    required: true,
  },
});

const problemDescription = mongoose.model("problemDescription", schema);

module.exports = problemDescription;
