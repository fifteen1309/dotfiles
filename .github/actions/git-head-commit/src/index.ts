import * as core from '@actions/core'
import * as github from '@actions/github'

const main = () => {
  try {
    const payload = github.context?.payload

    if (payload) {
      core.setOutput('author_email', payload.head_commit?.author?.email)
      core.setOutput('commit_id', payload.head_commit?.id)
      core.setOutput('message', payload.head_commit?.message)
      core.setOutput('timestamp', payload.head_commit?.timestamp)
      core.setOutput('url', payload.head_commit?.url)
      console.log('The event payload : ', JSON.stringify(payload))
      console.log('Author: ', payload.head_commit?.author?.email)

      return
    } else {
      throw Error('Commit fail')
    }
  } catch (error: any) {
    console.log(error)

    core.setFailed(error.message)
  }
}

main()
