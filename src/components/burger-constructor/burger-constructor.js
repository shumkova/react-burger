import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientPropTypes} from "../../utils/proptypes";

class BurgerConstructor extends React.Component {
  render () {
    const {bun, inner} = this.props;
    let innerElements = null;

    if (inner.length) {
      innerElements = inner.map((item, index) => {
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
          {bun && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image}
              extraClass={'ml-8 mb-4'}
            />
          )}

          {innerElements && (
            <ul className={`${styles.inner}`}>
              {innerElements}
            </ul>
          )}

          {bun && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name}
              price={bun.price}
              thumbnail={bun.image}
              extraClass={'ml-8 mt-4'}
            />
          )}
      </div>
    )
  }
}

BurgerConstructor.propTypes = {
  bun: ingredientPropTypes,
  inner: PropTypes.arrayOf(ingredientPropTypes),
}

export default BurgerConstructor;
