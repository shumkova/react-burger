import React from 'react';
import styles from './ingredient.module.css';
import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Order from "../components/order/order";

const OrderPage = () => {
  return (
    <main className={`${styles.container}`}>
      <Order />
    </main>
  )
}

export default OrderPage;