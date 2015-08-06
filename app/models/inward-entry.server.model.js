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
  
  grnno: {
		type: String,
		required: 'Please fill grnno name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  deliveryChallanNo: {
		type: String,
		required: 'Please fill deliveryChallanNo name'
	},
  
  sNo: {
		type: Number,
		required: 'Please fill sNo name'
	},
  
  nameoftheItem: {
		type: String,
		required: 'Please fill nameoftheItem name'
	},
  
  uom: {
		type: Number,
		required: 'Please fill uom name'
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
		type: String,
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