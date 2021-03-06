'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Marketing Schema
 */
var MarketingSchema = new Schema({
	
  
  code: {
		type: String,
		required: 'Please fill code name'
	},
  
  nameOftheMarketing: {
		type: String,
		required: 'Please fill nameOftheMarketing name'
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

mongoose.model('Marketing', MarketingSchema);