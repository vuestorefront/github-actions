import { lighthouseCheck } from '@foo-software/lighthouse-check'
import { LightHouseConfig, LightHouseResult, LightHouseResponse } from '../types'
import { reporter } from './reporter'
import { inputFormatter } from './helpers'

const tablemark = require('tablemark')

// eslint-disable-next-line
export async function lighthouse(config: LightHouseConfig): Promise<LightHouseResult[] | Error> {
  const { urls, token, report, commentId } = config
  const check = await lighthouseCheck({
    urls: urls.split(','),
    emulatedFormFactor: 'all',
    verbose: false,
  })
  const { data, code, emulatedFormFactor }: LightHouseResponse = check
  if (code === 'SUCCESS') {
    if (inputFormatter(token) && inputFormatter(report)) {
      let reportTable = ''
      check.data.map((page, index) => {
        const { url, scores } = page
        return (reportTable += `|
| URL: ${url} / Agent: ${index % 2 === 0 ? 'Desktop' : 'Mobile'}
|        
${tablemark([scores])}`)
      })
      await reporter({
        token,
        comment: `<p>Lighthouse Audit: <code>Desktop, Mobile</code></p>
<details><summary>Performance report</summary>
<p>
<pre>${reportTable}</pre>
</p>
</details>`,
        commentId: inputFormatter(commentId)
      })
    }
    return data.map((page) => {
      const { url, scores } = page
      return {
        url,
        scores,
        type: emulatedFormFactor,
      }
    })
  } else {
    throw Error('vsf: Something went wrong')
  }
}
