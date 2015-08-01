'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * OutwardEntry Schema
 */
var OutwardEntrySchema = new Schema({
	
  
  deliveryTo: {
		type: String,
		required: 'Please fill deliveryTo name'
	},
  
  deliveryChalanNo: {
		type: Number,
		required: 'Please fill deliveryChalanNo name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  receiver: {
		type: String,
		required: 'Please fill receiver name'
	},
  
  sNo: {
		type: Number,
		required: 'Please fill sNo name'
	},
  
  nameOfTheItem: {
		type: String,
		required: 'Please fill nameOfTheItem name'
	},
  
  uOm: {
		type: Number,
		required: 'Please fill uOm name'
	},
  
  issued: {
		type: String,
		required: 'Please fill issued name'
	},
  
  jobNo: {
		type: Number,
		required: 'Please fill jobNo name'
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

mongoose.model('OutwardEntry', OutwardEntrySchema);