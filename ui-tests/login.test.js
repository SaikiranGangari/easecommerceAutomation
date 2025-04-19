import { Selector, ClientFunction } from 'testcafe'

const getLocation = ClientFunction(() => window.location.href)

fixture`Login Test`.page`https://easecommerce.in/app/login`

test('Login and redirect to dashboard', async (t) => {
  // Define selectors
  const usernameInput = Selector('[data-test="login-username-input"]')
  const passwordInput = Selector('[data-test="login-password-input"]')
  const loginButton = Selector('[data-test="login-submit-button"]')

  // Perform login
  await t
    .typeText(usernameInput, 'demouser@easecommerce.in')
    .typeText(passwordInput, 'cE7iQPP^')
    .click(loginButton)

  // Verify redirected to correct dashboard URL
  await t
    .expect(getLocation())
    .eql(
      'https://easecommerce.in/app/admin/master/org',
      'User not redirected to the expected dashboard URL'
    )
})
