import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from '@store';
import { getConstructorSelector } from '@slices';

// Компонент категории ингредиентов
// Использует forwardRef для передачи ссылки на DOM элемент
export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  // Получаем данные конструктора бургера из Redux store
  const burgerConstructor = useSelector(
    getConstructorSelector
  ).constructorItems;

  // Вычисляем количество каждого ингредиента в конструкторе
  const ingredientsCounters = useMemo(() => {
    const { bun, ingredients } = burgerConstructor;
    const counters: { [key: string]: number } = {};

    // Подсчитываем количество каждого ингредиента
    ingredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });

    // Булка учитывается дважды (верх и низ бургера)
    if (bun) counters[bun._id] = 2;

    return counters;
  }, [burgerConstructor]);

  // Рендерим UI компонент с передачей всех необходимых пропсов
  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
