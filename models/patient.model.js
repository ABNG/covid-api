const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const addressSchema= require('./address.model');

const patientSchema = mongoose.Schema(
    {
    user_name:{
      type: String,
      required: true,
  },
  email:{
    type: String,
    default:"null"
},
emirate_id:{
  type: String,
  required: true,
},
mobile_number:{
  type: String,
  required: true,
},
address: {
  type: addressSchema,
  default: null,  
},
    },
    {
      timestamps: true,
    },
    { minimize: false }
  );
  
  // add plugin that converts mongoose to json
  patientSchema.plugin(toJSON);
  // patientSchema.plugin(paginate);
  
  /**
   * @typedef Patient
   */
  // const Patient = mongoose.model('Patient', patientSchema); always comment this line if you make it as subdocument
  
  module.exports = patientSchema;
  