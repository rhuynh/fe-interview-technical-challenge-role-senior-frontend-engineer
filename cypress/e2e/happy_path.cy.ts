/// <reference types="cypress" />

describe('happy path', () => {
  it('runs happy path successfully', () => {
    cy.visit('/');
    cy.getTestEl('table_link').should('be.visible');
    cy.getTestEl('you_go_link').should('be.visible');
    cy.getTestEl('policyholders_link').should('be.visible');

    /**
     * TODO: Challenge 10 - Update this test
     * - Click the Policyholders sidebar link
     * - Assert that a network request is made
     * - Assert that data from the network is displayed
     */
    cy.intercept('GET', '/api/policyholders').as('getPolicyHolders')
    cy.getTestEl('policyholders_link').click()
    
    cy.wait('@getPolicyHolders').its('response.statusCode').should('eq', 200)
    cy.getTestEl('policyholder-0').contains('Mrs. Holder')
    cy.getTestEl('policyholder-0').contains('29')
    cy.getTestEl('policyholder-0').contains('123 Lane Ave 3H 90405, CA')
    cy.getTestEl('policyholder-0').contains('1-989-989-9898')
    cy.getTestEl('policyholder-0').contains('Yes')
  });
});