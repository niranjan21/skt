'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * BillEntry Schema
 */
var BillEntrySchema = new Schema({
	
  
  outsideKnitter: {
		type: String,
		required: 'Please fill outsideKnitter name'
	},
  
  billNo: {
		type: String,
		required: 'Please fill billNo name'
	},
  
  billDate: {
		type: Date,
		required: 'Please fill billDate name'
	},
  
  jobNo: {
		type: String,
		required: 'Please fill jobNo name'
	},
  
  amount: {
		type: Number,
		required: 'Please fill amount name'
	},
  
  partyDeliveryChallanNo: {
		type: String,
		required: 'Please fill partyDeliveryChallanNo name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  inwardKgs: {
		type: Number,
		required: 'Please fill inwardKgs name'
	},
  
  include: {
		type: String,
		required: 'Please fill include name'
	},
  
  remarks: {
		type: String,
		required: 'Please fill remarks name'
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

mongoose.model('BillEntry', BillEntrySchema);