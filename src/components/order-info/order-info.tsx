import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '@store';
import {
  getOrderThunk,
  getOrderSelector,
  getIngredientsSelector
} from '@slices';

/**
 * Компонент информации о заказе
 * Отвечает за получение и отображение детальной информации о заказе:
 * - Получение данных заказа по номеру
 * - Подсчет количества и стоимости ингредиентов
 * - Форматирование даты
 * - Отображение общей стоимости
 */
export const OrderInfo: FC = () => {
  // Получаем dispatch для отправки действий в Redux
  const dispatch = useDispatch();
  // Получаем номер заказа из параметров URL
  const orderNubmer = Number(useParams().number);

  // Запрашиваем данные заказа при монтировании компонента
  useEffect(() => {
    dispatch(getOrderThunk(orderNubmer));
  }, [dispatch]);

  // Получаем данные заказа и список ингредиентов из Redux
  const orderData = useSelector(getOrderSelector).order;
  const ingredients: TIngredient[] = useSelector(getIngredientsSelector);

  // Вычисляем детальную информацию о заказе
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    // Форматируем дату создания заказа
    const date = new Date(orderData.createdAt);

    // Тип для хранения информации об ингредиентах с количеством
    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    // Подсчитываем количество каждого ингредиента
    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    // Вычисляем общую стоимость заказа
    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    // Возвращаем полную информацию о заказе
    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  // Отображаем прелоадер, если данные еще не загружены
  if (!orderInfo) {
    return <Preloader />;
  }

  // Рендерим UI компонент с информацией о заказе
  return <OrderInfoUI orderInfo={orderInfo} />;
};
