import { TConstructorIngredient } from '@utils-types';

/**
 * Пропсы UI компонента элемента конструктора бургера
 */
export type BurgerConstructorElementUIProps = {
  /** Данные ингредиента для отображения */
  ingredient: TConstructorIngredient;
  /** Индекс элемента в списке ингредиентов */
  index: number;
  /** Общее количество элементов в списке */
  totalItems: number;
  /** Функция-обработчик перемещения элемента вверх */
  handleMoveUp: () => void;
  /** Функция-обработчик перемещения элемента вниз */
  handleMoveDown: () => void;
  /** Функция-обработчик удаления элемента */
  handleClose: () => void;
};
