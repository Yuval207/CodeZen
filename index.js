const express = require("express");
const app = express();
const router = require("./routes/router.js");
const connectDB = require("./config/dbConnection.js");
const cors = require("cors");
const { executePy } = require("./controller/controllers.js");

const PORT = 3000;

connectDB("mongodb://localhost:27017/CodeZen");
// const filepath =
//   "/Users/yuvalsharma/Desktop/webdev/CodeZen/backend/controller/testing.py";
// executePy(filepath)
//   .then((stdout) => {
//     console.log("Python script output:", stdout);
//   })
//   .catch((error) => {
//     console.error("Error executing Python script:", error);
//   });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", router);

app.listen(PORT, () => {
  console.log("server started");
});
