export const inputFormatter = (input: string): boolean | string | undefined => {
  if (input === 'true') return true
  if (input === 'false') return false
  if (input === '') return undefined
  return input
}
