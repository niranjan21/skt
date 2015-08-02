'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * GeneralItemOutwardEntry Schema
 */
var GeneralItemOutwardEntrySchema = new Schema({
	
  
  deliveryChalanNo: {
		type: Number,
		required: 'Please fill deliveryChalanNo name'
	},
  
  deliveryChalanYear: {
		type: Number,
		required: 'Please fill deliveryChalanYear name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  deliveryTo: {
		type: String,
		required: 'Please fill deliveryTo name'
	},
  
  sNo: {
		type: Number,
		required: 'Please fill sNo name'
	},
  
  nameoftheItem: {
		type: String,
		required: 'Please fill nameoftheItem name'
	},
  
  uOm: {
		type: Number,
		required: 'Please fill uOm name'
	},
  
  quantity: {
		type: Number,
		required: 'Please fill quantity name'
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

mongoose.model('GeneralItemOutwardEntry', GeneralItemOutwardEntrySchema);