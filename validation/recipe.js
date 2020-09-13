const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRecipeInput(data) {
  let errors = {};

  data.dish = !isEmpty(data.dish) ? data.dish : "";
  data.intro = !isEmpty(data.intro) ? data.intro : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.picture = !isEmpty(data.picture) ? data.picture : "";

  if (Validator.isEmpty(data.dish)) {
    errors.dish = "Dish name field is required";
  }

  if (Validator.isEmpty(data.intro)) {
    errors.intro = "Please provide a short intro";
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = "Please describe your dish";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
