const express = require('express');
const auth = require('../../middlewares/auth'); //in this file we are checking role and token
const validate = require('../../middlewares/validate');
const clinicValidation = require('../../validations/clinic.validation');
const clinicController = require('../../controllers/clinic.controller');

//import upload middleware
const upload = require('../../middlewares/upload');

const router = express.Router();

//to upload multiple file
/*
router
  .route('/')
  .post(auth('createClinics'),upload.array("clinic_image[]"), validate(clinicValidation.createClinic), clinicController.createClinic)
  .get(auth('getClinics'), validate(clinicValidation.getClinics), clinicController.getClinics);

*/
router
  .route('/')
  .get(auth('getClinics'), validate(clinicValidation.getClinics), clinicController.getClinics)
  .post(auth('createClinics'),upload.single("clinic_image"), validate(clinicValidation.createClinic), clinicController.createClinic);
 

router
  .route('/:clinicId')
  .get(auth('getClinics'), validate(clinicValidation.getClinics), clinicController.getClinics)
  .patch(auth('updateClinics'),upload.single("clinic_image"), validate(clinicValidation.updateClinics), clinicController.updateClinic)
  .delete(auth('deleteClinics'), validate(clinicValidation.deleteClinics), clinicController.deleteClinic);
  module.exports = router;