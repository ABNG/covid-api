const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send({ user });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const token = await tokenService.generateAuthTokens(user);
  res.send({ user, token, });
});

const forgotPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.body.email, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await emailService.sendResetPasswordEmail(req.body.email);
  res.status(httpStatus.OK).send({"msg":"reset password email send successfully"});
});

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};
