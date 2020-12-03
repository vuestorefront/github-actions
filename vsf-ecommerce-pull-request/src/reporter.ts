import { context, getOctokit } from '@actions/github'
import { ReporterConfig } from '../types'

export const reporter = async (config: ReporterConfig) => {
  const { token, comment } = config
  const { repo, owner } = context.repo
  const client = getOctokit(token)
  const commit = await client.repos.listPullRequestsAssociatedWithCommit({
    repo: repo,
    owner: owner,
    commit_sha: context.sha,
  })
  const { number } = commit.data[0]
  await client.issues.createComment({
    repo: repo,
    owner: owner,
    body: comment,
    issue_number: number,
  } as any)
}
