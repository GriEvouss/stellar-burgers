import { ReactNode } from 'react';

/**
 * Пропсы компонента модального окна
 */
export type TModalProps = {
  /** Заголовок модального окна */
  title: string;
  /** Функция-обработчик закрытия модального окна */
  onClose: () => void;
  /** Дочерние элементы модального окна */
  children?: ReactNode;
};
