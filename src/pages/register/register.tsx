import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import {
  clearUserError,
  registerUserThunk,
  getUserErrorSelector
} from '@slices';

// Компонент страницы регистрации
export const Register: FC = () => {
  // Хуки для работы с Redux
  const dispatch = useDispatch();
  const error = useSelector(getUserErrorSelector);

  // Состояние для полей формы регистрации
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Обработчик отправки формы регистрации
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // Отправляем данные для регистрации
    dispatch(
      registerUserThunk({
        email,
        name: userName,
        password
      })
    );
  };

  // Очищаем ошибку при монтировании компонента
  useEffect(() => {
    dispatch(clearUserError());
  }, [dispatch]);

  // Рендерим UI компонент с передачей всех необходимых пропсов
  return (
    <RegisterUI
      errorText={error?.toString()}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
