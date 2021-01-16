const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createTest = {
  body: Joi.object().keys({
    test_type: Joi.string().required(),
    test_status: Joi.number().integer().required(),
    test_date_time: Joi.string().empty("").default(() => undefined),
    //test_token: Joi.string().empty("").default(() => undefined),
    day:Joi.string().required(),
    time:Joi.string().required(),
    patient:Joi.object().keys({
    user_name:Joi.string().required(),
    email: Joi.string().email().empty("").default(() => undefined),
    emirate_id:Joi.string().required(),
    mobile_number: Joi.string().required(),
    address:Joi.object().keys({
      lat: Joi.number().required(),
      lon: Joi.number().required(),
      address: Joi.string().required(),
      city:Joi.string().required(),
      building:Joi.string().required(),
      apt:Joi.string().required(),
    }).empty("").default(()=>undefined),
    }).required(),
    clinic_id: Joi.string().required().custom(objectId),
  }),
};

const getTests = {
  query: Joi.object().keys({
    test_type: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createTest,
  getTests,
};
