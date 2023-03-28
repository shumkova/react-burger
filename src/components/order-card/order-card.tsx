import React, { useMemo, useCallback, FC, MouseEventHandler } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './order-card.module.css'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { formatIngredients, countOrderSum, orderStatus } from '../order-info/order-info-utils';
import { TOrder } from '../../services/types/data';
import { useAppSelector } from '../../services/hooks';

interface IOrderCard {
  data: TOrder;
  path: string;
}

const OrderCard: FC<IOrderCard> = ({ data , path }) => {
  const { ingredients } = useAppSelector(state => state.ingredients);
  const navigate = useNavigate();
  const location = useLocation();
  const isUser = location.pathname.includes('orders');

  const orderIngredients = useMemo(() => {
    return formatIngredients(data.ingredients, ingredients);
  }, [ingredients, data.ingredients]);

  const sum = useMemo(() => countOrderSum(orderIngredients), [orderIngredients]);
  const trimmedIngredients = useMemo(() => [...orderIngredients].splice(5 ), [orderIngredients]);

  const UTCOffset = useMemo(() => new Date(data.createdAt).getTimezoneOffset() / 60, [data.createdAt]);
  const GMTString = useMemo(() => `i-GMT${UTCOffset > 0 ? '-' : '+'}${Math.abs(UTCOffset)}`, [UTCOffset]);

  const handleClick: MouseEventHandler = useCallback((evt) => {
    evt.preventDefault();
    navigate(path + data._id, {state: {...location.state, backgroundLocation: location}});
  }, [navigate, data._id, path, location]);

  return (
    <Link
      to={`${data._id}`}
      onClick={handleClick}
      className={`${styles.container} p-6`}
    >
      <div className={`${styles.main}`}>
        <p className="text text_type_digits-default">#{data.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(data.createdAt)} /> {GMTString}
        </p>
      </div>
      <h2 className="text text_type_main-medium mt-6 mb-2">{data.name}</h2>
      {
        isUser && <p className={`text text_type_main-default mb-2 ${data.status === 'done' ? styles.status_ready : ''}`}>{orderStatus[data.status]}</p>
      }
      <div className={`${styles.details} mt-4`}>
        <ul className={styles.ingredients}>
          {
            orderIngredients.map((item, index) => {
              return index < 5 ? (
                <li className={styles.ingredient} style={{zIndex: '-' + index}} key={index}>
                  <img className={'round-image'} src={item.image} key={index} alt={'ingredient'}/>
                </li>
              ) : ''
            })
          }
          {
            trimmedIngredients.length > 0 && (
              <li className={`${styles.ingredient} ${styles.ingredient_more}`} style={{zIndex: '-'+ orderIngredients.length}}>
                <span className={`${styles.count} text text text_type_main-default`}>{'+' + trimmedIngredients.length}</span>
                <img className={'round-image'} src={trimmedIngredients[0].image} key={trimmedIngredients.length} alt={'ingredient'}/>
              </li>
            )
          }
        </ul>
        <p className={`${styles.price} text text_type_digits-default`}>
          {sum}
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </Link>
  )
}

export default OrderCard;