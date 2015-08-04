'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * PartyAllot Schema
 */
var PartyAllotSchema = new Schema({
	
  
  partyName: {
		type: String,
		required: 'Please fill partyName name'
	},
  
  knitter: {
		type: String,
		required: 'Please fill knitter name'
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

mongoose.model('PartyAllot', PartyAllotSchema);