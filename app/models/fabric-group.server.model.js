'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * FabricGroup Schema
 */
var FabricGroupSchema = new Schema({
	
  
  code: {
		type: String,
		required: 'Please fill code name'
	},
  
  fabricGroup: {
		type: String,
		required: 'Please fill fabricGroup name'
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

mongoose.model('FabricGroup', FabricGroupSchema);