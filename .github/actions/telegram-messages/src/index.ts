import * as core from '@actions/core'
import axios from 'axios'

const main = async () => {
  try {
    const author = core.getInput('author_email')
    const commitId = core.getInput('commit_id')
    const message = core.getInput('message')
    const timestamp = core.getInput('timestamp')
    const url = core.getInput('url')
    const botToken = core.getInput('bot_token')
    const groupId = core.getInput('group_id')
    const previousStepResult = core.getInput('previous_step_result')

    const notiMessage =
      previousStepResult === 'success' ? 'Build successfully' : 'Build failed'
    await axios.post(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        chat_id: groupId,
        text: notiMessage,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error: any) {
    core.setFailed(error.message)
  }
}

main()
