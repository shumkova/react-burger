import React, { useEffect } from 'react';
import styles from './feed.module.css';
import OrderCard from '../components/order-card/order-card';
import Modal from "../components/modal/modal";
import Order from "../components/order/order";
import {useDispatch, useSelector} from "react-redux";
import {WS_CONNECTION_START_ALL} from "../services/actions/ws";

const FeedPage = () => {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector(state => state.orders);
  const ready = orders.filter(order => order.status === 'done');

  useEffect(() => {
    dispatch({type: WS_CONNECTION_START_ALL});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (orders.length) {
    return (
      <main className={'container pt-10'}>
        <h1 className="main__title text text_type_main-large mb-5">Лента заказов</h1>
        <div className={styles.content}>
          <section>
            <ul className={`${styles.list} scroll pr-2`}>
              {orders.map(order => (
                <li className={'mb-4'} key={order._id}>
                  <OrderCard data={order}/>
                </li>
              ))}
            </ul>
          </section>
          <section className={styles.statistics}>
            <div className={`${styles.status}`}>
              <div className={styles.status__column}>
                <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
                <ul className={`${styles.status__list} ${styles.status__list_ready}`}>
                  {
                    ready && ready.map(order => (
                      <li className={'text text_type_digits-default mb-2'} key={order._id}>{order.number}</li>
                    ))
                  }
                </ul>
              </div>
              <div className={styles.status__column}>
                <h2 className="text text_type_main-medium mb-6">В работе:</h2>
                <ul className={styles.status__list}>
                  <li className={'text text_type_digits-default mb-2'}>034533</li>
                  <li className={'text text_type_digits-default mb-2'}>034532</li>
                </ul>
              </div>
            </div>
            <h2 className="text text_type_main-medium mt-15">Выполнено за всё время:</h2>
            <p className="text text_type_digits-large">{total}</p>
            <h2 className="text text_type_main-medium mt-15">Выполнено за сегодня:</h2>
            <p className="text text_type_digits-large">{totalToday}</p>
          </section>
        </div>

        {/*<Modal onClose={() => {}}>*/}
        {/*  <Order />*/}
        {/*</Modal>*/}
      </main>
    )
  }

}

export default FeedPage;