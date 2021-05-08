const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit, App, Action } = require("octokit");

try 
{
  console.log(core);
  const leaveNewest = core.getInput('leaveNewest');
  const owner = core.getInput('owner');
  const repo = core.getInput('repo');
  console.log(`leaveNewest: ${leaveNewest}!`);
  // Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
  const octokit = new Octokit({ auth: `personal-access-token123` });

  // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
  const {
    data: { login },
  } = await octokit.users.getAuthenticated();
  console.log("Hello, %s", login);
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