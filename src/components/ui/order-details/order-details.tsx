import React from 'react';
import styles from './order-details.module.css';
import doneImg from '../../../images/done.svg';
import { OrderDetailsUIProps } from './type';

/**
 * UI компонент деталей заказа
 * Отображает информацию об успешно оформленном заказе:
 * - Номер заказа
 * - Идентификатор
 * - Иконку статуса
 * - Информацию о процессе приготовления
 */
export const OrderDetailsUI: React.FC<OrderDetailsUIProps> = ({
  orderNumber
}) => (
  <>
    {/* Номер заказа */}
    <h2 className={`${styles.title} text text_type_digits-large mt-2 mb-4`}>
      {orderNumber}
    </h2>

    {/* Идентификатор заказа */}
    <p className='text text_type_main-medium'>идентификатор заказа</p>

    {/* Иконка статуса заказа */}
    <img
      className={styles.img}
      src={doneImg}
      alt='изображение статуса заказа.'
    />

    {/* Информация о процессе приготовления */}
    <p className='text text_type_main-default mb-1'>
      Ваш заказ начали готовить
    </p>

    {/* Дополнительная информация */}
    <p className={`${styles.text} text text_type_main-default`}>
      Дождитесь готовности на орбитальной станции
    </p>
  </>
);
