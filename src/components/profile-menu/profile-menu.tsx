import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '@store';
import { logoutUserThunk } from '@slices';

/**
 * Компонент меню профиля
 * Отвечает за отображение и управление меню профиля пользователя
 * Включает в себя:
 * - Навигацию по разделам профиля
 * - Выход из аккаунта
 */
export const ProfileMenu: FC = () => {
  // Получаем dispatch для отправки действий в Redux
  const dispatch = useDispatch();
  // Получаем текущий путь для подсветки активного пункта меню
  const { pathname } = useLocation();

  /**
   * Обработчик выхода из аккаунта
   * Вызывает соответствующий thunk для выхода
   */
  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

  // Рендерим UI компонент с необходимыми пропсами
  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
