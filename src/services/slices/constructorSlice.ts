import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';

// Интерфейс состояния конструктора бургера
export interface constructorState {
  isLoading: boolean; // Флаг загрузки
  constructorItems: {
    bun: TConstructorIngredient | null; // Выбранная булка
    ingredients: TConstructorIngredient[]; // Выбранные ингредиенты
  };
  orderRequest: boolean; // Флаг запроса на оформление заказа
  orderModalData: TOrder | null; // Данные заказа для модального окна
  error: string | null; // Сообщение об ошибке
}

// Начальное состояние
const initialState: constructorState = {
  isLoading: false,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

// Асинхронный экшен для отправки заказа
export const sendOrderThunk = createAsyncThunk(
  'constructorbg/sendOrder',
  (data: string[]) => orderBurgerApi(data)
);

// Слайс конструктора бургера
const constructorSlice = createSlice({
  name: 'constructorbg',
  initialState,
  reducers: {
    // Добавление ингредиента в конструктор
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        // Если это булка, заменяем существующую и добавляем id
        state.constructorItems.bun = {
          ...action.payload,
          id: nanoid()
        };
      } else {
        // Если это другой ингредиент, добавляем в массив с уникальным id
        state.constructorItems.ingredients.push({
          ...action.payload,
          id: nanoid()
        });
      }
    },

    // Удаление ингредиента из конструктора
    removeIngredient: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },

    // Установка флага запроса на оформление заказа
    setOrderRequest: (state, action) => {
      state.orderRequest = action.payload;
    },

    // Очистка данных заказа в модальном окне
    setNullOrderModalData: (state) => {
      state.orderModalData = null;
    },

    // Перемещение ингредиента вниз
    moveIngredientDown: (state, action) => {
      const index = action.payload;
      const ingredients = state.constructorItems.ingredients;
      if (index < ingredients.length - 1) {
        [ingredients[index], ingredients[index + 1]] = [
          ingredients[index + 1],
          ingredients[index]
        ];
      }
    },

    // Перемещение ингредиента вверх
    moveIngredientUp: (state, action) => {
      const index = action.payload;
      const ingredients = state.constructorItems.ingredients;
      if (index > 0) {
        [ingredients[index], ingredients[index - 1]] = [
          ingredients[index - 1],
          ingredients[index]
        ];
      }
    }
  },

  // Селекторы для получения данных из состояния
  selectors: {
    getConstructorSelector: (state) => state
  },

  // Обработка асинхронных экшенов
  extraReducers: (builder) => {
    builder
      // Обработка начала отправки заказа
      .addCase(sendOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      // Обработка ошибки при отправке заказа
      .addCase(sendOrderThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
      })
      // Обработка успешной отправки заказа
      .addCase(sendOrderThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.orderRequest = false;
        state.orderModalData = payload.order;
        // Очищаем конструктор после успешного заказа
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
      });
  }
});

// Экспортируем начальное состояние
export { initialState as constructorInitialState };

// Экспортируем экшены
export const {
  addIngredient,
  removeIngredient,
  setOrderRequest,
  setNullOrderModalData,
  moveIngredientDown,
  moveIngredientUp
} = constructorSlice.actions;

// Экспортируем селекторы
export const { getConstructorSelector } = constructorSlice.selectors;

// Экспортируем редьюсер
export default constructorSlice.reducer;
