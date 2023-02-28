import React from 'react';
import { useSelector } from "react-redux";
import OrderCard from '../components/order-card/order-card';

const OrdersPage = () => {
  const { userOrders, wsUserOrdersConnected } = useSelector(state => state.userOrders);


  if (wsUserOrdersConnected && userOrders.length === 0) {
    return (
      <p>Вы ещё ничего у нас не заказывали</p>
    )
  }

  return (
    <section>
      <ul className={`scroll pr-2`}>
        {userOrders.map((order, index) => (
          <li className={'mb-4'} key={index}>
            <OrderCard data={order} link={'/profile/orders/'}/>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default OrdersPage;