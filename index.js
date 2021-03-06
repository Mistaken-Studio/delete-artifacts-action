const core = require('@actions/core');
const github = require('@actions/github');
(async () => {
	try 
	{
		const leaveNewest = core.getInput('leaveNewest');
		const owner = github.context.repo.owner;
		const repo = github.context.repo.repo;
		const octokit = github.getOctokit(core.getInput("repo-token"));
		let artifacts = await octokit.actions.listArtifactsForRepo({repo: repo, owner: owner});
		if(artifacts.data.total_count == 0) 
		{
			console.log("Nothing to delete");
			return;
		}
		let latest = artifacts.data.artifacts[0];
		let latestDate = new Date(latest.created_at);
		if(leaveNewest) 
		{
			artifacts.data.artifacts.forEach(artifact => {
			let date = new Date(artifact.created_at);
			if(date > latestDate) 
			{
				latest = artifact;
				latestDate = date;
			}
			});
		}
		else 
			latest = null;
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

		console.log(`Done`);
	} 
	catch (error) 
	{
		core.setFailed(error.message);
	}
})();