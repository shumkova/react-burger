import React, {useCallback, useEffect} from "react";
import { Link } from "react-router-dom";
import styles from './order-card.module.css'
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {SET_ACTIVE_ORDER} from "../../services/actions/ws";

const images = [
  "https://code.s3.yandex.net/react/code/bun-02.png",
  "https://code.s3.yandex.net/react/code/bun-01.png",
  "https://code.s3.yandex.net/react/code/meat-03.png",
  "https://code.s3.yandex.net/react/code/meat-02.png",
  "https://code.s3.yandex.net/react/code/meat-04.png",
  "https://code.s3.yandex.net/react/code/bun-02.png",
  "https://code.s3.yandex.net/react/code/bun-01.png",
  "https://code.s3.yandex.net/react/code/meat-03.png",
];

const OrderCard = ({ data }) => {
  const { ingredients } = useSelector(state => state.ingredients);
  const dispatch = useDispatch();

  let orderIngredients = [];

  if (data.ingredients) {
    data.ingredients.forEach(item => {
      const ingredient = ingredients.find(ing => ing._id === item);
      if (ingredient) {
        orderIngredients.push(ingredient);
      }
    });
  }

  const trimmedIngredients = [...orderIngredients].splice(5 );


  if (orderIngredients.length > 0) {
    return (
      <Link to={`${data._id}`} className={`${styles.container} p-6`}>
        <div className={`${styles.main}`}>
          <p className="text text_type_digits-default">#{data.number}</p>
          <p className="text text_type_main-default text_color_inactive">
            <FormattedDate date={new Date(data.createdAt)} />
          </p>
        </div>

        <h2 className="text text_type_main-medium mt-6 mb-6">{data.name}</h2>

        <div className={styles.details}>
          <ul className={styles.ingredients}>
            {
              orderIngredients.map((item, index) => {
                return index < 5 ? (
                  <li className={styles.ingredient} style={{zIndex: '-' + index}}>
                    <img className={'round-image'} src={item.image} key={index} alt={'ingredient'}/>
                  </li>
                ) : ''
              })
            }
            {
              trimmedIngredients.length > 0 && (
                <li className={`${styles.ingredient} ${styles.ingredient_more}`} style={{zIndex: '-'+images.length}}>
                  <span className={`${styles.count} text text text_type_main-default`}>{'+' + trimmedIngredients.length}</span>
                  <img className={'round-image'} src={trimmedIngredients[0].image} key={images.length} alt={'ingredient'}/>
                </li>
              )
            }
          </ul>
          <p className={`${styles.price} text text_type_digits-default`}>
            {/*{data.price}*/}
            {orderIngredients.reduce((acc, current) => acc + current.price, 0)}
            <CurrencyIcon type="primary" />
          </p>
        </div>

      </Link>
    )
  }


}

export default OrderCard;