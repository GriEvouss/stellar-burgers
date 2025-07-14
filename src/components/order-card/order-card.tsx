import { FC, memo, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';

import { useSelector } from '@store';
import { getIngredientsSelector } from '@slices';

// Максимальное количество ингредиентов для отображения в карточке
const maxIngredients = 6;

// Компонент карточки заказа
export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  // Получаем текущий location для роутинга
  const location = useLocation();

  // Получаем список всех ингредиентов из Redux store
  const ingredients: TIngredient[] = useSelector(getIngredientsSelector);

  // Вычисляем информацию о заказе
  const orderInfo = useMemo(() => {
    // Если ингредиенты еще не загружены, возвращаем null
    if (!ingredients.length) return null;

    // Находим информацию о каждом ингредиенте в заказе
    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredient[], item: string) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) return [...acc, ingredient];
        return acc;
      },
      []
    );

    // Вычисляем общую стоимость заказа
    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

    // Берем только первые maxIngredients ингредиентов для отображения
    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    // Вычисляем количество оставшихся ингредиентов
    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    // Преобразуем дату создания заказа
    const date = new Date(order.createdAt);

    // Возвращаем полную информацию о заказе
    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  // Если информация о заказе не готова, не рендерим компонент
  if (!orderInfo) return null;

  // Рендерим UI компонент с передачей всех необходимых пропсов
  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
    />
  );
});
