import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ingredient.module.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OrderInfo from '../components/order-info/order-info';
import { WS_ORDERS_CLOSE, WS_ORDERS_START, WS_USER_ORDERS_START, WS_USER_ORDERS_CLOSE } from '../services/actions/ws-orders';
import Modal from '../components/modal/modal';
import { Loader } from '../ui/loader/loader';
import PropTypes from 'prop-types';
import { getCookie } from '../utils/cookie';

const OrderPage = ({ privatePage = false, modal= false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wsOrdersConnected, wsUserOrdersConnected, orders, userOrders } = useSelector(state => state.orders);
  const [ order, setOrder ] = useState(null);
  const { id } = useParams();
  const isSecondRender = useRef(false);

  useEffect(() => {
    if (!modal) {
      wsOrdersConnected && dispatch({ type: WS_ORDERS_CLOSE });
      wsUserOrdersConnected && dispatch({ type: WS_USER_ORDERS_CLOSE });

      privatePage ?
        isSecondRender.current && dispatch({ type: WS_USER_ORDERS_START, payload: '?token=' + getCookie('accessToken') }) :
        isSecondRender.current && dispatch({ type: WS_ORDERS_START, payload: '/all' });

      isSecondRender.current = true;

      return () => {
        dispatch({ type: WS_ORDERS_CLOSE });
        dispatch({ type: WS_USER_ORDERS_CLOSE });
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    privatePage ?
      setOrder(userOrders.find(item => item._id === id)) :
      setOrder(orders.find(item => item._id === id));
  }, [userOrders, orders, id, privatePage]);


  if (orders.length > 0 && !order) {
    setTimeout(() => { // задержка для поиска по массиву заказов
      return <Navigate to={'/404'} />
    }, 100)
  }

  const onModalClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return order ?
    modal ?
      (
        <Modal onClose={onModalClose} >
          <OrderInfo order={order} />
        </Modal>
      )
    : (
        <main className={`${styles.container} container`}>
          <OrderInfo order={order}/>
        </main>
      )
    : <Loader size={'large'}/>
}

OrderPage.propTypes = ({
  privatePage: PropTypes.bool,
  modal: PropTypes.bool
})

export default OrderPage;