import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the login page', () => {
  cy.visit('/');
  cy.get('.wc-block-customer-account__account-icon').click();
});

When('I enter valid credentials', () => {
  cy.get('input[name="username"]').type(Cypress.env('USERNAME'));
  cy.get('input[name="password"]').type(Cypress.env('PASSWORD'));
  cy.get('button[type="submit"]').click();
});

When('I enter invalid credentials', () => {
  cy.get('input[name="username"]').type('invalid_user');
  cy.get('input[name="password"]').type('wrong_password');
  cy.get('button[type="submit"]').click();
});

When('I log in as {string} to Wholesale Test Site', (role) => {
  const roleKey = role.replace(/\s+/g, '_').toUpperCase();
  const username = Cypress.env(`${roleKey}_USERNAME`);
  const password = Cypress.env(`${roleKey}_PASSWORD`);
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

When('I log out', () => {
  cy.visit('/');
  cy.visit('/?page_id=10');
  cy.contains('Log out').click();
  cy.get('.woocommerce-form-login', { timeout: 10000 }).should('be.visible');
});

Then('I should be logged in successfully', () => {
  cy.url().should('include', '/?page_id=10');
});

Then('I should see an error message', () => {
  cy.get('.wc-block-components-notice-banner__content')
    .should('be.visible')
    .invoke('text')
    .then((text) => {
      cy.log('Error message text:', text);
      expect(
        text.includes('not registered on this site') ||
        text.includes('incorrect')
      ).to.be.true;
    });
}); 