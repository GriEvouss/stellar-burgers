import { FC, memo } from 'react';

import { OrdersListProps } from './type';
import { OrdersListUI } from '@ui';

// Компонент списка заказов
export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  // Сортируем заказы по дате создания (от новых к старым)
  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  // Рендерим UI компонент с отсортированными заказами
  return <OrdersListUI orderByDate={orderByDate} />;
});
