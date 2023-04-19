describe('client', () => {
  beforeEach(() => cy.visit('/'));

  it('should display the address input', () => {
    cy.get('[data-cy="address-input"').should('be.visible');
  });

  it('should display address in both hex and bech32', () => {
    cy.get('[data-cy="address-input"]').type('0xf1829676DB577682E944fc3493d451B67Ff3E29F');
    cy.get('input[type=submit]').click();
    cy.get('[data-cy="hex-address"]').contains('0xf1829676DB577682E944fc3493d451B67Ff3E29F');
    cy.get('[data-cy="bech32-address"]').contains('evmos17xpfvakm2amg962yls6f84z3kell8c5ljcjw34');
  });

  it('should list tokens', () => {
    cy.get('li').should('have.length.above', 10);
  });
});
