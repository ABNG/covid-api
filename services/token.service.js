const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const config = require('../config/config');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
  };
  return jwt.sign(payload, secret,{expiresIn: '1d'}); //set any expire time like 1s,1m,1h,1d, or 365d. or remove 'iat' and 'expiresIn' property.
};

/** 
 * check client side, does inAppStorage/sharedPref contains token. 
 * make token expiry time 90 days.
 * check during fetch product if response=="please authenticate"
 * reload the login page and remove the token
*/

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
const generateAuthTokens = async (user) => {
  const accessToken = generateToken(user.id);

  return accessToken;
};


module.exports = {
  generateToken,
  generateAuthTokens,
};
