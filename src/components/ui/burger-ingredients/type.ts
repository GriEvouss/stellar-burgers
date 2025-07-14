import { RefObject } from 'react';
import { TIngredient, TTabMode } from '@utils-types';

/**
 * Пропсы для UI компонента списка ингредиентов бургера
 */
export type BurgerIngredientsUIProps = {
  /** Текущая активная вкладка */
  currentTab: TTabMode;
  /** Список булок */
  buns: TIngredient[];
  /** Список основных ингредиентов */
  mains: TIngredient[];
  /** Список соусов */
  sauces: TIngredient[];
  /** Ссылка на заголовок секции булок */
  titleBunRef: RefObject<HTMLHeadingElement>;
  /** Ссылка на заголовок секции основных ингредиентов */
  titleMainRef: RefObject<HTMLHeadingElement>;
  /** Ссылка на заголовок секции соусов */
  titleSaucesRef: RefObject<HTMLHeadingElement>;
  /** Функция для установки ref на секцию булок */
  bunsRef: (node?: Element | null | undefined) => void;
  /** Функция для установки ref на секцию основных ингредиентов */
  mainsRef: (node?: Element | null | undefined) => void;
  /** Функция для установки ref на секцию соусов */
  saucesRef: (node?: Element | null | undefined) => void;
  /** Обработчик клика по вкладке */
  onTabClick: (val: string) => void;
};
