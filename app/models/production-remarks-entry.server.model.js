'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * ProductionRemarksEntry Schema
 */
var ProductionRemarksEntrySchema = new Schema({
	
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  shift: {
		type: String,
		required: 'Please fill shift name'
	},
  
  machineDia: {
		type: String,
		required: 'Please fill machineDia name'
	},
  
  machine: {
		type: String,
		required: 'Please fill machine name'
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

mongoose.model('ProductionRemarksEntry', ProductionRemarksEntrySchema);