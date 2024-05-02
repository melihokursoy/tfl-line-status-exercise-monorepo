import { getGreeting } from '../support/app.po';

describe('line-status-app-e2e', () => {
  beforeEach(() => cy.visit('/'));

  it('should display title', () => {

    getGreeting().contains(/Status Updates/);
  });
});
