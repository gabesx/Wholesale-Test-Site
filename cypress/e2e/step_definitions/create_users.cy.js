import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am logged in as admin', () => {
  cy.visit('/wp-login.php');
  cy.get('#user_login').type(Cypress.env('ADMIN_USERNAME'));
  cy.get('#user_pass').type(Cypress.env('ADMIN_PASSWORD'));
  cy.get('#wp-submit').click();
  cy.url().should('include', '/wp-admin');
});

When('I create users for all roles', () => {
  const roles = [
    'Shop manager',
    'Customer',
    'Subscriber',
    'Contributor',
    'Author',
    'Editor',
    'Administrator'
  ];
  roles.forEach(role => {
    cy.visit('/wp-admin/user-new.php');
    cy.createUserWithRole(role);
    cy.log(`User for role ${role} created successfully`);
  });
});

Cypress.Commands.add('createUserWithRole', (role) => {
  cy.visit('/wp-admin/user-new.php');
  cy.get('#user_login').clear().type(role);
  cy.get('#email').clear().type(`${role.replace(/\s+/g, '').toLowerCase()}@gmail.com`);
  cy.get('#first_name').clear().type(role);
  cy.get('#last_name').clear().type('test');
  cy.get('#pass1').clear().type('Pssw0rd123!');
  cy.get('body').then($body => {
    if ($body.find('#pass2:visible').length) {
      cy.get('#pass2').clear().type('Pssw0rd123!');
    }
  });
  cy.get('#role').select(role);
  cy.get('#createusersub').click();
  cy.contains('New user created.').should('exist');
});


