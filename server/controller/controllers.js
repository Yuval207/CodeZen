const problemList = require("../models/problemList");
// const { exec } = require("child_process");
const problemDescription = require("../models/problemDescription");
const startercode = require("../models/starterCode");
const fs = require("fs");
const docker_delete = require("../utils/docker_delete");
const util = require("util");
const { exec } = require("child_process");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const execPromise = util.promisify(exec);
const path = require("path");
const baseDir = path.resolve(__dirname, "..");

const handleGetProblemList = async (req, res) => {
  const data = await problemList.find({});
  res.send(data);
};

const handleGetProblem = async (req, res) => {
  const id = req.params.id;
  const data = await problemList.findOne({ id: id });
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
  const user_id = req.userId;
  const code = body.code;
  const problem_id = body.problem_id;
  const mode = body.mode;
  const language = body.language;

  //Code copying
  const sourceFilePath = path.join(
    baseDir,
    "problems",
    `${problem_id}_test.py`
  );

  const starterCodePath = path.join(baseDir, "problems", "starter_code.py");

  const destinationFilePath = path.join(
    baseDir,
    "solution",
    `solution_test_${problem_id}.py`
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

  const solution_filePath = path.join(baseDir, "solution", `solution.py`);
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
  let problem_data = await problemDescription.findOne({ id: problem_id });

  let testcases = JSON.stringify(problem_data.testcase);
  fs.writeFile(testcase_filePath, testcases, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Testcases written successfully!");
  });

  // Build Docker image
  try {
    await execPromise(`docker build -t coderunner_${req.userId} .`);
    console.log("container built");
  } catch (error) {
    console.log("error in build: ", error);
    return res.status(500).send("Internal Server Error");
  }

  // Run Docker container
  try {
    const run = await execPromise(
      `docker run --name coderunner_${req.userId} coderunner_${req.userId}`
    );
    console.log("container ran");

    const logs = await execPromise(`docker logs coderunner_${req.userId}`);

    console.log("container logs fetched");

    // Delete Docker container
    docker_delete(req.userId);
    if (logs) {
      console.log("logs: ", logs.stderr);
      if (logs.stderr.startsWith(".\n--")) {
        console.log("here too");
        if (mode == "submit") {
          const problem = await problemList.findOne({ id: problem_id });
          console.log("problem he", problem.title);

          // Create a new submission based on the problem details
          const newSubmission = {
            problemId: problem.id, // problemId corresponds to _id
            problemTitle: problem.title, // Assuming title is the problem title field
            Difficulty: problem.difficulty, // Assuming difficulty is a field in the problem
            status: "Accepted", // You can adjust the status based on your use case
            language: language, // You can choose the language as needed
            date: new Date().toISOString(), // Use current date for submission date
            code: code, // Placeholder code, replace as needed
          };

          // Update user data by appending to the `submissions` array and updating difficulty counters
          try {
            const user = await User.findById(req.userId); // Find user by ID

            // Check for an existing submission with the same problemId
            const existingSubmissionIndex = user.submissions.findIndex(
              (submission) => submission.problemId === newSubmission.problemId
            );

            // If an existing submission is found, remove it
            if (existingSubmissionIndex !== -1) {
              user.submissions.splice(existingSubmissionIndex, 1); // Remove the existing submission
            }

            // Append the new submission
            user.submissions.push(newSubmission);

            // If the problemId doesn't exist, update the difficulty counters
            if (existingSubmissionIndex === -1) {
              // Increment the difficulty counter based on the new submission's difficulty
              if (newSubmission.Difficulty === "Easy") {
                user.difficulty.easy += 1;
              } else if (newSubmission.Difficulty === "Medium") {
                user.difficulty.medium += 1;
              } else if (newSubmission.Difficulty === "Hard") {
                user.difficulty.hard += 1;
              }
            }

            await user.save();
          } catch (error) {
            console.log("Error updating user:", error);
          }
        }
        return res.status(200).json({ success: true, stdout: "correct" });
      }
    }
  } catch (error) {
    docker_delete(req.userId);
    console.log("error in run: \n\n\n", error.message);
    if (error.message.includes("Test case exceeded time limit")) {
      return res
        .status(301)
        .json({ success: false, stdout: "Time Limit Exceeded" });
    } else if (error.message.includes("AssertionError")) {
      const case_start =
        error.message.indexOf("case=>", error.message.indexOf("case=>") + 1) +
        6;
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
        error.message.indexOf("Output", error.message.indexOf("Output=>") + 1) +
        8;
      const result_end = error.message.indexOf(
        "!!!!!",
        error.message.indexOf("!!!!!") + 1
      );

      const testcase = error.message.substring(case_start, case_end);
      const expected = error.message.substring(actual_start, actual_end);
      const output = error.message.substring(result_start, result_end);

      if (mode == "submit") {
        const problem = await problemList.findOne({ id: problem_id });

        // Create a new submission based on the problem details
        const newSubmission = {
          problemId: problem.id, // problemId corresponds to _id
          problemTitle: problem.title, // Assuming title is the problem title field
          Difficulty: problem.difficulty, // Assuming difficulty is a field in the problem
          status: "Wrong Answer", // You can adjust the status based on your use case
          language: language, // You can choose the language as needed
          date: new Date().toISOString(), // Use current date for submission date
          code: code, // Placeholder code, replace as needed
        };

        // Update user data by appending to the `submissions` array and updating difficulty counters
        try {
          const user = await User.findById(req.userId); // Find user by ID

          // Check for an existing submission with the same problemId
          const existingSubmissionIndex = user.submissions.findIndex(
            (submission) => submission.problemId === newSubmission.problemId
          );

          // If an existing submission is found, remove it
          if (existingSubmissionIndex !== -1) {
            user.submissions.splice(existingSubmissionIndex, 1); // Remove the existing submission
          }

          user.submissions.push(newSubmission);
          // Save the updated user document
          await user.save();

          console.log("User data updated successfully!");
        } catch (error) {
          console.error("Error updating user:", error);
        }
      }

      return res.status(301).json({
        success: false,
        errorType: "Assertion",
        testcase,
        expected,
        output,
      });
    } else {
      const lines = error.message.split("\n");

      // Find the index of the line that contains 'File "/code/solution.py"'
      const fileLineIndex = lines.findIndex((line) =>
        line.includes('File "/code/solution.py"')
      );

      // Extract the line number and subtract 5
      const fileLine = lines[fileLineIndex];
      const lineNumberMatch = fileLine.match(/line (\d+)/); // Extract the line number
      const adjustedLineNumber = lineNumberMatch
        ? parseInt(lineNumberMatch[1]) - 6
        : null;

      // Collect the subsequent lines (e.g., code snippet and error message)
      const relevantLines = lines
        .slice(fileLineIndex + 1, fileLineIndex + 4)
        .join("\n"); // Adjust number of lines as needed

      // Construct the final output
      const message = adjustedLineNumber
        ? `line ${adjustedLineNumber}\n${relevantLines}`
        : relevantLines;

      console.log(message);

      // const startsFrom =
      //   error.message.indexOf(`File "/code/solution.py"`) +
      //   `File "/code/solution.py"`.length;

      // const startsEnd =
      //   error.message.indexOf(
      //     `-----`,
      //     error.message.indexOf("Traceback") + 1
      //   ) === -1
      //     ? error.message.length
      //     : error.message.indexOf(
      //         `-------`,
      //         error.message.indexOf("Traceback") + 1
      //       );

      // const message = error.message.substring(startsFrom, startsEnd);
      console.log(message);

      if (mode == "submit") {
        console.log("andar hu bilkul");

        const problem = await problemList.findOne({ id: problem_id });

        // Create a new submission based on the problem details
        const newSubmission = {
          problemId: problem.id, // problemId corresponds to _id
          problemTitle: problem.title, // Assuming title is the problem title field
          Difficulty: problem.difficulty, // Assuming difficulty is a field in the problem
          status: "Execution Error", // You can adjust the status based on your use case
          language: language, // You can choose the language as needed
          date: new Date().toISOString(), // Use current date for submission date
          code: code, // Placeholder code, replace as needed
        };

        // Update user data by appending to the `submissions` array and updating difficulty counters
        try {
          const user = await User.findById(req.userId); // Find user by ID

          // Check for an existing submission with the same problemId
          const existingSubmissionIndex = user.submissions.findIndex(
            (submission) => submission.problemId === newSubmission.problemId
          );

          // If an existing submission is found, remove it
          if (existingSubmissionIndex !== -1) {
            user.submissions.splice(existingSubmissionIndex, 1); // Remove the existing submission
          }

          user.submissions.push(newSubmission);

          // Save the updated user document
          await user.save();

          console.log("User data updated successfully!");
        } catch (error) {
          console.error("Error updating user:", error);
        }
      }

      return res
        .status(301)
        .json({ success: false, errorType: "other", stdout: message });
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
      return res.status(500).json({ error: "Internal Server error!" });
    });
};

