const problemList = require("../models/problemList");
// const { exec } = require("child_process");
const problemDescription = require("../models/problemDescription");
const fs = require("fs");
const docker_delete = require("../utils/docker_delete");
const util = require("util");
const { exec } = require("child_process");

const execPromise = util.promisify(exec);
const path = require("path");
const baseDir = path.resolve(__dirname, "..");

const handleGetProblemList = async (req, res) => {
  const data = await problemList.find({});
  res.send(data);
};

const handleGenerateProblemList = async (req, res) => {
  const body = req.body;
  await problemList
    .create({
      status: body.status,
      title: body.title,
      topics: body.topics,
      difficulty: body.difficulty,
    })
    .then(() => {
      console.log("data created");
      return res.json({ message: "Data created :)" });
    })
    .catch((err) => {
      console.log("data creation error: ", err);
      return res.status(500).json({ error: "Internal Servor error!" });
    });
};

const handleGetProblemDesc = async (req, res) => {
  const id = req.params.id;
  const data = await problemDescription.findOne({ id: id });
  res.send(data);
};

const handleGenerateProblemDesc = async (req, res) => {
  const body = req.body;
  await problemDescription
    .create({
      id: body.id,
      problemStatement: body.problemStatement,
      examples: body.examples,
      constraints: body.constraints,
    })
    .then(() => {
      console.log("data created");
      return res.json({ message: "Data created :)" });
    })
    .catch((err) => {
      console.log("data creation error: ", err);
      return res.status(500).json({ error: "Internal Server error!" });
    });
};

async function executePy(req, res) {
  const body = req.body;
  const user_id = body.user_id;
  const code = body.code;
  const problem_id = body.problem_id;

  //Code copying
  const sourceFilePath = path.join(
    baseDir,
    "problems",
    `${problem_id}_test.py`
  );

  const starterCodePath = path.join(
    baseDir,
    "problems",
    "starter_code.py"
  );

  const destinationFilePath = path.join(
    baseDir,
    "solution",
    "solution_test.py"
  );

  fs.readFile(sourceFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    fs.writeFile(destinationFilePath, data, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Test code copied successfully");
    });
  });

  
  const solution_filePath = path.join(baseDir, "solution", "solution.py");
  //writing starter code first and then appending the solution code
  fs.readFile(starterCodePath, "utf8", (err, starter_code) => {
    if (err) {
      console.error(err);
      return;
    }

    fs.writeFile(solution_filePath, starter_code, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Starter code written successfully!");

      fs.appendFile(solution_filePath, code, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Solution code written successfully!");
      });
    });
  });

  fs.writeFile(solution_filePath, code, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Solution code written successfully!");
  });

  //writing testcases into testcases.json from database
  const testcase_filePath = path.join(baseDir, "solution", "testcases.json");
  let problem_data = await problemDescription.findOne({ id: problem_id })

  let testcases = JSON.stringify(problem_data.testcase)
  fs.writeFile(testcase_filePath, testcases, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Testcases written successfully!");
  });

  // Build Docker image
  try {
    await execPromise(`docker build -t coderunner_${user_id} .`);
    console.log("container built");
  } catch (error) {
    console.log("error in build: ", error);
    return res.status(500).send("Internal Server Error");
  }

  // Run Docker container
  try {
    const run = await execPromise(
      `docker run --name coderunner_${user_id} coderunner_${user_id}`
    );
    console.log("container ran");

    const logs = await execPromise(
      `docker logs coderunner_${user_id}`
    );

    console.log("container logs fetched");

    // Delete Docker container
    docker_delete(user_id);
    if (logs) {
      console.log("logs: ", logs.stderr);
      if (logs.stderr.startsWith(".\n--")) {
        console.log("here too");
        return res.status(200).json({ success: true, stdout: "correct" });
      }
    }
  } catch (error) {
    docker_delete(user_id);
    console.log("error in run: \n\n\n", error.message);
    if (error.message.includes("Test case exceeded time limit")) {
      return res
        .status(301)
        .json({ success: false, stdout: "Time Limit Exceeded" });
    } else if (error.message.includes("AssertionError")) {
      const case_start =
        error.message.indexOf("case=>", error.message.indexOf("case=>") + 1) + 6;
      const case_end = error.message.indexOf(
        "expected=>",
        error.message.indexOf("expected=>") + 1
      );

      const actual_start =
        error.message.indexOf(
          "expected=>",
          error.message.indexOf("expected=>") + 1
        ) + 10;
      const actual_end = error.message.indexOf(
        "Output",
        error.message.indexOf("Output") + 1
      );

      const result_start =
        error.message.indexOf("Output", error.message.indexOf("Output=>") + 1) + 8;
      const result_end = error.message.indexOf(
        "!!!!!",
        error.message.indexOf("!!!!!") + 1
      );

      const testcase = error.message.substring(case_start, case_end);
      const expected = error.message.substring(actual_start, actual_end);
      const output = error.message.substring(result_start, result_end);

      return res.status(301).json({
        success: false,
        errorType: "Assertion",
        testcase,
        expected,
        output,
      });
    } else {
      const startsFrom = error.message.indexOf(`File "/meetcode/Solution.py"`);

      const startsEnd =
        error.message.indexOf(
          `-----`,
          error.message.indexOf("Traceback") + 1
        ) === -1
          ? error.message.length
          : error.message.indexOf(
              `-------`,
              error.message.indexOf("Traceback") + 1
            );

      const message = error.message.substring(startsFrom, startsEnd);
      console.log(message);
      return res.status(301).json({ success: false, stdout: message });
    }
  }
}

const testcase_temp = async (req, res) => {
  const body = req.body;
  await problemDescription
    .updateOne(
      { _id: body.id },
      {
        testcase: body.testcase,
      }
    )
    .then(() => {
      console.log("data updated");
      return res.json({ message: "Data updated :)" });
    })
    .catch((err) => {
      console.log("data creation error: ", err);
      return res.status(500).json({ error: "Internal Servor error!" });
    });
};

const getCode = async (req, res) => {
  const id = req.params.id;
  const problem = await problemDescription.findOne({
    id: id,
  });
  return new Promise((resolve, reject) => {
    fs.readFile(problem.filepath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return res.json({ error: err });
      }
      resolve(data);
      return res.json({ data });
    });
  });
};

module.exports = {
  handleGetProblemList,
  handleGenerateProblemList,
  handleGenerateProblemDesc,
  handleGetProblemDesc,
  executePy,
  testcase_temp,
  getCode,
};
