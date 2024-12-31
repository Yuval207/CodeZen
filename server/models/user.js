const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  links: {
    type: Object,
    default: {},
  },
  profilephoto: {
    data: {
      type: Buffer,
      default: null,
    },
    contentType: {
      type: String,
      default: null,
    },
  },
  bookmarks: {
    type: Array,
    default: [],
  },
  submissions: {
    type: Array,
    default: [],
  },
  difficulty: {
    type: Object,
    required: true,
    default: { easy: 0, medium: 0, hard: 0 },
  },
  dailyStreak: {
    type: Number,
    default: 0,
  },
});

const user = mongoose.model("userdata", schema);

module.exports = user;
