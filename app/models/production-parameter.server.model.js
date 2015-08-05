'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * ProductionParameter Schema
 */
var ProductionParameterSchema = new Schema({
	
  
  jobNo: {
		type: String,
		required: 'Please fill jobNo name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  party: {
		type: String,
		required: 'Please fill party name'
	},
  
  sno: {
		type: Number,
		required: 'Please fill sno name'
	},
  
  design: {
		type: String,
		required: 'Please fill design name'
	},
  
  colour: {
		type: String,
		required: 'Please fill colour name'
	},
  
  rate: {
		type: Number,
		required: 'Please fill rate name'
	},
  
  texture: {
		type: String,
		required: 'Please fill texture name'
	},
  
  gsm: {
		type: Number,
		required: 'Please fill gsm name'
	},
  
  lLength: {
		type: Number,
		required: 'Please fill lLength name'
	},
  
  gG: {
		type: Number,
		required: 'Please fill gG name'
	},
  
  mill: {
		type: String,
		required: 'Please fill mill name'
	},
  
  count: {
		type: String,
		required: 'Please fill count name'
	},
  
  dia: {
		type: Number,
		required: 'Please fill dia name'
	},
  
  programmeQty: {
		type: Number,
		required: 'Please fill programmeQty name'
	},
  
  averageProductionPerHour: {
		type: Number,
		required: 'Please fill averageProductionPerHour name'
	},
  
  rpm: {
		type: Number,
		required: 'Please fill rpm name'
	},
  
  counting: {
		type: String,
		required: 'Please fill counting name'
	},
  
  feeder: {
		type: String,
		required: 'Please fill feeder name'
	},
  
  rollWeight: {
		type: Number,
		required: 'Please fill rollWeight name'
	},
  
  remarks: {
		type: String,
		required: 'Please fill remarks name'
	},
  
  
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('ProductionParameter', ProductionParameterSchema);