const getCode = async (req, res) => {
  const id = req.params.id;
  const language = req.query.language;
  console.log(id, language);

  const user = await User.findById(req.userId);
  const existingSubmissionIndex = user.submissions.findIndex(
    (submission) => submission.problemId == id
  );

  // console.log("existing idx ", existingSubmissionIndex);

  if (existingSubmissionIndex != -1) {
    return res.json(user.submissions[existingSubmissionIndex]["code"]);
  }
  const problem = await startercode
    .findOne({ id: id })
    .then((problem) => {
      return res.json(problem[language]);
    })
    .catch((e) => {
      console.log("bund phati", e);

      return res.json("no code for the selected language");
    });
};

const signUp = async (req, res) => {
  const { username, email, name, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      name,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logout successful" });
  });
};

const getUserData = async (req, res) => {
  // The userId will already be available in req.userId from the protectedRoute middleware

  // console.log("andar hu");

  const { userId } = req;

  try {
    const user = await User.findById(userId).select("-password"); // Exclude the password from the response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user); // Return the user data
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  handleGetProblemList,
  handleGetProblem,
  handleGenerateProblemList,
  handleGenerateProblemDesc,
  handleGetProblemDesc,
  executePy,
  testcase_temp,
  getCode,
  signIn,
  signUp,
  logout,
  getUserData,
};
