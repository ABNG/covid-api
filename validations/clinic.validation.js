const Joi = require('joi');
const { objectId } = require('./custom.validation');

//you can define default value here or in mongo scheme. but for update you need to define default value here.
const createClinic = {
  body: Joi.object().keys({
    clinic_name: Joi.string().required(),
    // clinic_image: Joi.string().empty("").default(() => undefined), //because we validate image inside upload.js
    rating: Joi.number().empty("").default(() => undefined),
    lat: Joi.number().required(),
    lon: Joi.number().required(),
    test_type: Joi.string().empty("").default(() => undefined),
    swab: Joi.string().empty("").default(() => undefined),
    blood: Joi.string().empty("").default(() => undefined),
    vip: Joi.string().empty("").default(() => undefined),
    contact: Joi.string().required(),
    email: Joi.string().empty("").default(() => undefined),
  }),
};

const getClinics = {
  query: Joi.object().keys({
    clinic_name: Joi.string(),
    clinic_image: Joi.string(),
    rating: Joi.number(),
    lat: Joi.number(),
    lon: Joi.number(),
    test_type: Joi.string(),
    test_price: Joi.number(),
    swab: Joi.string(),
    blood: Joi.string(),
    vip: Joi.string(),
    contact: Joi.string(),
    email: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updateClinics = {
  params: Joi.object().keys({
    clinicId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      clinic_name: Joi.string().required(),
    // clinic_image: Joi.string().empty("").default(() => undefined), //because we validate image inside upload.js
    rating: Joi.number().empty("").default(() => 0.0),
    lat: Joi.number().required(),
    lon: Joi.number().required(),
    test_type: Joi.string().empty("").default(() => "swab"),
    swab: Joi.string().empty("").default(() => "0"),
    blood: Joi.string().empty("").default(() => "0"),
    vip: Joi.string().empty("").default(() => "0"),
    contact: Joi.string().required(),
    email: Joi.string().empty("").default(() => null),
    })
    .min(1),
};

const deleteClinics = {
  params: Joi.object().keys({
    clinicId: Joi.string().custom(objectId),
  }),
};


module.exports = {
    createClinic,
    getClinics,
    updateClinics,
    deleteClinics,

  };