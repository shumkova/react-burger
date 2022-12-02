import React from "react";
import styles from "./ingredient-types.module.css";
import Ingredient from "../ingredient/ingredient";

class IngredientTypes extends React.Component {
  render() {
    const {title, sectionList} = this.props;

    return (
      <section className={styles.type}>
        <h2 className={`${styles.title} text text_type_main-medium mb-6`}>{title}</h2>
        <ul className={`${styles.list} pl-4 pr-2`}>
          {sectionList.map((item, index) => {
            return (
              <li className={styles.item} key={index} tabIndex={0}>
                <Ingredient data={item} />
              </li>
            )
          })}
        </ul>
      </section>
    )
  }
}

export default IngredientTypes;