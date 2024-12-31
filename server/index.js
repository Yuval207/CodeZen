const express = require("express");
const app = express();
const router = require("./routes/router.js");
const connectDB = require("./config/dbConnection.js");
const cors = require("cors");
const session = require("express-session");
const PORT = 3000;
require("dotenv").config();

connectDB("mongodb://localhost:27017/CodeZen");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your client's URL
    credentials: true, // Allow credentials (cookies/sessions) to be sent
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    },
  })
);
app.use("/", router);

app.listen(PORT, () => {
  console.log("server started");
});
