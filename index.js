const core = require('@actions/core');
const github = require('@actions/github');
const request = require("request");

try {
  // `who-to-greet` input defined in action metadata file
  const leaveNewest = core.getInput('leaveNewest');
  const owner = core.getInput('owner');
  const repo = core.getInput('repo');
  console.log(`leaveNewest: ${leaveNewest}!`);
  request.get(`https://api.github.com/repos/${owner}/${repo}/actions/artifacts`, {}, (error, response, body) => {
    if(error) return core.setFailed(error);
    console.log(body);
  });
} catch (error) {
  core.setFailed(error.message);
}