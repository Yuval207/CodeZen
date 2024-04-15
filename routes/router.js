const express = require("express");
const router = express.Router();
const {
  handleGetProblemList,
  handleGenerateProblemList,
  handleGenerateProblemDesc,
  handleGetProblemDesc,
  executePy,
  testcase_temp,
} = require("../controller/controllers.js");

router.route("/").post(handleGenerateProblemList);
router.route("/problemlist").get(handleGetProblemList);

router.route("/problemdescription").post(handleGenerateProblemDesc);
router.route("/problemdescription/:id").get(handleGetProblemDesc);
router.route("/runprogramPy").post(executePy);
router.route("/testcase").post(testcase_temp);

module.exports = router;
