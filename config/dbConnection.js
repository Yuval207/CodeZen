const mongoose = require("mongoose");

const connectDB = async (DATABASE_URL) => {
  await mongoose
    .connect(DATABASE_URL)
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log("DB connection error: ", err);
    });
};

module.exports = connectDB;
