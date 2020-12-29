import { context, getOctokit } from '@actions/github'
import { ReporterConfig } from '../types'

export const reporter = async (config: ReporterConfig) => {
  const { token, comment, commentId } = config
  const { repo, owner } = context.repo
  const client = getOctokit(token)
  const commit = await client.repos.listPullRequestsAssociatedWithCommit({
    repo: repo,
    owner: owner,
    commit_sha: context.sha,
  })
  const { number, labels } = commit.data[0]
  const reportDisabled = labels.find((label) => label.name === 'report:off' || label.name === 'report:disabled')
  if (!reportDisabled) {
    const commentObject = {
      repo,
      owner,
      body: comment,
      issue_number: number,
    }
    await commentId ?
      client.issues.updateComment({ ...commentObject, comment_id: commentId } as any) :
      client.issues.createComment(commentObject as any)
  }
}
