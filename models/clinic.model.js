const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const clinicSchema = mongoose.Schema(
    {
      clinic_name: {
        type: String,
        required: true,
        trim: true,
      },
      clinic_image: {
        type: String,
        default: "null"
      },
      rating: {
        type: Number,
        default:0.0,
      },
      lat: {
        type: Number,
        required: true,
      },
      lon:{
          type: Number,
          required: true,
      },
      test_type:{
        type: String,
        default:"swab"
    },
    swab:{
      type: String,
      default:"0"
  },
  blood:{
    type: String,
    default:"0"
},
vip:{
  type: String,
  default:"0"
},
contact:{
  type: String,
  required: true,
},
email:{
  type: String,
  default: null,
},
    },
    {
      timestamps: true,
    },
  );
  
  // add plugin that converts mongoose to json
  clinicSchema.plugin(toJSON);
  clinicSchema.plugin(paginate);
  
  /**
   * @typedef Clinic
   */
  const Clinic = mongoose.model('Clinic', clinicSchema);
  
  module.exports = Clinic;
  