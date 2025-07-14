import { TOrder, TConstructorIngredient } from '@utils-types';

/**
 * Пропсы UI компонента конструктора бургера
 */
export type BurgerConstructorUIProps = {
  /** Объект с данными конструктора (булка и ингредиенты) */
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  /** Флаг, указывающий на то, что идет процесс оформления заказа */
  orderRequest: boolean;
  /** Общая стоимость бургера */
  price: number;
  /** Данные оформленного заказа */
  orderModalData: TOrder | null;
  /** Функция-обработчик клика по кнопке оформления заказа */
  onOrderClick: () => void;
  /** Функция-обработчик закрытия модального окна заказа */
  closeOrderModal: () => void;
};
