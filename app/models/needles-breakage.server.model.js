'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * NeedlesBreakage Schema
 */
var NeedlesBreakageSchema = new Schema({
	
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  shift: {
		type: String,
		required: 'Please fill shift name'
	},
  
  machineCode: {
		type: String,
		required: 'Please fill machineCode name'
	},
  
  employee: {
		type: String,
		required: 'Please fill employee name'
	},
  
  needleType: {
		type: String,
		required: 'Please fill needleType name'
	},
  
  brokenNeedles: {
		type: String,
		required: 'Please fill brokenNeedles name'
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

mongoose.model('NeedlesBreakage', NeedlesBreakageSchema);