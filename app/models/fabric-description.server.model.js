'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * FabricDescription Schema
 */
var FabricDescriptionSchema = new Schema({
	
  
  code: {
		type: String,
		required: 'Please fill code name'
	},
  
  fabricDescription: {
		type: String,
		required: 'Please fill fabricDescription name'
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

mongoose.model('FabricDescription', FabricDescriptionSchema);