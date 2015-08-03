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
  
  nameoftheMarketing: {
		type: String,
		required: 'Please fill nameoftheMarketing name'
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