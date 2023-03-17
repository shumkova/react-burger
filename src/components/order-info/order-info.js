import React, {useMemo} from "react";
import styles from './order-info.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { formatIngredients, countOrderSum, orderStatus } from './order-info-utils';
import { orderPropTypes } from '../../utils/proptypes';

const OrderInfo = ({ order }) => {
  const { ingredients } = useSelector(state => state.ingredients);

  const orderIngredients = useMemo(() => {
    return formatIngredients(order.ingredients, ingredients);
  }, [order, ingredients]);

  const UTCOffset = useMemo(() => new Date(order.createdAt).getTimezoneOffset() / 60, [order.createdAt]);
  const GMTString = useMemo(() => `i-GMT${UTCOffset > 0 ? '-' : '+'}${Math.abs(UTCOffset)}`, [UTCOffset]);

  const totalPrice = useMemo(() => {
    return countOrderSum(orderIngredients);
  }, [orderIngredients]);

  return (
    <section className={styles.container}>
      <p className={`${styles.id} text text_type_digits-default mb-10`}>#{order.number}</p>
      <h1 className="text text_type_main-medium mb-3">{order.name}</h1>
      <p className={`${styles.status} ${order.status === 'done' ? styles.status_success : ''} text text_type_main-default mb-15`}>{orderStatus[order.status]}</p>
      <h2 className="text text_type_main-medium mb-6">Состав:</h2>
      <ul className={`${styles.list} scroll`}>
        {
          orderIngredients.map(item => (
            <li className={'mb-4'} key={item._id}>
              <div className={styles.ingredient}>
                <img className={'round-image'} src={item.image} alt={item.name}/>
                <h3 className={'text text_type_main-default ml-4 mr-4'}>{item.name}</h3>
                <div className={`${styles.ingredient__price} text text_type_digits-default`}>
                  <p>{item.__v}&nbsp;x&nbsp;{item.price}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </li>
          ))
        }
      </ul>
      <div className={`${styles.footer} mt-10`}>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(order.createdAt)} />  {GMTString}
        </p>
        <p className={`${styles.price} text text_type_digits-default`}>
          {totalPrice}
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </section>
  )
};

OrderInfo.propTypes = {
  order: orderPropTypes
};

export default OrderInfo;