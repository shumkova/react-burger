import React, { FC } from 'react';
import styles from './order-confirm.module.css';

const OrderConfirm: FC<{ number: string }> = ({ number }) => {
  return (
    <div className={styles.details}>
      <h2 className="text text_type_digits-large mb-8">{number}</h2>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <div className={styles.done}></div>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
};

export default OrderConfirm;