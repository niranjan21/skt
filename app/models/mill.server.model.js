'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Mill Schema
 */
var MillSchema = new Schema({
	
  
  code: {
		type: String,
		required: 'Please fill code name'
	},
  
  millName: {
		type: String,
		required: 'Please fill millName name'
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

mongoose.model('Mill', MillSchema);