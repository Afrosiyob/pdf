import Joi from 'joi';

module.exports = {
  get: {
    params: Joi.object().keys({
      id: Joi.number().integer().required(),
    }),
    query: Joi.object().keys({
      language: Joi.string().valid('uz', 'oz', 'ru', 'en').default('ru'),
      download: Joi.string().allow(''),
    }),
  },
};
