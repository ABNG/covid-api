const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const clinicRoute = require('./clinic.route');
const testRoute= require('./test.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/clinic', clinicRoute);
router.use('/test',testRoute);

module.exports = router;
