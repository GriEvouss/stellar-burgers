import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from '@store';
import { isAuthorizedSelector } from '@slices';

/**
 * Пропсы компонента защищенного маршрута
 */
type ProtectedRouteProps = {
  /** Флаг, указывающий, что маршрут предназначен для авторизованных пользователей */
  forAuthorized: boolean;
};

/**
 * Компонент защищенного маршрута
 * Отвечает за контроль доступа к маршрутам в зависимости от авторизации пользователя
 * - Если маршрут для неавторизованных и пользователь авторизован - редирект на главную
 * - Если маршрут для авторизованных и пользователь не авторизован - редирект на логин
 * - В остальных случаях - отображение содержимого маршрута
 */
export const ProtectedRoute = ({
  forAuthorized = false
}: ProtectedRouteProps) => {
  // Получаем текущий маршрут и состояние авторизации
  const location = useLocation();
  const isAuthorized = useSelector(isAuthorizedSelector);
  const from = location.state?.from || '/';

  // Редирект для неавторизованных маршрутов
  if (!forAuthorized && isAuthorized) {
    return <Navigate to={from} />;
  }

  // Редирект для авторизованных маршрутов
  if (forAuthorized && !isAuthorized) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  // Отображение содержимого маршрута
  return <Outlet />;
};
