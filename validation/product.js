const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProductInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'This field is required';
  }

  if (!Validator.isLength(data.name, { min: 3, max: 140 })) {
    errors.name = 'Name must be from 3 to 140 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
