const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit, App, Action } = require("octokit");
(async () => {
  try 
  {
    console.log(core);
    const leaveNewest = core.getInput('leaveNewest');
    const owner = github.context.repo.owner;
    const repo = github.context.repo.repo;
    console.log(`leaveNewest: ${leaveNewest}!`);
    const octokit = github.getOctokit(repo);
    let artifacts = await octokit.actions.listArtifactsForRepo({repo: repo, owner: owner});
    if(artifacts.data.total_count == 0) {
      console.log("Nothing to delete");
      return;
    }
    let latest = artifacts[0];
    artifacts.data.artifacts.forEach(artifact => {
      if(new Date(artifact.created_at) > new Date(latest.created_at)) latest = artifact;
    });
    artifacts.data.artifacts.forEach(async artifact => {
      if(latest == artifact) return;
      console.log(`Deleting ${artifact.id}`);
      try 
      {
        await octokit.actions.deleteArtifact({repo: repo, owner: owner, artifact_id: artifact.id});
      } 
      catch (error) 
      {
        core.setFailed(error.message);
      }
      console.log(`Deleted ${artifact.id}`);
    });
  } 
  catch (error) 
  {
    core.setFailed(error.message);
  }
})();