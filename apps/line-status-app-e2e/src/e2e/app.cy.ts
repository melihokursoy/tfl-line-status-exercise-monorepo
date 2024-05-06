import { getH1, getUl } from '../support/app.po';
import 'cypress-axe'


describe('line-status-app-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should display title', () => {
    getH1().contains(/Status Updates/);
  });

  it('Has an accesible unorderd list', () => {
    getUl().contains(/Bakerloo/);
    cy.injectAxe()
    cy.checkA11y('ul');
  });

  it('Has an accesible heading', () => {
    getH1().contains(/Status Updates/);
    cy.injectAxe()
    cy.checkA11y('h1');
  });

});
