'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * LeaveMaster Schema
 */
var LeaveMasterSchema = new Schema({
	
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  day: {
		type: String,
		required: 'Please fill day name'
	},
  
  shift: {
		type: String,
		required: 'Please fill shift name'
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

mongoose.model('LeaveMaster', LeaveMasterSchema);