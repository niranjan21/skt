'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * RollwiseEntry Schema
 */
var RollwiseEntrySchema = new Schema({
	
  
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
  
  fabric: {
		type: String,
		required: 'Please fill fabric name'
	},
  
  operator: {
		type: String,
		required: 'Please fill operator name'
	},
  
  rollNo: {
		type: Number,
		required: 'Please fill rollNo name'
	},
  
  weight: {
		type: Number,
		required: 'Please fill weight name'
	},
  
  holes: {
		type: String,
		required: 'Please fill holes name'
	},
  
  lycraCut: {
		type: String,
		required: 'Please fill lycraCut name'
	},
  
  puVari: {
		type: String,
		required: 'Please fill puVari name'
	},
  
  shutoff: {
		type: String,
		required: 'Please fill shutoff name'
	},
  
  needleLine: {
		type: String,
		required: 'Please fill needleLine name'
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

mongoose.model('RollwiseEntry', RollwiseEntrySchema);