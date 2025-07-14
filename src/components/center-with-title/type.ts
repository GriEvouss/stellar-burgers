import { ReactNode } from 'react';

/**
 * Пропсы компонента центрированного контента с заголовком
 */
export type TCenter = {
  /** Заголовок компонента */
  title: string;
  /** Дочерние элементы компонента */
  children?: ReactNode;
};
