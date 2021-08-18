import joi from "joi";

export const ValidateUserId = (userId) => {
  const Schema = joi.object({
    _id: joi.string().required(),
  });

  return Schema.validateAsync(userId);
};
export const ValidateUserData = (userData) => {
  const Schema = joi.object({
    userData: joi.string().required(),
  });

  return Schema.validateAsync(userData);
};