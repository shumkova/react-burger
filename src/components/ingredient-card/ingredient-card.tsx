import React, { FC, MouseEventHandler } from 'react';
import styles from './ingredient-card.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { BUN } from '../../utils/consts';
import { TIngredient } from "../../services/types/data";
import { useLocation, useNavigate } from 'react-router-dom';

interface IIngredientCard {
  data: TIngredient;
}

const IngredientCard: FC<IIngredientCard> = ({ data }) => {
  const id = data._id;
  const chosenBun = data.type === BUN && data.__v > 0;
  const navigate = useNavigate();
  const location = useLocation();

  const [, dragRef] = useDrag({
    type: data.type,
    item: {id}
  });

  const handleCardClick: MouseEventHandler<HTMLDivElement> = (evt) => {
    navigate(`/ingredients/${id}`, {state: {...location.state, backgroundLocation: location}});
  }

  return (
    <div
      className={`${styles.container} ${chosenBun && styles.disabled}`}
      data-ingredient={id}
      {...(!chosenBun && { ref: dragRef })}
      onClick={handleCardClick}
    >
      <div className={styles.info}>
        <div className={styles.wrapper}>
          <picture>
            <source media="(max-width: 767px)" srcSet={data['image_mobile']}/>
            <img className={styles.img} src={data.image} alt={data.name}/>
          </picture>
        </div>
        <p className={`${styles.price} text text_type_digits-default mt-2 mb-2`}>
          {data.price}
          <CurrencyIcon type="primary" />
        </p>
        <h3 className={`${styles.name} text text_type_main-default`}>{data.name}</h3>
      </div>
      {
        data.__v > 0 && <Counter count={data.__v} size="default" extraClass="m-1" />
      }
    </div>
  )
}

export default IngredientCard;