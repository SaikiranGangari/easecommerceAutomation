import { Selector } from 'testcafe'

fixture`Switch to Employee View`.page`https://easecommerce.in/app/login`

test('Switch to employee view and verify Task section', async (t) => {
  // Define selectors
  const usernameInput = Selector('[data-test="login-username-input"]')
  const passwordInput = Selector('[data-test="login-password-input"]')
  const loginButton = Selector('[data-test="login-submit-button"]')

  // Perform login
  await t
    .typeText(usernameInput, 'demouser@easecommerce.in')
    .typeText(passwordInput, 'cE7iQPP^')
    .click(loginButton)

  // Wait for the dashboard to load
  await t.wait(3000)

  // Click the three-dot "Settings" button (use aria-label)
  const settingsButton = Selector('button[aria-label="Open Settings"]')
  await t.click(settingsButton)

  // Click on "Switch to Employee" menu option
  const switchToEmployeeOption = Selector('p').withText('Switch to Employee')
  await t.click(switchToEmployeeOption)

  // Wait for the Employee view to load
  await t.wait(3000)

  // Verify that the Task Section is visible (based on heading text "Tasks")
  const taskSectionHeader = Selector('p').withText('Tasks')
  await t
    .expect(taskSectionHeader.exists)
    .ok('Task Section not visible after switching to Employee View')
})
