const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');
const generatePassword = require('password-generator');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
const path = require("path");
const ejs = require("ejs");

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, html,password,id) => {
  const msg = { from: config.email.from, to, subject, html };
  
  await transport.sendMail(msg,async (err,data)=>{
    if(err){
      throw new ApiError(httpStatus.UNAUTHORIZED, 'E-mail Service Failed.');
    }
    else{
        try{
       await userService.updateUserById(id,{ password: password });
        }catch (error) {
          throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed:');
        }
    }
  });
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to) => {
  const user=await userService.getUserByEmail(to);
  if(!user){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed: please check email');
  }
  else{
  const password=generatePassword(8);
  const name=path.dirname('views');
  const data = await ejs.renderFile(name + "/views/email.template.ejs", { username: user.name,
  password: password });
  const subject = 'Reset password';
  const html = data;

  await sendEmail(to, subject, html,password,user.id);
  }
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
};
