import React, { useMemo} from 'react';
import styles from './ingredient.module.css';
import {Navigate, useLocation, useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Order from '../components/order/order';

const OrderPage = () => {
  const { orders } = useSelector(state => state.orders);
  const { userOrders } = useSelector(state => state.userOrders);
  const { id } = useParams();
  const { pathname } = useLocation();

  const order = useMemo(() => {
    if (pathname.includes('feed')) {
      return orders.find(item => item._id === id)
    }

    if (pathname.includes('orders')) {
      return userOrders.find(item => item._id === id)
    }
  }, [orders, userOrders, id, pathname]);

  if (orders.length > 0 && !order) {
    setTimeout(() => { // задержка для поиска по массиву заказов
      return <Navigate to={'/404'} />
    }, 100)
  }

  if (order) {
    return (
      <main className={`${styles.container}`}>
        <Order order={order}/>
      </main>
    )
  }
}

export default OrderPage;