import PropTypes from "prop-types";

export const ingredientPropTypes = PropTypes.shape({
  '_id': PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  'image_mobile': PropTypes.string,
  'image_large': PropTypes.string,
  '__v': PropTypes.number,
})