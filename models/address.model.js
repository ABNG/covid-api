const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const addressSchema = mongoose.Schema(
    {
      lat: {
        type: Number,
        required: true,
      },
      lon: {
        type: Number,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      building:{
          type: String,
          required: true,
      },
      apt:{
        type: String,
        required: true,
    },
    },
    {
      timestamps: true,
    },
    { minimize: false }
  );
  
  // add plugin that converts mongoose to json
  addressSchema.plugin(toJSON);
  // addressSchema.plugin(paginate);
  
  /**
   * @typedef Address
   */
  // const Address = mongoose.model('Address', addressSchema); always comment this line if you make it as subdocument
  
  module.exports = addressSchema;
  