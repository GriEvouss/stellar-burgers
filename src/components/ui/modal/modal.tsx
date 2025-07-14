import { FC, memo } from 'react';

import styles from './modal.module.css';

import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { TModalUIProps } from './type';
import { ModalOverlayUI } from '@ui';

/**
 * UI компонент модального окна
 * Отвечает за отображение модального окна с заголовком и содержимым
 * Использует memo для оптимизации перерендеров
 * Включает в себя:
 * - Заголовок с возможностью стилизации
 * - Кнопку закрытия
 * - Контейнер для содержимого
 * - Затемнение фона
 */
export const ModalUI: FC<TModalUIProps> = memo(
  ({ title, onClose, titleStyle, children }) => (
    <>
      {/* Основной контейнер модального окна */}
      <div className={styles.modal} data-cy='modal'>
        {/* Заголовок модального окна */}
        <div className={styles.header}>
          {/* Текст заголовка с возможностью стилизации */}
          <h3 className={`${styles.title} text ${titleStyle}`}>{title}</h3>
          {/* Кнопка закрытия с иконкой */}
          <button
            className={styles.button}
            type='button'
            data-cy='modal-close'
            onClick={onClose}
          >
            <CloseIcon type='primary' />
          </button>
        </div>
        {/* Контейнер для содержимого модального окна */}
        <div className={styles.content}>{children}</div>
      </div>
      {/* Затемнение фона с обработчиком клика для закрытия */}
      <ModalOverlayUI onClick={onClose} />
    </>
  )
);
