'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * ProductionReport Schema
 */
var ProductionReportSchema = new Schema({
	
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  shift: {
		type: String,
		required: 'Please fill shift name'
	},
  
  sNo: {
		type: Number,
		required: 'Please fill sNo name'
	},
  
  machineNo: {
		type: String,
		required: 'Please fill machineNo name'
	},
  
  dia: {
		type: Number,
		required: 'Please fill dia name'
	},
  
  make: {
		type: String,
		required: 'Please fill make name'
	},
  
  jobOrderNo: {
		type: String,
		required: 'Please fill jobOrderNo name'
	},
  
  party: {
		type: String,
		required: 'Please fill party name'
	},
  
  operator: {
		type: String,
		required: 'Please fill operator name'
	},
  
  fabric: {
		type: String,
		required: 'Please fill fabric name'
	},
  
  gsm: {
		type: Number,
		required: 'Please fill gsm name'
	},
  
  lLength: {
		type: Number,
		required: 'Please fill lLength name'
	},
  
  production: {
		type: String,
		required: 'Please fill production name'
	},
  
  rolls: {
		type: Number,
		required: 'Please fill rolls name'
	},
  
  kgs: {
		type: Number,
		required: 'Please fill kgs name'
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

mongoose.model('ProductionReport', ProductionReportSchema);