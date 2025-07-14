import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ResetPasswordUI } from '@ui-pages';

import { useSelector, useDispatch } from '@store';
import {
  resetPasswordThunk,
  getUserErrorSelector,
  clearUserError
} from '@slices';

// Компонент страницы сброса пароля
export const ResetPassword: FC = () => {
  // Хуки для работы с роутингом и Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Состояние для полей формы
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  // Получаем ошибку из Redux store
  const error = useSelector(getUserErrorSelector) as string;

  // Обработчик отправки формы
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // Отправляем запрос на сброс пароля
    dispatch(resetPasswordThunk({ password: password, token: token })).then(
      (data) => {
        if (data.payload) {
          // Если запрос успешен, удаляем флаг из localStorage
          localStorage.removeItem('resetPassword');
          // Перенаправляем на страницу входа
          navigate('/login');
        }
      }
    );
  };

  // Очищаем ошибку при монтировании компонента
  useEffect(() => {
    dispatch(clearUserError());
  }, [dispatch]);

  // Проверяем, есть ли флаг восстановления пароля
  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      // Если флага нет, перенаправляем на страницу восстановления пароля
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  // Рендерим UI компонент с передачей всех необходимых пропсов
  return (
    <ResetPasswordUI
      errorText={error}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
