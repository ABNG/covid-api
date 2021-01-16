const httpStatus = require('http-status');
const { Test } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a test
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createTest = async (testBody) => {
 
  const test = await Test.create(testBody);
  return test;
};


const queryTests = async (query, options) => {
  const tests = await Test.paginate(query,options);
  return tests;
};



module.exports = {
  createTest,
  queryTests,
};
