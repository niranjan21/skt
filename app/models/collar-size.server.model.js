'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * CollarSize Schema
 */
var CollarSizeSchema = new Schema({
	
  
  sno: {
		type: Number,
		required: 'Please fill sno name'
	},
  
  add: {
		type: String,
		required: 'Please fill add name'
	},
  
  permissibleSizeList: {
		type: String,
		required: 'Please fill permissibleSizeList name'
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

mongoose.model('CollarSize', CollarSizeSchema);