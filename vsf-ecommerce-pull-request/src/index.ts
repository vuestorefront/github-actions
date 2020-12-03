import * as core from '@actions/core'

import { lighthouse } from './lighthouse'
import { coverage } from './coverage'
import { test } from './test'

import { inputFormatter } from './helpers'
;(async () => {
  try {
    const lighthouseCheck = await lighthouse({
      urls: core.getInput('lighthouse_urls'),
      token: core.getInput('github_token'),
      report: core.getInput('lighthouse_report'),
    })
    core.setOutput(`Lighthouse Check Results (desktop, mobile)`, JSON.stringify(lighthouseCheck))
    if (!inputFormatter(core.getInput('test_disabled'))) {
      await test({
        command: core.getInput('test_command'),
      })
      const coverageCheck = await coverage({
        command: core.getInput('test_command'),
        token: core.getInput('github_token'),
        report: core.getInput('test_report'),
      })
      core.setOutput('Coverage Check Results', coverageCheck.toString())
      if (Number(coverageCheck) < Number(core.getInput('test_failed'))) {
        return Error('Tests Coverage is too Low')
      }
    }
  } catch (error) {
    return core.setFailed(error)
  }
})()

export { inputFormatter }
