const express = require("express");
const app = express();
const router = require("./routes/router.js");
const connectDB = require("./config/dbConnection.js");
const cors = require("cors");

const PORT = 3000;
require("dotenv").config();

connectDB(process.env.DB_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/", router);

app.listen(PORT, () => {
  console.log("server started");
});
