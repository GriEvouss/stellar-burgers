import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '@store';
import { getOrdersSelector, getOrdersThunk } from '@slices';

// Компонент страницы истории заказов пользователя
export const ProfileOrders: FC = () => {
  // Хуки для работы с Redux
  const dispatch = useDispatch();

  // Получаем список заказов из Redux store
  const orders: TOrder[] = useSelector(getOrdersSelector);

  // Загружаем заказы при монтировании компонента
  useEffect(() => {
    dispatch(getOrdersThunk());
  }, [dispatch]);

  // Рендерим UI компонент с передачей списка заказов
  return <ProfileOrdersUI orders={orders} />;
};
