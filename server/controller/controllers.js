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
      // testcase: body.testcase,
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

  //writing code from client
  const filePath = path.join(baseDir, "solution", "solution.py");

  fs.writeFile(filePath, code, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Solution code written successfully!");
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
    docker_delete(user_id);
    if (run.stdout) {
      return res.status(200).json({ output: run.stdout });
    }
  } catch (error) {
    console.log("error in run: \n\n\n", error);
    docker_delete(user_id);
    return res.status(500).send({ major_error: error.stderr });
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
