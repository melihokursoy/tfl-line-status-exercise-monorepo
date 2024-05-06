import { getH1, getUl } from '../support/app.po';
import 'cypress-axe'

describe('line-status-app-e2e', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.tfl.gov.uk/Line/Mode/Tube/Status*', { fixture: "apiResponse.json" }).as('status');
    cy.visit('/')
    cy.injectAxe()
    cy.wait('@status')
  });

  it('should display title', () => {
    getH1().contains(/Status Updates/);
  });

  it('should display correct number of list items', () => {
    getUl().find('li').should('have.length', 11)
  });

  it('should display Bakerloo as first item', () => {
    getUl().find('li:first-child').contains('Bakerloo')
  });

  it('Has no detectable a11y violations on load (filtering to only include critical impact violations)', () => {
    // Test on initial load, only report and assert for critical impact items
    cy.checkA11y(null, {
      runOnly: {
        type: 'tag',
        values: ['wcag2aa']
      },
      includedImpacts: ['critical']
    })
  })

});
