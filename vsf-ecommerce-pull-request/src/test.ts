import { exec } from '@actions/exec'
import { TestConfig } from '../types'

export const test = async (config: TestConfig): Promise<number> => {
  const { command } = config
  try {
    return await exec(command || 'yarn test --coverage --passWithNoTests --forceExit')
  } catch (error) {
    throw Error(error)
  }
}
