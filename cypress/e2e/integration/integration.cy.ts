import { URL } from '@api';
import { deleteCookie, setCookie } from '../../../src/utils/cookie';

describe('Тесты интеграции', () => {
  beforeEach(() => {
    setCookie('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjBhMDAyOTdlZGUwMDAxZDA2MDg1NCIsImlhdCI6MTcxMjMxMDE2NiwiZXhwIjoxNzEyMzExMzY2fQ.v7kdecJvLfdmlBsvf_BySvsfnXX3K0Er__GNYw-NRLM');
    localStorage.setItem('refreshToken', '9cbdd5b777edfb92bd9183a7cf2372a12b545c045a9796f94c1afd0b9d374a8794aa15bee20a7556');
    cy.intercept('GET', `${URL}/auth/user`, { fixture: 'user.json' }).as('getUser');
    cy.intercept('GET', `${URL}/ingredients`, { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('/');
    cy.wait(['@getUser', '@getIngredients']);
  });

  afterEach(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('Тест создания заказа', () => {
    cy.intercept('POST', `${URL}/orders`, { fixture: 'order.json' }).as('orderBurgerApi');

    cy.get('[data-cy="constructor"]').as('constructor');
    cy.get('[data-cy="ingredient-item"]').first().trigger('dragstart');
    cy.get('@constructor').trigger('drop');
    cy.get('[data-cy="ingredient-item"]').eq(1).trigger('dragstart');
    cy.get('@constructor').trigger('drop');
    cy.get('@constructor').children('div').children('button').click();

    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modal"]').should('contain', '37865');

    cy.wait('@orderBurgerApi');
  });

  it('Тест регистрации и входа', () => {
    cy.intercept('POST', `${URL}/auth/register`, { fixture: 'user.json' }).as('register');
    cy.intercept('POST', `${URL}/auth/login`, { fixture: 'user.json' }).as('login');

    cy.visit('/register');
    cy.get('[data-cy="name-input"]').type('Test User');
    cy.get('[data-cy="email-input"]').type('test@test.com');
    cy.get('[data-cy="password-input"]').type('password123');
    cy.get('[data-cy="register-button"]').click();

    cy.wait('@register');
    cy.url().should('eq', Cypress.config().baseUrl + '/');

    cy.visit('/login');
    cy.get('[data-cy="email-input"]').type('test@test.com');
    cy.get('[data-cy="password-input"]').type('password123');
    cy.get('[data-cy="login-button"]').click();

    cy.wait('@login');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('Тест восстановления пароля', () => {
    cy.intercept('POST', `${URL}/password-reset`, { fixture: 'user.json' }).as('resetPassword');

    cy.visit('/forgot-password');
    cy.get('[data-cy="email-input"]').type('test@test.com');
    cy.get('[data-cy="reset-button"]').click();

    cy.wait('@resetPassword');
    cy.url().should('include', '/reset-password');
  });

  it('Тест обновления данных пользователя', () => {
    cy.intercept('PATCH', `${URL}/auth/user`, { fixture: 'user.json' }).as('updateUser');

    cy.visit('/profile');
    cy.get('[data-cy="profile-name"]').clear().type('New Name');
    cy.get('[data-cy="profile-email"]').clear().type('new@test.com');
    cy.get('[data-cy="save-button"]').click();

    cy.wait('@updateUser');
    cy.get('[data-cy="success-message"]').should('be.visible');
  });

  it('Тест выхода из системы', () => {
    cy.intercept('POST', `${URL}/auth/logout`, { fixture: 'user.json' }).as('logout');

    cy.visit('/profile');
    cy.get('[data-cy="logout-button"]').click();

    cy.wait('@logout');
    cy.url().should('eq', Cypress.config().baseUrl + '/login');
  });
}); 