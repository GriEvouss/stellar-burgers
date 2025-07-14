describe('Header', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display navigation links', () => {
    cy.get('header').within(() => {
      cy.get('a').should('have.length.at.least', 3);
      cy.contains('Конструктор').should('be.visible');
      cy.contains('Лента заказов').should('be.visible');
      cy.contains('Личный кабинет').should('be.visible');
    });
  });

  it('should navigate to constructor page', () => {
    cy.contains('Конструктор').click();
    cy.url().should('include', '/');
  });

  it('should navigate to feed page', () => {
    cy.contains('Лента заказов').click();
    cy.url().should('include', '/feed');
  });

  it('should navigate to profile page', () => {
    cy.contains('Личный кабинет').click();
    cy.url().should('include', '/profile');
  });
}); 