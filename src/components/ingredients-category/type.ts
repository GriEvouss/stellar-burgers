import { TIngredient } from '@utils-types';

// Типы пропсов для компонента категории ингредиентов
export type TIngredientsCategoryProps = {
  // Заголовок категории
  title: string;
  // Ссылка на DOM элемент заголовка для прокрутки
  titleRef: React.RefObject<HTMLHeadingElement>;
  // Список ингредиентов в категории
  ingredients: TIngredient[];
};
