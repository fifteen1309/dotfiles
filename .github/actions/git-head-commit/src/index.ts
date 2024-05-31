import core from '@actions/core'
import github from '@actions/github'

const main = () => {
  try {
    const payload = github.context.payload
    console.log({ payload })

    if (payload) {
      core.setOutput('author_email', payload.head_commit?.author?.email)
      core.setOutput('commit_id', payload.head_commit?.id)
      core.setOutput('message', payload.head_commit?.message)
      core.setOutput('timestamp', payload.head_commit?.timestamp)
      core.setOutput('url', payload.head_commit?.url)
      console.log('The event payload : ', JSON.stringify(payload))
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
