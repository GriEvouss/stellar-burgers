import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '@store';
import { addIngredient } from '@slices';

// Компонент отдельного ингредиента в списке
// Использует memo для оптимизации перерендеров
export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    // Хуки для работы с роутингом и Redux
    const location = useLocation();
    const dispatch = useDispatch();

    // Обработчик добавления ингредиента в конструктор
    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
    };

    // Рендерим UI компонент с передачей всех необходимых пропсов
    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
