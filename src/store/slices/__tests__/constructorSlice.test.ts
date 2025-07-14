import constructorReducer, { constructorInitialState, addIngredient, removeIngredient } from '../../../services/slices/constructorSlice';
import { TConstructorIngredient } from '@utils-types';

describe('Тесты редьюсера конструктора', () => {
  it('должен обрабатывать добавление ингредиента', () => {
    const ingredient: TConstructorIngredient = {
      _id: '1',
      name: 'Булочка',
      type: 'main',
      price: 100,
      image: 'test.jpg',
      image_large: 'test-large.jpg',
      image_mobile: 'test-mobile.jpg',
      calories: 300,
      proteins: 10,
      fat: 5,
      carbohydrates: 50,
      id: 'test-id'
    };

    const action = addIngredient(ingredient);
    const state = constructorReducer(constructorInitialState, action);

    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]).toEqual({
      ...ingredient,
      id: expect.any(String)
    });
  });

  it('должен обрабатывать удаление ингредиента', () => {
    const ingredient: TConstructorIngredient = {
      _id: '1',
      name: 'Булочка',
      type: 'main',
      price: 100,
      image: 'test.jpg',
      image_large: 'test-large.jpg',
      image_mobile: 'test-mobile.jpg',
      calories: 300,
      proteins: 10,
      fat: 5,
      carbohydrates: 50,
      id: 'test-id'
    };

    const stateWithIngredient = {
      ...constructorInitialState,
      constructorItems: {
        ...constructorInitialState.constructorItems,
        ingredients: [ingredient]
      }
    };

    const action = removeIngredient('test-id');
    const state = constructorReducer(stateWithIngredient, action);

    expect(state.constructorItems.ingredients).toHaveLength(0);
  });
}); 