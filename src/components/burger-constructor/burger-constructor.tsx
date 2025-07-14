import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@store';
import { useNavigate } from 'react-router-dom';
import {
  setOrderRequest,
  sendOrderThunk,
  setNullOrderModalData,
  isAuthorizedSelector,
  getConstructorSelector
} from '@slices';

// Компонент конструктора бургера
export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Получаем состояние конструктора и авторизации из Redux
  const constructorState = useSelector(getConstructorSelector);
  const isAuthorized = useSelector(isAuthorizedSelector);

  // Получаем необходимые данные из состояния
  const constructorItems = constructorState.constructorItems;
  const orderRequest = constructorState.orderRequest;
  const orderModalData = constructorState.orderModalData;

  // Обработчик клика по кнопке оформления заказа
  const onOrderClick = () => {
    // Если пользователь не авторизован, перенаправляем на страницу входа
    if (constructorItems.bun && !isAuthorized) {
      navigate('/login');
      return;
    }

    // Если есть булка и пользователь авторизован, оформляем заказ
    if (constructorItems.bun && isAuthorized) {
      dispatch(setOrderRequest(true));

      // Формируем массив ID ингредиентов для заказа
      const bunId = constructorItems.bun._id;
      const ingredientsIds = constructorItems.ingredients.map(
        (ingredient) => ingredient._id
      );
      const order = [bunId, ...ingredientsIds, bunId];

      // Отправляем заказ
      dispatch(sendOrderThunk(order));
    }
  };

  // Обработчик закрытия модального окна заказа
  const closeOrderModal = () => {
    dispatch(setOrderRequest(false));
    dispatch(setNullOrderModalData());
  };

  // Вычисляем общую стоимость бургера
  const price = useMemo(() => {
    // Стоимость булки (умножаем на 2, так как булка используется дважды)
    const bunPrice = constructorItems.bun ? constructorItems.bun.price * 2 : 0;

    // Стоимость остальных ингредиентов
    const ingredientsPrice = constructorItems.ingredients.reduce(
      (sum: number, ingredient: TConstructorIngredient) =>
        sum + ingredient.price,
      0
    );

    return bunPrice + ingredientsPrice;
  }, [constructorItems]);

  // Рендерим UI компонент
  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
