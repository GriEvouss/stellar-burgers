/**
 * Возможные статусы заказа
 */
export type OrderStatusType = 'pending' | 'done' | 'created';

/**
 * Пропсы компонента статуса заказа
 */
export type OrderStatusProps = {
  /** Статус заказа */
  status: OrderStatusType;
};
