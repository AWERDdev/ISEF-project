const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CompanySchema = new Schema({
  CompanyName: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  CompanyType: {
    type: String,
    required: true,
    trim: true
  },
  AdministratorName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  role: {
    type: String,
    default: 'Company',
    enum: ['Company']
  },
  phone: {
    type: String,
    trim: true,
    required: true
  },
  password:{
    type:String,
    trim:true,
    required:true
  },
  MedicalLicense:{
    type: Number,
    trim:true,
    required:true,
    unique:true
  }, 
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  COMPID: {
    type: ObjectId,
    default: () => new mongoose.Types.ObjectId(),
    unique: true
  }
});

// Update the updatedAt field before saving
CompanySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.models.Company || mongoose.model('Company', CompanySchema);

