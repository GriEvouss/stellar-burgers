import { FC, useState, SyntheticEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api';
import { ForgotPasswordUI } from '@ui-pages';

import { useSelector, useDispatch } from '@store';
import {
  forgotPasswordThunk,
  getUserErrorSelector,
  clearUserError
} from '@slices';

// Компонент страницы восстановления пароля
export const ForgotPassword: FC = () => {
  // Состояние для поля email
  const [email, setEmail] = useState('');

  // Получаем ошибку из Redux store
  const error = useSelector(getUserErrorSelector) as string;

  // Хуки для работы с роутингом и Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Очищаем ошибку при монтировании компонента
  useEffect(() => {
    dispatch(clearUserError());
  }, [dispatch]);

  // Обработчик отправки формы
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // Отправляем запрос на восстановление пароля
    dispatch(forgotPasswordThunk({ email: email })).then((data) => {
      if (data.payload) {
        // Если запрос успешен, сохраняем флаг в localStorage
        localStorage.setItem('resetPassword', 'true');
        // Перенаправляем на страницу сброса пароля
        navigate('/reset-password', { replace: true });
      }
    });
  };

  // Рендерим UI компонент с передачей всех необходимых пропсов
  return (
    <ForgotPasswordUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
