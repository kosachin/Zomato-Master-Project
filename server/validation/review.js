import joi from "joi";

export const ValidateFoodReview = (reviewObj) => {
  const Schema = joi.object({
    reviewData: joi.string().required(),
  });

  return Schema.validateAsync(reviewObj);
};
export const ValidateFoodReviewId = (reviewObj) => {
  const Schema = joi.object({
    _id: joi.string().required(),
  });

  return Schema.validateAsync(reviewObj);
};