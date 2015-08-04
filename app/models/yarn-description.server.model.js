'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * YarnDescription Schema
 */
var YarnDescriptionSchema = new Schema({
	
  
  code: {
		type: String,
		required: 'Please fill code name'
	},
  
  yarnDescription: {
		type: String,
		required: 'Please fill yarnDescription name'
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

mongoose.model('YarnDescription', YarnDescriptionSchema);