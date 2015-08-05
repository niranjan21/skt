'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * ShiftEntry Schema
 */
var ShiftEntrySchema = new Schema({
	
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  shift: {
		type: String,
		required: 'Please fill shift name'
	},
  
  code: {
		type: String,
		required: 'Please fill code name'
	},
  
  employeeName: {
		type: String,
		required: 'Please fill employeeName name'
	},
  
  numberOfShifts: {
		type: Number,
		required: 'Please fill numberOfShifts name'
	},
  
  overTimeHours: {
		type: Number,
		required: 'Please fill overTimeHours name'
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

mongoose.model('ShiftEntry', ShiftEntrySchema);