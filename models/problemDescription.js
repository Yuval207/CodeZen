const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
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
});

const problemDescription = mongoose.model("problemDescription", schema);

module.exports = problemDescription;
