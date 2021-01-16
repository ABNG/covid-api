const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { clinicService } = require('../services');

const createClinic = catchAsync(async (req, res) => {
    const clinic = await clinicService.createClinic(req);
    res.status(httpStatus.CREATED).send(clinic);
  });
  
  const getClinics = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['clinic_name']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await clinicService.queryClinics(filter, options);
    res.send(result);  //to get user id from token   req.user.id
  });

  const updateClinic = catchAsync(async (req, res) => {
    const clinic = await clinicService.updateClinicById(req.params.clinicId, req);
    res.send(clinic);
  });

  const deleteClinic = catchAsync(async (req, res) => {
    await clinicService.deleteClinicById(req.params.clinicId);
    res.status(httpStatus.OK).send({"msg": "Clinic Deleted Successfully"});
  });
  
module.exports = {
    createClinic,
    getClinics,
    updateClinic,
    deleteClinic,
  };