const core = require('@actions/core')
const github = require('@actions/github')

try {
  const nameToGreet = core.getInput('who-to-greet')
  console.log("Heelo ", nameToGreet)
  const time = (new Date()).toTimeString()
  core.setOutput('time', time)
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  
} catch (e: any) {
  core.setFailed(e.message)
}