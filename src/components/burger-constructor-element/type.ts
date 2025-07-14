import { TConstructorIngredient } from '@utils-types';

/**
 * Пропсы компонента элемента конструктора бургера
 */
export type BurgerConstructorElementProps = {
  /** Ингредиент, который отображается в конструкторе */
  ingredient: TConstructorIngredient;
  /** Индекс элемента в списке ингредиентов */
  index: number;
  /** Общее количество элементов в списке */
  totalItems: number;
};
