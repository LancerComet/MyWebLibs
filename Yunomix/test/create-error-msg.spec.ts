/* eslint-disable no-undef */

import { createErrorMsgFactory } from '../lib/validators'

it('createMsg should work properly.', () => {
  const defaultMsg = 'Default message'
  expect(createErrorMsgFactory(defaultMsg)()).toBe(defaultMsg)
  expect(createErrorMsgFactory(defaultMsg, 'My message')()).toBe('My message')
  expect(createErrorMsgFactory(defaultMsg, () => 'Wow such a message')()).toBe('Wow such a message')
})
