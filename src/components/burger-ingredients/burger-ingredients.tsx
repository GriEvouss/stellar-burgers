import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { TTabMode, TIngredient } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';

import { useSelector } from '@store';
import { getIngredientsSelector } from '@slices';

/**
 * Компонент списка ингредиентов бургера
 * Отвечает за отображение и управление списком ингредиентов:
 * - Фильтрация ингредиентов по типам (булки, соусы, начинки)
 * - Управление вкладками для разных типов ингредиентов
 * - Автоматическое переключение вкладок при прокрутке
 * - Прокрутка к выбранной категории при клике на вкладку
 */
export const BurgerIngredients: FC = () => {
  // Получаем список всех ингредиентов из Redux store
  const ingredients: TIngredient[] = useSelector(getIngredientsSelector);

  // Фильтруем ингредиенты по типам
  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const mains = ingredients.filter((ingredient) => ingredient.type === 'main');
  const sauces = ingredients.filter(
    (ingredient) => ingredient.type === 'sauce'
  );

  // Состояние для активной вкладки
  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');

  // Ссылки на заголовки секций для прокрутки
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  // Настройка отслеживания видимости секций
  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [mainsRef, inViewFilling] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });

  // Эффект для автоматического переключения вкладок при прокрутке
  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  /**
   * Обработчик клика по вкладке
   * Переключает активную вкладку и прокручивает к соответствующей секции
   */
  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);

    // Прокрутка к соответствующей секции
    if (tab === 'bun') {
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    if (tab === 'main') {
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    if (tab === 'sauce') {
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Рендерим UI компонент с передачей всех необходимых пропсов
  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
