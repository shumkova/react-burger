import React from "react";
import styles from "./ingredient.module.css"
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";

class Ingredient extends React.Component {
  render() {
    const {data} = this.props;

    return (
      (
        <div className={styles.ingredient}>
          <div className={styles.wrapper}>
            <picture>
              <source media="(max-width: 767px)" srcSet={data["image_mobile"]}/>
              <img className={styles.img} src={data.image} alt={data.name}/>
            </picture>
          </div>
          <p className={`${styles.price} text text_type_digits-default mt-2 mb-2`}>
            {data.price}
            <CurrencyIcon type="primary" />
          </p>
          <h3 className={`${styles.name} text text_type_main-default`}>{data.name}</h3>
          <Counter count={1} size="default" extraClass="m-1" />
        </div>
      )
    )
  }
}

export default Ingredient;