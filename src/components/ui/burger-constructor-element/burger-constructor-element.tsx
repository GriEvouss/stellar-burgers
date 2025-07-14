import React, { FC, memo } from 'react';
import styles from './burger-constructor-element.module.css';
import { ConstructorElement } from '@zlden/react-developer-burger-ui-components';
import { BurgerConstructorElementUIProps } from './type';
import { MoveButton } from '@zlden/react-developer-burger-ui-components';

/**
 * UI компонент элемента конструктора бургера
 * Отображает отдельный ингредиент в конструкторе с возможностью:
 * - Перемещения вверх/вниз с помощью MoveButton
 * - Удаления с помощью ConstructorElement
 * - Отображения информации об ингредиенте
 * Использует memo для оптимизации перерендеров
 */
export const BurgerConstructorElementUI: FC<BurgerConstructorElementUIProps> =
  memo(
    ({
      ingredient,
      index,
      totalItems,
      handleMoveUp,
      handleMoveDown,
      handleClose
    }) => (
      <li
        className={`${styles.element} mb-4 mr-2`}
        data-cy='constructor-ingredient'
      >
        {/* Кнопки перемещения ингредиента
            MoveButton - компонент из библиотеки UI компонентов
            Отвечает за перемещение ингредиента вверх/вниз */}
        <MoveButton
          handleMoveDown={handleMoveDown}
          handleMoveUp={handleMoveUp}
          isUpDisabled={index === 0}
          isDownDisabled={index === totalItems - 1}
        />

        {/* Контейнер с информацией об ингредиенте
            ConstructorElement - компонент из библиотеки UI компонентов
            Отображает информацию об ингредиенте и кнопку удаления */}
        <div className={`${styles.element_fullwidth} ml-2`}>
          <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={handleClose}
          />
        </div>
      </li>
    )
  );
