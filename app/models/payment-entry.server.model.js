'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * PaymentEntry Schema
 */
var PaymentEntrySchema = new Schema({
	
  
  journalNo: {
		type: Number,
		required: 'Please fill journalNo name'
	},
  
  journalDate: {
		type: Date,
		required: 'Please fill journalDate name'
	},
  
  party: {
		type: String,
		required: 'Please fill party name'
	},
  
  knitter: {
		type: String,
		required: 'Please fill knitter name'
	},
  
  amount: {
		type: Number,
		required: 'Please fill amount name'
	},
  
  mode: {
		type: String,
		required: 'Please fill mode name'
	},
  
  by: {
		type: String,
		required: 'Please fill by name'
	},
  
  number: {
		type: Number,
		required: 'Please fill number name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  drawnOn: {
		type: String,
		required: 'Please fill drawnOn name'
	},
  
  remarks: {
		type: String,
		required: 'Please fill remarks name'
	},
  
  receivedBy: {
		type: String,
		required: 'Please fill receivedBy name'
	},
  
  preparedBy: {
		type: String,
		required: 'Please fill preparedBy name'
	},
  
  authorisedBy: {
		type: String,
		required: 'Please fill authorisedBy name'
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

mongoose.model('PaymentEntry', PaymentEntrySchema);