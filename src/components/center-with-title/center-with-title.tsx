import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { TCenter } from './type';
import { CenterUI } from '../ui/center-with-title';

/**
 * Компонент центрированного контента с заголовком
 * Отвечает за отображение контента по центру страницы с заголовком
 * Адаптирует стиль заголовка в зависимости от текущего маршрута:
 * - Для страниц feed и profile использует специальный стиль
 * - Для остальных страниц использует стандартный стиль
 */
export const Center: FC<TCenter> = memo(({ title, children }) => {
  // Получаем текущий маршрут для определения стиля заголовка
  const location = useLocation();
  const [titleStyle, setTitleStyle] = useState('text_type_main-large');

  // Эффект для изменения стиля заголовка в зависимости от маршрута
  useEffect(() => {
    if (/feed|profile/i.test(location.pathname)) {
      setTitleStyle('text_type_digits-default');
    }
  });

  // Рендерим UI компонент с заголовком и контентом
  return (
    <>
      <CenterUI title={title} titleStyle={titleStyle} children={children} />
    </>
  );
});
