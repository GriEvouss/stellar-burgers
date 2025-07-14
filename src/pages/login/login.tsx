import { FC, SyntheticEvent, useState, useEffect } from 'react';
import { LoginUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '@store';
import { loginUserThunk, clearUserError } from '@slices';

// Компонент страницы авторизации
export const Login: FC = () => {
  // Хуки для работы с Redux и роутингом
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Получаем ошибку авторизации из Redux store
  const error = useSelector((state) => state.user.error);

  // Состояние для полей формы
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Очищаем ошибку при монтировании компонента
  useEffect(() => {
    dispatch(clearUserError());
  }, [dispatch]);

  // Обработчик отправки формы
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // Отправляем запрос на авторизацию
    dispatch(loginUserThunk({ email, password }));
  };

  // Рендерим UI компонент с передачей всех необходимых пропсов
  return (
    <LoginUI
      errorText={error?.toString()}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
