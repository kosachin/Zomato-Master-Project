import joi from "joi";

export const ValidateUploadImage = (image) => {
    const Schema = joi.object({
      file: joi
      .array()
      .items(joi.object({ location: joi.string().required()}))
    });
    
    return Schema.validateAsync(image);
}
  