import { URL } from '@api';
import { deleteCookie, setCookie } from '../../../src/utils/cookie';

describe('Тесты компонентов', () => {
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

  it('Тест отображения ингредиента', () => {
    cy.get('[data-cy="ingredient-item"]').first().as('ingredient');
    cy.get('@ingredient').should('contain', 'Краторная булка N-200i');
    cy.get('@ingredient').should('contain', '1255');
  });

  it('Тест отображения конструктора', () => {
    cy.get('[data-cy="constructor"]').as('constructor');
    cy.get('@constructor').should('exist');
    cy.get('@constructor').should('contain', 'Перетащите булку');
  });

  it('Тест отображения профиля', () => {
    cy.visit('/profile');
    cy.get('[data-cy="profile"]').should('exist');
    cy.get('[data-cy="profile-name"]').should('have.value', 'Test User');
    cy.get('[data-cy="profile-email"]').should('have.value', 'test@test.com');
  });

  it('Тест отображения истории заказов', () => {
    cy.visit('/profile/orders');
    cy.get('[data-cy="orders-history"]').should('exist');
    cy.get('[data-cy="order-card"]').should('have.length.at.least', 1);
  });

  it('Тест отображения ленты заказов', () => {
    cy.visit('/feed');
    cy.get('[data-cy="feed"]').should('exist');
    cy.get('[data-cy="order-card"]').should('have.length.at.least', 1);
  });

  it('Тест отображения модального окна', () => {
    cy.get('[data-cy="ingredient-item"]').first().click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modal"]').should('contain', 'Краторная булка N-200i');
  });

  it('Тест отображения навигации', () => {
    cy.get('[data-cy="nav"]').should('exist');
    cy.get('[data-cy="nav"]').should('contain', 'Конструктор');
    cy.get('[data-cy="nav"]').should('contain', 'Лента заказов');
    cy.get('[data-cy="nav"]').should('contain', 'Личный кабинет');
  });
}); 