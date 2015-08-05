'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * AllowanceEntry Schema
 */
var AllowanceEntrySchema = new Schema({
	
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  employeeCode: {
		type: String,
		required: 'Please fill employeeCode name'
	},
  
  employeeName: {
		type: String,
		required: 'Please fill employeeName name'
	},
  
  allowance: {
		type: Number,
		required: 'Please fill allowance name'
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

mongoose.model('AllowanceEntry', AllowanceEntrySchema);