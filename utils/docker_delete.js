const { exec } = require("child_process");

const docker_delete = (user_id) => {
  exec(`docker rm coderunner_${user_id}`, (error, stderr, stdout) => {
    if (error) {
      console.log("container deletion error\n");
      console.log({ error: error || "None" });
      console.log({ stderror: stderr || "None" });
    }
    console.log("container deleted");

    exec(`docker rmi coderunner_${user_id}`, (error, stderr, stdout) => {
      if (error) {
        console.log("image deletion error\n");
        console.log({ error: error || "None" });
        console.log({ stderror: stderr || "None" });
      }
      console.log("image deleted");
    });
  });
};

module.exports = docker_delete;
