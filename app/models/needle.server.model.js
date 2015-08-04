'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Needle Schema
 */
var NeedleSchema = new Schema({
	
  
  code: {
		type: String,
		required: 'Please fill code name'
	},
  
  needleName: {
		type: String,
		required: 'Please fill needleName name'
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

mongoose.model('Needle', NeedleSchema);