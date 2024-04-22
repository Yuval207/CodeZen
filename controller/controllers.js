const problemList = require("../models/problemList");
// const { exec } = require("child_process");
const problemDescription = require("../models/problemDescription");
const fs = require("fs");
const docker_delete = require("../utils/docker_delete");
const util = require("util");
const { exec } = require("child_process");
const { log } = require("console");
const execPromise = util.promisify(exec);

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
  console.log(id);
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
    return res.status(200).json({ error: run.stdout });
  } catch (error) {
    console.log("error in run: ", error);
    return res.status(500).send("Internal Server Error");
  }
}

// const executePy = async (req, res) => {
//   const body = req.body;
//   const user_id = body.user_id;

//   // Build the Docker image
//   const { error, stdout, stderr } = await execPromise(
//     `docker build -t coderunner_${user_id} .`
//   );
//   if (error || stderr) {
//     return res.status(500).json({
//       command: "build error",
//       error: error ? error.message : "",
//       stderr: stderr || "",
//     });

//   }
//   exec(`docker build -t coderunner_${user_id} .`, (error, stderr, stdout) => {
//     if (error || stderr) {
//       return res.status(500).json({
//         command: "build error",
//         error: error ? error.message : "",
//         stderr: stderr || "",
//       });
//     }

//     // Run the Docker container
//     exec(
//       `docker run --name coderunner_${user_id} coderunner_${user_id}`,
//       (runError, runStderr, runStdout) => {
//         if (runError) {
//           return res.status(500).json({
//             command: "run error",
//             error: runError.message,
//             stderr: runStderr,
//           });
//         }

//         // Get logs from the container
//         exec(
//           `docker logs coderunner_${user_id}`,
//           (logsError, logsStderr, logsStdout) => {
//             if (logsError) {
//               return res.status(500).json({
//                 command: "logging error",
//                 error: logsError.message,
//                 stderr: logsStderr,
//               });
//             }
//             // Return the logs
//             docker_delete(user_id, req, res);

//             res.status(200).json({ stderr: logsStderr });
//             return;
//           }
//         );
//       }
//     );
//   });
// };

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
  // console.log(id);
  const problem = await problemDescription.findOne({
    id: id,
  });
  console.log(problem);
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
