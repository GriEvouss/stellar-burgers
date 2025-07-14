import { ReactNode } from 'react';

/**
 * Пропсы UI компонента модального окна
 */
export type TModalUIProps = {
  /** Заголовок модального окна */
  title: string;
  /** Функция-обработчик закрытия модального окна */
  onClose: () => void;
  /** CSS класс для стилизации заголовка */
  titleStyle: string;
  /** Дочерние элементы модального окна */
  children?: ReactNode;
};
