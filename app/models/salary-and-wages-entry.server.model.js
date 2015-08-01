'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * SalaryAndWagesEntry Schema
 */
var SalaryAndWagesEntrySchema = new Schema({
	
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  wages: {
		type: Number,
		required: 'Please fill wages name'
	},
  
  salary: {
		type: Number,
		required: 'Please fill salary name'
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

mongoose.model('SalaryAndWagesEntry', SalaryAndWagesEntrySchema);