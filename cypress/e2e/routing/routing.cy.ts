import { URL } from '@api';
import { deleteCookie, setCookie } from '../../../src/utils/cookie';

describe('Тесты роутинга', () => {
  beforeEach(() => {
    setCookie('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjBhMDAyOTdlZGUwMDAxZDA2MDg1NCIsImlhdCI6MTcxMjMxMDE2NiwiZXhwIjoxNzEyMzExMzY2fQ.v7kdecJvLfdmlBsvf_BySvsfnXX3K0Er__GNYw-NRLM');
    localStorage.setItem('refreshToken', '9cbdd5b777edfb92bd9183a7cf2372a12b545c045a9796f94c1afd0b9d374a8794aa15bee20a7556');
    cy.intercept('GET', `${URL}/auth/user`, { fixture: 'user.json' }).as('getUser');
  });

  afterEach(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('Тест перехода на главную страницу', () => {
    cy.visit('/');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('Тест перехода на страницу профиля', () => {
    cy.visit('/profile');
    cy.url().should('eq', Cypress.config().baseUrl + '/profile');
  });

  it('Тест перехода на страницу истории заказов', () => {
    cy.visit('/profile/orders');
    cy.url().should('eq', Cypress.config().baseUrl + '/profile/orders');
  });

  it('Тест перехода на страницу ленты заказов', () => {
    cy.visit('/feed');
    cy.url().should('eq', Cypress.config().baseUrl + '/feed');
  });

  it('Тест перехода на страницу логина', () => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
    cy.visit('/profile');
    cy.url().should('eq', Cypress.config().baseUrl + '/login');
  });
}); 