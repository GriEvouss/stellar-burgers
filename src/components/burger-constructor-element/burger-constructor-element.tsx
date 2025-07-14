import { FC, ReactElement, memo, useEffect } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '@store';
import {
  removeIngredient,
  moveIngredientDown,
  moveIngredientUp
} from '@slices';

/**
 * Компонент элемента конструктора бургера
 * Отвечает за отображение и управление отдельным ингредиентом в конструкторе
 * Использует memo для оптимизации перерендеров
 */
export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    // Получаем dispatch для отправки действий в Redux
    const dispatch = useDispatch();

    /**
     * Обработчик перемещения ингредиента вниз
     * Вызывается при нажатии на кнопку "вниз"
     */
    const handleMoveDown = () => {
      dispatch(moveIngredientDown(index));
    };

    /**
     * Обработчик перемещения ингредиента вверх
     * Вызывается при нажатии на кнопку "вверх"
     */
    const handleMoveUp = () => {
      dispatch(moveIngredientUp(index));
    };

    /**
     * Обработчик удаления ингредиента
     * Вызывается при нажатии на кнопку закрытия
     */
    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    // Рендерим UI компонент с необходимыми пропсами
    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
