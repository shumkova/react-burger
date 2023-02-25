import React from "react";
import { Link } from "react-router-dom";
import styles from './order-card.module.css'
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

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
  const dateFromServer = '2023-02-24T17:33:32.877Z';

  const trimmedImages = [...images].splice(5 );
  console.log(trimmedImages.length);


  return (
    <Link to={''} className={`${styles.container} p-6`}>
      <div className={`${styles.main}`}>
        <p className="text text_type_digits-default">#034535</p>
        <p className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(dateFromServer)} />
        </p>
      </div>

      <h2 className="text text_type_main-medium mt-6 mb-6">Death Star Starship Main бургер</h2>

      <div className={styles.details}>
        <ul className={styles.ingredients}>
          {
            images.map((image, index) => {
              return index < 5 ? (
                <li className={styles.ingredient} style={{zIndex: '-' + index}}>
                  <img className={styles.image} src={image} key={index} alt={'ingredient'}/>
                </li>
              ) : ''
            })
          }
          {
            trimmedImages.length > 0 && (
              <li className={`${styles.ingredient} ${styles.ingredient_more}`} style={{zIndex: '-'+images.length}}>
                <span className={`${styles.count} text text text_type_main-default`}>{'+' + trimmedImages.length}</span>
                <img className={styles.image} src={trimmedImages[0]} key={images.length} alt={'ingredient'}/>
              </li>
            )
          }
        </ul>
        <p className={`${styles.price} text text_type_digits-default`}>
          {/*{data.price}*/}
          480
          <CurrencyIcon type="primary" />
        </p>
      </div>

    </Link>
  )
}

export default OrderCard;