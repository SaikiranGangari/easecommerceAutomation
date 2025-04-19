import { Selector } from 'testcafe'

fixture`Task Form Invalid Input Validation`
  .page`https://easecommerce.in/app/login`

test('Form should not submit with missing required fields', async (t) => {
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
    .wait(3000)

  // Click Add Task
  const addTaskButton = Selector('button').withText('Add Task')
  await t.expect(addTaskButton.exists).ok({ timeout: 10000 })
  await t.click(addTaskButton)

  const taskNameInput = Selector('input[name="name"]')
  const descriptionEditor = Selector('.ql-editor')
  const submitButton = Selector('button[type="submit"]').withText('Submit')

  // Case 1: Missing Task Name
  await t
    .typeText(descriptionEditor, 'Only description present')
    .expect(submitButton.hasAttribute('disabled'))
    .ok('Submit should be disabled when task name is missing')

  // Refresh form
  await t.click(Selector('button').withText('Cancel'))
  await t.click(addTaskButton)

  // Case 2: Missing Description
  await t
    .typeText(taskNameInput, 'Only task name present')
    .expect(submitButton.hasAttribute('disabled'))
    .ok('Submit should be disabled when description is missing')

  // Refresh form again
  await t.click(Selector('button').withText('Cancel'))
  await t.click(addTaskButton)

  // Case 3: No dropdowns selected (if required)
  await t
    .typeText(taskNameInput, 'No dropdowns')
    .typeText(descriptionEditor, 'Description present')
    .expect(submitButton.hasAttribute('disabled'))
    .ok('Submit should be disabled when dropdowns are missing (if required)')
})
