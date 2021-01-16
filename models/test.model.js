const mongoose = require('mongoose');
const { toJSON } = require('./plugins');
const patientSchema= require('./patient.model');
const mongoosePaginate = require('mongoose-paginate-v2');

const testSchema = mongoose.Schema(
    {
      test_type: {
        type: String,
        required: true,
      },
      test_status: {
        type: Number,
        default: 0,
      },
      test_date_time: {
        type: String,
        default:"00:00",
      },
      test_token: {
        type: String,
        default:"null",
      },
      day:{
          type: String,
          required: true,
      },
      time:{
        type: String,
        required: true,
    },
   patient: {
     type: patientSchema,
    required: true},
clinic_id:{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Clinic',
  required: true,
},
    },
    {
      timestamps: true,
    }
  );
  
  // add plugin that converts mongoose to json
  testSchema.plugin(toJSON);
  testSchema.plugin(mongoosePaginate);
  
  /**
   * @typedef Test
   */
  const Test = mongoose.model('Test', testSchema);
  
  module.exports = Test;
  