'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * GeneralInvoiceRegister Schema
 */
var GeneralInvoiceRegisterSchema = new Schema({
	
  
  invoiceNo: {
		type: Number,
		required: 'Please fill invoiceNo name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  party: {
		type: String,
		required: 'Please fill party name'
	},
  
  amount: {
		type: Number,
		required: 'Please fill amount name'
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

mongoose.model('GeneralInvoiceRegister', GeneralInvoiceRegisterSchema);