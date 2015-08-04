'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * BulkNeedleChangeEntry Schema
 */
var BulkNeedleChangeEntrySchema = new Schema({
	
  
  machineCode: {
		type: String,
		required: 'Please fill machineCode name'
	},
  
  machineMake: {
		type: String,
		required: 'Please fill machineMake name'
	},
  
  dia: {
		type: String,
		required: 'Please fill dia name'
	},
  
  mark: {
		type: String,
		required: 'Please fill mark name'
	},
  
  lastBulkNeedlechanged: {
		type: Date,
		required: 'Please fill lastBulkNeedlechanged name'
	},
  
  allowedKgs: {
		type: Number,
		required: 'Please fill allowedKgs name'
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

mongoose.model('BulkNeedleChangeEntry', BulkNeedleChangeEntrySchema);