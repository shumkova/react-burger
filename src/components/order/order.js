import React, {useEffect, useState, useMemo} from "react";
import styles from './order.module.css';
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {WS_CONNECTION_START_ALL} from "../../services/actions/ws";
import {BUN} from "../../utils/consts";

const orderStatus = {
  done: 'Выполнен',
}

const Order = () => {
  const { orders } = useSelector(state => state.orders);
  const { wsConnected } = useSelector(state => state.orders);
  const { ingredients } = useSelector(state => state.ingredients);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!wsConnected) {
      dispatch({
        type: WS_CONNECTION_START_ALL
      })
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setOrder(orders.find(item => item._id === id));
  }, [orders]);

  const orderIngredients = useMemo(() => {
    const arr = [];
    if (order && order?.ingredients) {
      order.ingredients.forEach(item => {
        const ingredient = ingredients.find(ing => ing._id === item);
        if (ingredient) {
          arr.push(ingredient);
        }
      });
    }
    return arr;
  }, [order, ingredients]);

  const totalPrice = useMemo(() => {
    return orderIngredients.reduce((acc, current) => acc + current.price, 0)
  }, [orderIngredients]);

  if (order) {
    console.log(order)
    console.log(orderIngredients)
    return (
      <section>
        <p className={`${styles.id} text text_type_digits-default mb-10`}>#{order.number}</p>
        <h1 className="text text_type_main-medium mb-3">{order.name}</h1>
        <p className={`${styles.status} ${order.status === 'done' ? styles.status_success : ''} text text_type_main-default mb-15`}>{orderStatus[order.status]}</p>
        <h2 className="text text_type_main-medium mb-6">Состав:</h2>
        <ul className={`${styles.list} scroll mb-10`}>
          {
            orderIngredients.map(item => (
              <li className={'mb-4'} key={item._id}>
                <div className={styles.ingredient}>
                  <img className={'round-image'} src={item.image} alt={item.name}/>
                  <h3 className={'text text_type_main-default ml-4 mr-4'}>{item.name}</h3>
                  <div className={`${styles.ingredient__price} text text_type_digits-default`}>
                    <p>{item.type === BUN ? 2 : 1}&nbsp;x&nbsp;{item.price}</p>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              </li>
            ))
          }

        </ul>
        <div className={styles.footer}>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date('2023-02-24T17:33:32.877Z')} />
          </p>
          <p className={`${styles.price} text text_type_digits-default`}>
            {totalPrice}
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </section>
    )
  }

};

export default Order;