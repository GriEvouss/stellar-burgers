import orderReducer, { orderInitialState } from '../../../services/slices/orderSlice';
import { getOrderThunk } from '../../../services/slices/orderSlice';
import { TOrder } from '@utils-types';

describe('Тесты редьюсера заказа', () => {
  it('должен обрабатывать начало получения заказа', () => {
    const action = {
      type: getOrderThunk.pending.type,
      meta: { requestId: 'test-id', arg: 12345 }
    };
    const state = orderReducer(orderInitialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен обрабатывать успешное получение заказа', () => {
    const order: TOrder = {
      _id: '1',
      ingredients: ['1', '2'],
      status: 'done',
      name: 'Test Order',
      createdAt: '2024-03-15T12:00:00Z',
      updatedAt: '2024-03-15T12:00:00Z',
      number: 12345
    };

    const action = {
      type: getOrderThunk.fulfilled.type,
      payload: { success: true, orders: [order] },
      meta: { requestId: 'test-id', arg: 12345 }
    };
    const state = orderReducer(orderInitialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.order).toEqual(order);
  });

  it('должен обрабатывать ошибку получения заказа', () => {
    const error = 'Ошибка получения заказа';
    const action = {
      type: getOrderThunk.rejected.type,
      error: { message: error },
      meta: { requestId: 'test-id', arg: 12345 }
    };
    const state = orderReducer(orderInitialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
    expect(state.order).toBe(null);
  });
}); 