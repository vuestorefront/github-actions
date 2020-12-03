import { CoverageConfig } from '../types'
import { inputFormatter } from './helpers'
import { exec } from '@actions/exec'
import { reporter } from './reporter'

const { execSync } = require('child_process')

export const coverage = async (config: CoverageConfig): Promise<string> => {
  const { command, token, report } = config
  try {
    const options: any = {}
    let output = ''
    options.listeners = {
      stdout: (data: Buffer) => {
        output += data.toString()
      },
    }
    await exec(`${command}`, [], options)
    const percentage = execSync('npx coverage-percentage ./coverage/lcov.info --lcov').toString()
    const percentageFormatted = parseFloat(percentage).toFixed(2)
    if (inputFormatter(token) && inputFormatter(report)) {
      await reporter({
        token,
        comment: `<p>Tests Coverage: <code>${percentageFormatted + '%'}</code></p>
<details><summary>Coverage report</summary>
<p>
<pre>${output}</pre>
</p>
</details>`,
      })
    }
    return percentageFormatted
  } catch (error) {
    throw Error(error)
  }
}
