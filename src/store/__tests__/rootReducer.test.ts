import { rootReducer } from '../../services/store';
import { constructorInitialState } from '../../services/slices/constructorSlice';
import { ingredientsInitialState } from '../../services/slices/ingredientsSlice';
import { orderInitialState } from '../../services/slices/orderSlice';
import { userInitialState } from '../../services/slices/userSlice';

describe('Тесты rootReducer', () => {
  it('должен вернуть начальное состояние при undefined и неизвестном экшене', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, unknownAction);
    
    expect(state).toEqual({
      constructorbg: constructorInitialState,
      ingredients: ingredientsInitialState,
      order: orderInitialState,
      user: userInitialState,
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        isLoading: false,
        error: null
      }
    });
  });
}); 