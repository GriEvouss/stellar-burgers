import { FC, memo, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { TModalProps } from './type';
import { ModalUI } from '@ui';
import { useLocation } from 'react-router-dom';

// Получаем корневой элемент для портала модальных окон
const modalRoot = document.getElementById('modals');

/**
 * Компонент модального окна
 * Использует React Portal для рендеринга в отдельном DOM-элементе
 * Поддерживает закрытие по клавише Escape
 * Адаптирует стиль заголовка в зависимости от текущего маршрута
 */
export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  // Получаем текущий маршрут для определения стиля заголовка
  const location = useLocation();
  const [titleStyle, setTitleStyle] = useState('text_type_main-large');

  // Эффект для изменения стиля заголовка в зависимости от маршрута
  useEffect(() => {
    if (/feed|profile/i.test(location.pathname)) {
      setTitleStyle('text_type_digits-default');
    }
  });

  // Эффект для обработки закрытия модального окна по клавише Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && onClose();
    };

    // Добавляем слушатель события
    document.addEventListener('keydown', handleEsc);

    // Удаляем слушатель при размонтировании компонента
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Рендерим модальное окно через портал
  return ReactDOM.createPortal(
    <ModalUI title={title} onClose={onClose} titleStyle={titleStyle}>
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});
