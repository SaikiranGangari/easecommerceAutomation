import { Selector } from 'testcafe'

fixture`Task Creation with Unique Name & Random Dropdowns`
  .page`https://easecommerce.in/app/login`

test('Create new task with unique name and verify in task list', async (t) => {
  const taskName = `TestCafeTask-${Date.now()}`

  // Generate tomorrow's date in DD/MM/YYYY format
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)
  const formattedDate = tomorrow.toLocaleDateString('en-GB') // DD/MM/YYYY

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

  // Click Add Task button
  await t.click(Selector('button').withText('Add Task'))

  // Enter Task Name
  await t.typeText(Selector('input[name="name"]'), taskName)

  // Select first option from dropdowns
  const dropdowns = [
    'input[name="superCategory"]',
    'input[name="subCategory"]',
    'input[name="portals"]',
    'input[name="products"]',
    'input[name="assignedTo"]',
    'input[name="reviewer"]',
    'input[name="priority"]',
  ]

  for (const selector of dropdowns) {
    await t.click(Selector(selector)).pressKey('down enter').wait(500)
  }

  // Set due date and description
  await t
    .typeText(Selector('input[placeholder="DD/MM/YYYY"]'), formattedDate)
    .typeText(Selector('.ql-editor'), 'Automated test task creation.')

  // Submit the form
  await t.click(Selector('button[type="submit"]').withText('Submit'))

  // Confirm task creation
  await t
    .expect(Selector('h2').withText('Are you sure?').exists)
    .ok('Confirmation dialog not found')
    .click(Selector('button').withText('Yes, create it!'))

  // Wait for task list update
  await t.wait(4000)

  // Verify task in list
  await t
    .expect(Selector('p').withText(taskName).exists)
    .ok(`Task "${taskName}" not found in the task list`)
})
