import React, {useEffect, useMemo, useRef} from 'react';
import styles from './feed.module.css';
import OrderCard from '../components/order-card/order-card';
import { useDispatch, useSelector } from 'react-redux';
import { WS_ORDERS_CLOSE, WS_ORDERS_START } from '../services/actions/ws-orders';
import { Loader } from '../ui/loader/loader';
import { wsUrlOrders } from '../services/store';

const createArrayOfArrays = (bigArr, size) => {
  const arr = [];
  while (bigArr.length) {
    arr.push(bigArr.splice(0, size));
  }
  return arr;
}

const FeedPage = () => {
  const dispatch = useDispatch();
  const { wsOrdersConnected, orders, total, totalToday } = useSelector(state => state.orders);
  const isSecondRender = useRef(false);

  const ready = useMemo(() => orders.filter(order => order.status === 'done'), [orders]);
  const pending = useMemo(() => orders.filter(order => order.status === 'pending'), [orders]);

  const size = 10;
  const arrayOfReadyArrays = useMemo(() => createArrayOfArrays(ready, size), [ready]);
  const arrayOfPendingArrays = useMemo(() => createArrayOfArrays(pending, size), [pending]);

  useEffect(() => {
    wsOrdersConnected && dispatch({ type: WS_ORDERS_CLOSE });
    isSecondRender.current && dispatch({ type: WS_ORDERS_START, payload: '/all' });
    isSecondRender.current = true;

    return () => {
      dispatch({ type: WS_ORDERS_CLOSE });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className={'container pt-10'}>
      <h1 className="main__title text text_type_main-large mb-5">Лента заказов</h1>
      {
        orders.length > 0 ?
          (
            <div className={styles.content}>
              <section>
                <ul className={`${styles.list} scroll pr-2`}>
                  {orders.map((order, index) => (
                    <li className={'mb-4'} key={index}>
                      <OrderCard data={order} path={'/feed/'} />
                    </li>
                  ))}
                </ul>
              </section>
              <section className={styles.statistics}>
                <div className={`${styles.status}`}>
                  <div className={styles.status__column}>
                    <h2 className={`${styles.status__title} text text_type_main-medium mb-2`}>Готовы:</h2>
                    {
                      arrayOfReadyArrays.map((columnArr, index) => (
                        <ul className={`${styles.status__list} ${styles.status__list_ready}`} key={index}>
                          {
                            columnArr.map((order, index) => (
                              <li className={'text text_type_digits-default mb-2'} key={order._id}>{order.number}</li>
                            ))
                          }
                        </ul>
                      ))
                    }
                  </div>
                  <div className={styles.status__column}>
                    <h2 className="text text_type_main-medium mb-6">В работе:</h2>
                    {
                      arrayOfPendingArrays.map((columnArr, index) => (
                        <ul className={`${styles.status__list}`} key={index}>
                          {
                            columnArr.map((order, index) => (
                              <li className={'text text_type_digits-default mb-2'} key={order._id}>{order.number}</li>
                            ))
                          }
                        </ul>
                      ))
                    }
                  </div>
                </div>
                <h2 className="text text_type_main-medium mt-15">Выполнено за всё время:</h2>
                <p className="text text_type_digits-large">{total.toLocaleString()}</p>
                <h2 className="text text_type_main-medium mt-15">Выполнено за сегодня:</h2>
                <p className="text text_type_digits-large">{totalToday}</p>
              </section>
            </div>
          ) :
          <Loader size={'large'}/>
      }

    </main>
  )
}

export default FeedPage;