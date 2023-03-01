import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import OrderCard from '../components/order-card/order-card';
import { WS_USER_ORDERS_START, WS_USER_ORDERS_CLOSE} from '../services/actions/ws-orders';
import styles from './orders.module.css';

const OrdersPage = () => {
  const { userOrders, wsUserOrdersConnected } = useSelector(state => state.orders);
  const dispatch = useDispatch();
  const isSecondRender = useRef(false);

  useEffect(() => {
    wsUserOrdersConnected && dispatch({ type: WS_USER_ORDERS_CLOSE });
    isSecondRender.current && dispatch({ type: WS_USER_ORDERS_START });
    isSecondRender.current = true;

    return () => {
      dispatch({ type: WS_USER_ORDERS_CLOSE });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (wsUserOrdersConnected && userOrders?.length === 0) {
    return (
      <p className={'text text_type_main-default'}>Вы ещё ничего у нас не заказывали</p>
    )
  }

  return (
    <section>
      <ul className={`${styles.list} scroll pr-2`}>
        {userOrders.map((order, index) => (
          <li className={'mb-4'} key={index}>
            <OrderCard data={order} path={'/profile/orders/'}/>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default OrdersPage;