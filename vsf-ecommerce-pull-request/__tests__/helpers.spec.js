import { inputFormatter } from '../lib/index.cjs.js'
import { describe } from '@jest/globals'

describe('Formatter', () => {
  test('It formats data', () => {
    const mock = jest.fn(inputFormatter(''))
    expect(mock()).toBe(undefined)
  })
})
