import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '@store';
import { getIngredientsSelector } from '@slices';
import { useParams } from 'react-router-dom';

/**
 * Компонент детальной информации об ингредиенте
 * Отвечает за отображение подробной информации об ингредиенте:
 * - Получение ID ингредиента из URL
 * - Поиск данных ингредиента в списке
 * - Отображение детальной информации
 */
export const IngredientDetails: FC = () => {
  // Получаем ID ингредиента из параметров URL
  const ingridientId = useParams().id;

  // Получаем список ингредиентов из Redux
  const ingredients = useSelector(getIngredientsSelector);

  // Находим данные нужного ингредиента
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === ingridientId
  );

  // Отображаем прелоадер, если ингредиент не найден
  if (!ingredientData) {
    return <Preloader />;
  }

  // Рендерим UI компонент с данными ингредиента
  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
