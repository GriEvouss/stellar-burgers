import { URL } from '@api';
import { deleteCookie, setCookie } from '../../../src/utils/cookie';

describe('Тесты истории заказов', () => {
  beforeEach(() => {
    setCookie('accessToken', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjBhMDAyOTdlZGUwMDAxZDA2MDg1NCIsImlhdCI6MTcxMjMxMDE2NiwiZXhwIjoxNzEyMzExMzY2fQ.v7kdecJvLfdmlBsvf_BySvsfnXX3K0Er__GNYw-NRLM');
    localStorage.setItem('refreshToken', '9cbdd5b777edfb92bd9183a7cf2372a12b545c045a9796f94c1afd0b9d374a8794aa15bee20a7556');
    cy.intercept('GET', `${URL}/auth/user`, { fixture: 'user.json' }).as('getUser');
    cy.intercept('GET', `${URL}/orders`, { fixture: 'order.json' }).as('getOrders');
    cy.visit('/profile/orders');
    cy.wait(['@getUser', '@getOrders']);
  });

  afterEach(() => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('Тест отображения списка заказов', () => {
    cy.get('[data-cy="order-card"]').should('have.length.at.least', 1);
    cy.get('[data-cy="order-number"]').first().should('contain', '37865');
  });

  it('Тест открытия деталей заказа', () => {
    cy.get('[data-cy="order-card"]').first().click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modal"]').should('contain', '37865');
  });

  it('Тест закрытия модального окна заказа', () => {
    cy.get('[data-cy="order-card"]').first().click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });
}); 