import React, { FC } from 'react';
import styles from './preloader.module.css';

/**
 * UI компонент индикатора загрузки
 * Отображает анимированный круговой индикатор
 * Используется во время загрузки данных или выполнения операций
 */
export const Preloader: FC = () => (
  <div className={styles.preloader}>
    {/* Анимированный круг загрузки */}
    <div className={styles.preloader_circle} />
  </div>
);
