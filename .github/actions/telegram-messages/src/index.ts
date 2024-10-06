import * as core from '@actions/core'
import axios from 'axios'

const main = async () => {
  try {
    const author = core.getInput('author_commit')
    const commitId = core.getInput('commit_id')
    const message = core.getInput('message')
    const timestamp = core.getInput('timestamp')
    const url = core.getInput('url')
    const botToken = core.getInput('bot_token')
    const groupId = core.getInput('group_id')
    const previousStepResult = core.getInput('previous_step_result')
    const stage = core.getInput('stage')
    const projectName = core.getInput('project_name')

    console.log(stage, projectName)

    const notiMessage =
      previousStepResult === 'success'
        ? `🟢 Project: ${projectName}\n✅ PASSING ${stage} build success \n▪️ Status: \n${previousStepResult}\n▪️ Author\n${author}\n▪️ Build\n${commitId}\n▪️ API Endpoint\n${url}\n▪️ Changelog\n${message}\n▪️ Timestamp\n${new Date(timestamp)}`
        : `🔴 Project: ${projectName}\n❌ PASSING ${stage} build failed \n▪️ Status: \n${previousStepResult}\n▪️ Author\n${author}\n▪️ Build\n${commitId}\n▪️ API Endpoint\n${url}\n▪️ Changelog\n${message}\n▪️ Timestamp\n${new Date(timestamp)}`
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
