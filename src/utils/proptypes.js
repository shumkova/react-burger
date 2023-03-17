import PropTypes from 'prop-types';

export const ingredientPropTypes = PropTypes.shape({
  '_id': PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  'image_mobile': PropTypes.string.isRequired,
  'image_large': PropTypes.string.isRequired,
  '__v': PropTypes.number.isRequired,
});

export const constructorIngredientsPropTypes = PropTypes.shape({
  bun: ingredientPropTypes,
  filling: PropTypes.arrayOf(ingredientPropTypes).isRequired
});

export const orderPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  status: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired
})