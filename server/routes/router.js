const express = require("express");
const router = express.Router();
const {
  handleGetProblemList,
  handleGetProblem,
  handleGenerateProblemList,
  handleGenerateProblemDesc,
  handleGetProblemDesc,
  // executePy,
  testcase_temp,
  getCode,
  signIn,
  signUp,
  logout,
  getUserData,
} = require("../controller/controllers.js");
const { executePy } = require("../controller/executepy.js");
const { checkLoggedIn, protectedRoute } = require("../middleware/auth.js");

router.route("/").post(handleGenerateProblemList);
router.route("/problemlist").get(handleGetProblemList);

router.route("/problemdescription").post(handleGenerateProblemDesc);
router.route("/problem/:id").get(handleGetProblem);
// router.route("/runprogrampy").post(executePy);
router.post("/runprogrampy", protectedRoute, executePy);
router.route("/testcase").put(testcase_temp);
// router.route("/code/:id").get(getCode);
router.get("/code/:id", protectedRoute, getCode);
router.post("/signup", checkLoggedIn, signUp);
router.post("/signin", checkLoggedIn, signIn);
router.post("/logout", protectedRoute, logout);
router.get("/user", protectedRoute, getUserData);

module.exports = router;
