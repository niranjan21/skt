'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * GeneralItemOutwardRegister Schema
 */
var GeneralItemOutwardRegisterSchema = new Schema({
	
  
  deliveryChalanNo: {
		type: Number,
		required: 'Please fill deliveryChalanNo name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  jobNo: {
		type: Number,
		required: 'Please fill jobNo name'
	},
  
  sentTo: {
		type: String,
		required: 'Please fill sentTo name'
	},
  
  itemDescription: {
		type: String,
		required: 'Please fill itemDescription name'
	},
  
  quantity: {
		type: Number,
		required: 'Please fill quantity name'
	},
  
  uOm: {
		type: Number,
		required: 'Please fill uOm name'
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

mongoose.model('GeneralItemOutwardRegister', GeneralItemOutwardRegisterSchema);