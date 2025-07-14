import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '@store';
import { getUserSelector, updateUserThunk } from '@slices';
import { TUser } from '@utils-types';

// Компонент страницы профиля пользователя
export const Profile: FC = () => {
  // Хуки для работы с Redux
  const dispatch = useDispatch();
  const user = useSelector(getUserSelector) as TUser;

  // Состояние формы с данными пользователя
  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: '' // Пароль не хранится в профиле
  });

  // Обновляем форму при изменении данных пользователя
  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  // Проверяем, были ли изменены данные формы
  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  // Обработчик отправки формы
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // Отправляем обновленные данные пользователя
    dispatch(updateUserThunk(formValue));
    // Очищаем поле пароля после отправки
    setFormValue({
      ...user,
      password: ''
    });
  };

  // Обработчик отмены изменений
  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    // Возвращаем исходные данные пользователя
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  // Обработчик изменения полей формы
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  // Рендерим UI компонент с передачей всех необходимых пропсов
  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
