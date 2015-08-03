'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * DiaList Schema
 */
var DiaListSchema = new Schema({
	
  
  sno: {
		type: Number,
		required: 'Please fill sno name'
	},
  
  permissibleDiaList: {
		type: String,
		required: 'Please fill permissibleDiaList name'
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

mongoose.model('DiaList', DiaListSchema);