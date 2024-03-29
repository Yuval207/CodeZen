const express = require("express");
const app = express();
const router = require("./routes/router.js");
const connectDB = require("./config/dbConnection.js");
const cors = require("cors");

const PORT = 3000;

connectDB("mongodb://localhost:27017/CodeZen");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", router);

app.listen(PORT, () => {
  console.log("server started");
});
