const Joi = require("joi");

const taskAddSchema = Joi.object({
  activity: Joi.string().required(),
  type: Joi.string().required(),
  accessibility: Joi.number().required(),
  price: Joi.number().required(),
  image: Joi.string(),
}).messages({
  "any.required": "missing fields",
});

module.exports = {
  taskAddSchema,
};
