'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Invoice Schema
 */
var InvoiceSchema = new Schema({
	
  
  invoiceNo: {
		type: Number,
		required: 'Please fill invoiceNo name'
	},
  
  invoiceDate: {
		type: Date,
		required: 'Please fill invoiceDate name'
	},
  
  knitter: {
		type: String,
		required: 'Please fill knitter name'
	},
  
  jobNo: {
		type: Number,
		required: 'Please fill jobNo name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  party: {
		type: String,
		required: 'Please fill party name'
	},
  
  deliveryNo: {
		type: Number,
		required: 'Please fill deliveryNo name'
	},
  
  deliveryDate: {
		type: Date,
		required: 'Please fill deliveryDate name'
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

mongoose.model('Invoice', InvoiceSchema);