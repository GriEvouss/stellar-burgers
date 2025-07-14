import { URL } from '@api';
import { deleteCookie, setCookie } from '../../../src/utils/cookie';

describe('Тесты профиля пользователя', () => {
  beforeEach(() => {
    setCookie('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjBhMDAyOTdlZGUwMDAxZDA2MDg1NCIsImlhdCI6MTcxMjMxMDE2NiwiZXhwIjoxNzEyMzExMzY2fQ.v7kdecJvLfdmlBsvf_BySvsfnXX3K0Er__GNYw-NRLM');
    localStorage.setItem('refreshToken', '9cbdd5b777edfb92bd9183a7cf2372a12b545c045a9796f94c1afd0b9d374a8794aa15bee20a7556');
    cy.intercept('GET', `${URL}/auth/user`, { fixture: 'user.json' }).as('getUser');
    cy.visit('/profile');
    cy.wait('@getUser');
  });

  afterEach(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('Тест отображения данных пользователя', () => {
    cy.get('[data-cy="profile-name"]').should('have.value', 'Test User');
    cy.get('[data-cy="profile-email"]').should('have.value', 'test@test.com');
  });

  it('Тест обновления данных пользователя', () => {
    cy.intercept('PATCH', `${URL}/auth/user`, { fixture: 'user.json' }).as('updateUser');
    
    cy.get('[data-cy="profile-name"]').clear().type('New Name');
    cy.get('[data-cy="profile-email"]').clear().type('new@test.com');
    cy.get('[data-cy="save-button"]').click();

    cy.wait('@updateUser');
    cy.get('[data-cy="success-message"]').should('be.visible');
  });

  it('Тест выхода из системы', () => {
    cy.intercept('POST', `${URL}/auth/logout`, { fixture: 'user.json' }).as('logout');
    
    cy.get('[data-cy="logout-button"]').click();
    cy.wait('@logout');
    cy.url().should('eq', Cypress.config().baseUrl + '/login');
  });
}); 