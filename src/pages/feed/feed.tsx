import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store';
import { getFeedThunk, getOrdersSelector } from '@slices';

// Компонент страницы ленты заказов
export const Feed: FC = () => {
  // Хуки для работы с Redux
  const dispatch = useDispatch();

  // Получаем список заказов из Redux store
  const orders: TOrder[] = useSelector(getOrdersSelector);

  // Функция для обновления ленты заказов
  const handleGetFeeds = () => {
    dispatch(getFeedThunk());
  };

  // Загружаем заказы при монтировании компонента
  useEffect(() => {
    handleGetFeeds();
  }, [dispatch]);

  // Если заказы еще не загружены, показываем прелоадер
  if (!orders.length) {
    return <Preloader />;
  }

  // Рендерим UI компонент с передачей списка заказов и функции обновления
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
