const { palindrome } = require('../utils/for_testing')

test.skip('palindrome of midudev', () => {
  const result = palindrome('hola')
  expect(result).toBe('aloh')
})

test.skip('palindrome of empty string', () => {
  const result = palindrome('')
  expect(result).toBe('')
})

test.skip('palindrome of undefined', () => {
  const result = palindrome()
  expect(result).toBeUndefined()
})
