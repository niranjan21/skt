'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * InwardEntry Schema
 */
var InwardEntrySchema = new Schema({
	
  
  receivedFrom: {
		type: String,
		required: 'Please fill receivedFrom name'
	},
  
  goodsReceiptNo: {
		type: Number,
		required: 'Please fill goodsReceiptNo name'
	},
  
  inwardDate: {
		type: Date,
		required: 'Please fill inwardDate name'
	},
  
  deliveryChalanNo: {
		type: Number,
		required: 'Please fill deliveryChalanNo name'
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
  
  rate: {
		type: Number,
		required: 'Please fill rate name'
	},
  
  received: {
		type: String,
		required: 'Please fill received name'
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

mongoose.model('InwardEntry', InwardEntrySchema);