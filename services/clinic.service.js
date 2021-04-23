const httpStatus = require('http-status');
const { Clinic } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} req
 * @returns {Promise<User>}
 */
const createClinic = async (req) => {
  const clinic = new Clinic({
    clinic_name: req.body.clinic_name,
    rating: req.body.rating,
    lat: req.body.lat,
    lon: req.body.lon,
    test_type: req.body.test_type,
    swab: req.body.swab,
    blood: req.body.blood,
    vip: req.body.vip,
    contact: req.body.contact,
    email: req.body.email,
  });
  if(req.file){
    clinic.clinic_image=req.file.path.substring(7).replace('\\','/');
  } 
  /*
  //to upload multiple files
if(req.files){
    let path='';
    req.files.forEach((files,index,arr)=>{
      path=path+files.path.replace('\\','/')+',';
    });
    path=path.substring(0,path.lastIndexOf(",")); //remove last comma
    clinic.clinic_image=path;
  } 
  */
  await clinic.save();
  return clinic;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryClinics = async (filter, options) => {
  const clinics = await Clinic.paginate(filter, options);
  return clinics;
};
const getClinicById = async (id) => {
  return Clinic.findById(id);
};

const updateClinicById = async (clinicId, req) => {
  const clinic = await getClinicById(clinicId);
  if (!clinic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Clinic not found');
  }
  Object.assign(clinic, {
    clinic_name: req.body.clinic_name,
    rating: req.body.rating,
    lat: req.body.lat,
    lon: req.body.lon,
    test_type: req.body.test_type,
    swab: req.body.swab,
    blood: req.body.blood,
    vip: req.body.vip,
    contact: req.body.contact,
    email: req.body.email,
    clinic_image: req.file ? req.file.path.substring(7).replace('\\','/'):null,
  });
  await clinic.save();
  return clinic;
};

const deleteClinicById = async (clinicId) => {
  const clinic = await getClinicById(clinicId);
  if (!clinic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Clinic not found');
  }
  await clinic.remove();
  return clinic;
};

module.exports = {
    createClinic,
    queryClinics,
    updateClinicById,
    deleteClinicById,
  };