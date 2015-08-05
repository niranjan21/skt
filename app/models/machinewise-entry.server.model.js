'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * MachinewiseEntry Schema
 */
var MachinewiseEntrySchema = new Schema({
	
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  shift: {
		type: String,
		required: 'Please fill shift name'
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
  
  sNo: {
		type: Number,
		required: 'Please fill sNo name'
	},
  
  jobNo: {
		type: String,
		required: 'Please fill jobNo name'
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
  
  requirement: {
		type: String,
		required: 'Please fill requirement name'
	},
  
  kgs: {
		type: Number,
		required: 'Please fill kgs name'
	},
  
  production: {
		type: Number,
		required: 'Please fill production name'
	},
  
  rolls: {
		type: Number,
		required: 'Please fill rolls name'
	},
  
  productionKgs: {
		type: Number,
		required: 'Please fill productionKgs name'
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

mongoose.model('MachinewiseEntry', MachinewiseEntrySchema);