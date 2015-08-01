'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * StoppagesEntry Schema
 */
var StoppagesEntrySchema = new Schema({
	
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  shift: {
		type: String,
		required: 'Please fill shift name'
	},
  
  machineCode: {
		type: Number,
		required: 'Please fill machineCode name'
	},
  
  stoppageReason: {
		type: String,
		required: 'Please fill stoppageReason name'
	},
  
  stopInMinutes: {
		type: Number,
		required: 'Please fill stopInMinutes name'
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

mongoose.model('StoppagesEntry', StoppagesEntrySchema);