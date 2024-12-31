const problemList = require("../models/problemList");
const problemDescription = require("../models/problemDescription");
const startercode = require("../models/starterCode");
const fs = require("fs");
const util = require("util");
const { exec } = require("child_process");
const User = require("../models/user");

const execPromise = util.promisify(exec);
const path = require("path");
const baseDir = path.resolve(__dirname, "..");

async function executePy(req, res) {
  const body = req.body;
  const user_id = req.userId;
  const code = body.code;
  const problem_id = body.problem_id;
  const mode = body.mode;
  const language = body.language;

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
  const solution_filePath = path.join(baseDir, "solution", `solution.py`);
  const testcase_filePath = path.join(baseDir, "solution", "testcases.json");

  try {
    console.log("Starting execution process");

    // Copy test file
    const testCode = await fs.promises.readFile(sourceFilePath, "utf8");
    await fs.promises.writeFile(destinationFilePath, testCode);

    // Write starter code and append user solution
    const starterCode = await fs.promises.readFile(starterCodePath, "utf8");
    await fs.promises.writeFile(solution_filePath, starterCode + code);

    // Write test cases to testcases.json
    const problemData = await problemList.findOne({ id: problem_id });
    const testcases = JSON.stringify(problemData.testcase);
    await fs.promises.writeFile(testcase_filePath, testcases);
    console.log("Files prepared successfully");

    try {
      // Ensure any existing container is removed
      try {
        await execPromise(`docker rm -f coderunner_${user_id}`);
        console.log(`Removed existing container for user ${user_id}`);
      } catch (cleanupError) {
        // Ignore errors if container doesn't exist
        console.log("No existing container to clean up");
      }

      // Create the Docker container with unbuffered Python output
      await execPromise(
        `docker create --name coderunner_${user_id} -e PYTHONUNBUFFERED=1 codezen_python`
      );
      console.log(
        `Docker container coderunner_${user_id} created successfully`
      );

      // Copy files into the container
      await execPromise(
        `docker cp ${destinationFilePath} coderunner_${user_id}:/code/solution_test.py`
      );
      await execPromise(
        `docker cp ${solution_filePath} coderunner_${user_id}:/code/solution.py`
      );
      await execPromise(
        `docker cp ${testcase_filePath} coderunner_${user_id}:/code/testcases.json`
      );
      console.log("All files copied to container");

      // Start the Docker container and wait for it to complete
      await execPromise(`docker start --attach coderunner_${user_id}`);
      console.log("Container execution completed");

      // Fetch both stdout and stderr logs
      const { stdout, stderr } = await execPromise(
        `docker logs coderunner_${user_id}`
      );
      console.log("Docker stdout:", stdout);
      console.log("Docker stderr:", stderr);

      // // Check container status if no logs
      // if (!stdout && !stderr) {
      //   const { stdout: status } = await execPromise(
      //     `docker inspect -f '{{.State.Status}}' coderunner_${user_id}`
      //   );
      //   console.log("Container status:", status);
      // }

      const logs = stdout || stderr;

      // Process logs and handle results
      if (logs) {
        console.log("Processing logs:", logs);

        if (logs.startsWith(".\n--")) {
          if (mode === "submit") {
            await saveSubmission(req, problem_id, language, code, "Accepted");
          }
          return res.status(200).json({ success: true, stdout: "correct" });
        }

        if (logs.includes("AssertionError")) {
          const { testcase, expected, output } = parseAssertionError(logs);
          if (mode === "submit") {
            await saveSubmission(
              req,
              problem_id,
              language,
              code,
              "Wrong Answer"
            );
          }
          return res.status(301).json({
            success: false,
            errorType: "Assertion",
            testcase,
            expected,
            output,
          });
        }

        const errorDetails = parseExecutionError(logs);
        if (mode === "submit") {
          await saveSubmission(
            req,
            problem_id,
            language,
            code,
            "Execution Error"
          );
        }
        return res
          .status(301)
          .json({ success: false, errorType: "other", stdout: errorDetails });
      } else {
        console.log("No logs received from container");
        return res
          .status(500)
          .json({ success: false, error: "No output from container" });
      }
    } catch (error) {
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
          error.message.indexOf(
            "Output",
            error.message.indexOf("Output=>") + 1
          ) + 8;
        const result_end = error.message.indexOf(
          "!!!!!",
          error.message.indexOf("!!!!!") + 1
        );

        const testcase = error.message.substring(case_start, case_end);
        const expected = error.message.substring(actual_start, actual_end);
        const output = error.message.substring(result_start, result_end);

        if (mode === "submit") {
          await saveSubmission(req, problem_id, language, code, "Wrong Answer");
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

        if (mode === "submit") {
          await saveSubmission(
            req,
            problem_id,
            language,
            code,
            "Execution Error"
          );
        }

        return res
          .status(301)
          .json({ success: false, errorType: "other", stdout: message });
      }
    } finally {
      // Cleanup container
      try {
        await execPromise(`docker rm -f coderunner_${user_id}`);
        console.log(`Cleaned up container coderunner_${user_id}`);
      } catch (cleanupError) {
        console.error("Container cleanup error:", cleanupError);
      }
    }
  } catch (error) {
    console.error("Error in executePy:", error);

    if (error.message.includes("Test case exceeded time limit")) {
      return res
        .status(301)
        .json({ success: false, stdout: "Time Limit Exceeded" });
    }

    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}

async function saveSubmission(req, problem_id, language, code, status) {
  const problem = await problemList.findOne({ id: problem_id });
  const newSubmission = {
    problemId: problem.id,
    problemTitle: problem.title,
    Difficulty: problem.difficulty,
    status,
    language,
    date: new Date().toISOString(),
    code,
  };

  const user = await User.findById(req.userId);
  const existingSubmissionIndex = user.submissions.findIndex(
    (submission) => submission.problemId === newSubmission.problemId
  );

  if (existingSubmissionIndex !== -1) {
    user.submissions.splice(existingSubmissionIndex, 1);
  }

  user.submissions.push(newSubmission);

  if (existingSubmissionIndex === -1) {
    if (newSubmission.Difficulty === "Easy") {
      console.log("easy he");
      user.difficulty.easy += 1;
    } else if (newSubmission.Difficulty === "Medium") {
      console.log("medium he");
      user.difficulty.medium += 1;
    } else if (newSubmission.Difficulty === "Hard") {
      console.log("difficult he");
      user.difficulty.hard += 1;
    } else {
      console.log(newSubmission.Difficulty);
    }
    console.log("After update:", user.difficulty);
    // Mark the difficulty field as modified
    user.markModified("difficulty");
  }

  await user.save();
}

function parseAssertionError(logs) {
  const caseStart = logs.indexOf("case=>") + 6;
  const caseEnd = logs.indexOf("expected=>");
  const actualStart = logs.indexOf("expected=>") + 10;
  const actualEnd = logs.indexOf("Output");
  const resultStart = logs.indexOf("Output") + 8;
  const resultEnd = logs.indexOf("!!!!!");

  return {
    testcase: logs.substring(caseStart, caseEnd).trim(),
    expected: logs.substring(actualStart, actualEnd).trim(),
    output: logs.substring(resultStart, resultEnd).trim(),
  };
}

function parseExecutionError(logs) {
  const lines = logs.split("\n");
  const fileLineIndex = lines.findIndex((line) =>
    line.includes('File "/code/solution.py"')
  );

  if (fileLineIndex !== -1) {
    const fileLine = lines[fileLineIndex];
    const lineNumberMatch = fileLine.match(/line (\d+)/);
    const adjustedLineNumber = lineNumberMatch
      ? parseInt(lineNumberMatch[1]) - 6
      : null;
    const relevantLines = lines
      .slice(fileLineIndex + 1, fileLineIndex + 4)
      .join("\n");

    return adjustedLineNumber
      ? `line ${adjustedLineNumber}\n${relevantLines}`
      : relevantLines;
  }

  return logs;
}

module.exports = { executePy };
