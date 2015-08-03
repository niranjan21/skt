'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * FixedRate Schema
 */
var FixedRateSchema = new Schema({
	
  
  party: {
		type: String,
		required: 'Please fill party name'
	},
  
  fabric: {
		type: String,
		required: 'Please fill fabric name'
	},
  
  rate: {
		type: Number,
		required: 'Please fill rate name'
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

mongoose.model('FixedRate', FixedRateSchema);