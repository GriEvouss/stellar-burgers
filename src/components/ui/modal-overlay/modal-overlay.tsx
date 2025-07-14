import { FC } from 'react';
import styles from './modal-overlay.module.css';

/**
 * UI компонент затемнения фона для модального окна
 * Отвечает за отображение полупрозрачного фона
 * и обработку клика по нему для закрытия модального окна
 */
export const ModalOverlayUI: FC<{ onClick: () => void }> = ({ onClick }) => (
  <div className={styles.overlay} onClick={onClick} data-cy='modal-overlay' />
);
