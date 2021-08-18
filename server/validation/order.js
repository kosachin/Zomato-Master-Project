import joi from "joi";

export const ValidateOrderId = (orderObj) => {
  const Schema = joi.object({
    _id: joi.string().required(),
  });

  return Schema.validateAsync(menuObj);
};

// Validation for add new order