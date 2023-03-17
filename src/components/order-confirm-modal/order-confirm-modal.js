import React from 'react';
import { useSelector } from 'react-redux';
import OrderConfirm from "../order-confirm/order-confirm";

const OrderConfirmModal = () => {
  const { orderInfo, orderFailed } = useSelector(state => state.order);

  return !orderFailed && orderInfo.number ? (
    <OrderConfirm number={orderInfo.number}/>
  ) : (
    <>
      <p className="text text_type_main-medium mb-4">Произошла ошибка.</p>
      <p className="text text_type_main-default text_color_inactive">Попробуйте повторно оформить заказ.</p>
    </>
  );
}

export default OrderConfirmModal;