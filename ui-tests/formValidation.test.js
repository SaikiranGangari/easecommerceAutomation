import { Selector } from 'testcafe'

fixture`Task Form Validation`.page`https://easecommerce.in/app/login`

test('Prevent task submission when required fields are missing', async (t) => {
  // Login
  await t
    .typeText('[data-test="login-username-input"]', 'demouser@easecommerce.in')
    .typeText('[data-test="login-password-input"]', 'cE7iQPP^')
    .click(Selector('[data-test="login-submit-button"]'))
    .wait(3000)

  // Switch to Employee View
  await t
    .click(Selector('button[aria-label="Open Settings"]'))
    .click(Selector('p').withText('Switch to Employee'))
    .wait(2000)

  // Click Add Task
  await t.click(Selector('button').withText('Add Task'))

  // Only enter description, leave required fields empty
  await t.typeText(
    Selector('.ql-editor'),
    'Just a description, no other fields filled'
  )

  // Identify the submit button
  const submitButton = Selector('button[type="submit"]').withText('Submit')

  // Assert that the submit button is disabled or does not trigger confirmation
  await t
    .click(submitButton)
    .expect(Selector('h2').withText('Are you sure?').exists)
    .notOk('Submit should not work when required fields are missing')
})
