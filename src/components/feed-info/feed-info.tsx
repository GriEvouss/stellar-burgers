import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '@ui';
import { useSelector } from '@store';
import { getFeedStateSelector } from '@slices';

/**
 * Вспомогательная функция для получения номеров заказов по статусу
 * @param orders - список заказов
 * @param status - статус заказов для фильтрации
 * @returns массив номеров заказов (не более 20)
 */
const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

/**
 * Компонент информации о ленте заказов
 * Отвечает за отображение статистики заказов:
 * - Общее количество заказов
 * - Количество заказов за сегодня
 * - Списки готовых и готовящихся заказов
 */
export const FeedInfo: FC = () => {
  // Получаем состояние ленты заказов из Redux
  const ordersState = useSelector(getFeedStateSelector);
  const orders: TOrder[] = ordersState.orders;

  // Формируем объект с общей статистикой
  const feed = {
    total: ordersState.total,
    totalToday: ordersState.totalToday
  };

  // Получаем списки заказов по статусам
  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  // Рендерим UI компонент с информацией о заказах
  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
