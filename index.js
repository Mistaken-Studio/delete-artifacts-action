const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit, App, Action } = require("octokit");
(async () => {
try 
{
  console.log(core);
  const leaveNewest = core.getInput('leaveNewest');
  const owner = core.getInput('owner');
  const repo = core.getInput('repo');
  console.log(`leaveNewest: ${leaveNewest}!`);
  const octokit = github.getOctokit();
  request.get(`https://api.github.com/repos/${owner}/${repo}/actions/artifacts`, {
    headers: {
      'User-Agent': 'request'
    }
  }, (error, response, body) => {
    if(error) return core.setFailed(error);
    console.log(body);
  });
} 
catch (error) 
{
  core.setFailed(error.message);
}
})();