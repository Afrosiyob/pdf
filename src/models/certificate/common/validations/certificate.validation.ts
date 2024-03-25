import Joi from 'joi';

const query = Joi.object().keys({
  language: Joi.string().valid('uz', 'oz', 'ru', 'en').default('ru'),
  page: Joi.string().valid('main', 'specializations').default('main'),
  download: Joi.string().allow('')
});

export default {
  get: {
    params: Joi.object().keys({
      id: Joi.number().integer().required()
    }),
    query
  },
  getByUUid: {
    params: Joi.object().keys({
      uuid: Joi.string().required()
    }),
    query
  }
};
