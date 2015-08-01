'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * ExpenseEntry Schema
 */
var ExpenseEntrySchema = new Schema({
	
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  sNo: {
		type: Number,
		required: 'Please fill sNo name'
	},
  
  particulars: {
		type: String,
		required: 'Please fill particulars name'
	},
  
  amount: {
		type: Number,
		required: 'Please fill amount name'
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

mongoose.model('ExpenseEntry', ExpenseEntrySchema);