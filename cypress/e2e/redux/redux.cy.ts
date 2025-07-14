import { URL } from '@api';
import { deleteCookie, setCookie } from '../../../src/utils/cookie';
import store from '../../../src/services/store';
import { addIngredient, removeIngredient } from '../../../src/services/slices/constructorSlice';
import { clearUserError } from '../../../src/services/slices/userSlice';

describe('Тесты Redux', () => {
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

  it('Тест добавления ингредиента в конструктор', () => {
    const ingredient = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    };

    store.dispatch(addIngredient(ingredient));
    const state = store.getState();
    expect(state.constructorbg.constructorItems.bun).to.deep.equal(ingredient);
  });

  it('Тест удаления ингредиента из конструктора', () => {
    const ingredient = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    };

    store.dispatch(addIngredient(ingredient));
    store.dispatch(removeIngredient(ingredient._id));
    const state = store.getState();
    expect(state.constructorbg.constructorItems.bun).to.be.null;
  });

  it('Тест очистки конструктора', () => {
    const ingredient = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    };

    store.dispatch(addIngredient(ingredient));
    store.dispatch({ type: 'constructorbg/setNullOrderModalData' });
    const state = store.getState();
    expect(state.constructorbg.constructorItems.bun).to.be.null;
    expect(state.constructorbg.constructorItems.ingredients).to.be.empty;
  });

  it('Тест очистки ошибки пользователя', () => {
    store.dispatch(clearUserError());
    const state = store.getState();
    expect(state.user.error).to.be.null;
  });
}); 