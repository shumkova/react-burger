import React from "react";
import styles from "./burger-constructor.module.css";
import {ConstructorElement, CurrencyIcon, DragIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";

class BurgerConstructor extends React.Component {
  render () {
    const {ingredients} = this.props;
    let innerIngredients;

    if (ingredients.other.length) {
      innerIngredients = ingredients.other.map((item, index) => {
        return (
          <li className={styles.item} key={index}>
            <button className={styles.drug} type="button"><DragIcon type={"primary"} /></button>
            <ConstructorElement text={item.name} thumbnail={item.image} price={item.price} />
          </li>
        );
      })
    }

    return (
      <div className={`${styles.burgerConstructor} pl-4 pb-5`}>
          {ingredients.bun && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={ingredients.bun.name}
              price={ingredients.bun.price}
              thumbnail={ingredients.bun.image}
              extraClass={'ml-8'}
            />
          )}

          {ingredients.other.length && (
            <ul className={`${styles.inner} mt-4 mb-4`}>
              {innerIngredients}
            </ul>
          )}

          {ingredients.bun && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={ingredients.bun.name}
              price={ingredients.bun.price}
              thumbnail={ingredients.bun.image}
              extraClass={'ml-8'}
            />
          )}
      </div>
    )
  }
}

export default BurgerConstructor;
