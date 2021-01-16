const express = require('express');
const auth = require('../../middlewares/auth'); //in this file we are checking role and token
const validate = require('../../middlewares/validate');
const testValidation = require('../../validations/test.validation');
const testController = require('../../controllers/test.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(testValidation.createTest), testController.createTest)
  .get(auth(), validate(testValidation.getTests), testController.getTests);

module.exports = router;