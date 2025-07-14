import React, { FC } from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

/**
 * Словарь с текстовыми описаниями статусов заказа
 */
const statusText: { [key: string]: string } = {
  pending: 'Готовится',
  done: 'Выполнен',
  created: 'Создан'
};

/**
 * Компонент статуса заказа
 * Отвечает за отображение статуса заказа с соответствующим цветом
 * Поддерживает следующие статусы:
 * - pending (готовится) - красный цвет
 * - done (выполнен) - бирюзовый цвет
 * - created (создан) - серый цвет
 */
export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  // Определяем цвет текста в зависимости от статуса
  let textStyle = '';
  switch (status) {
    case 'pending':
      textStyle = '#E52B1A'; // Красный цвет для готовящегося заказа
      break;
    case 'done':
      textStyle = '#00CCCC'; // Бирюзовый цвет для выполненного заказа
      break;
    default:
      textStyle = '#F2F2F3'; // Серый цвет для созданного заказа
  }

  // Рендерим UI компонент с цветом и текстом статуса
  return <OrderStatusUI textStyle={textStyle} text={statusText[status]} />;
};
