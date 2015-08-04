'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Stoppage Schema
 */
var StoppageSchema = new Schema({
	
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  code: {
		type: String,
		required: 'Please fill code name'
	},
  
  stoppageReason: {
		type: String,
		required: 'Please fill stoppageReason name'
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

mongoose.model('Stoppage', StoppageSchema);