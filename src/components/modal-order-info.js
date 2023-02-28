import React, {useMemo} from 'react';
import Modal from './modal/modal';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Order from './order/order';

const ModalOrderInfo = () => {
  const { orders } = useSelector(state => state.orders);
  const { userOrders } = useSelector(state => state.userOrders);
  const { id } = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const order = useMemo(() => {
    if (pathname.includes('feed')) {
      return orders.find(item => item._id === id)
    }

    if (pathname.includes('orders')) {
      return userOrders.find(item => item._id === id)
    }
  }, [orders, userOrders, id, pathname]);

  const onModalClose = () => {
    navigate(-1);
  }

  if (orders.length > 0 && !order) {
    setTimeout(() => { // задержка для поиска по массиву заказов
      return null
    }, 100)
  }

  return (
    <Modal onClose={onModalClose} >
      <Order order={order} />
    </Modal>
  )
}

export default ModalOrderInfo;