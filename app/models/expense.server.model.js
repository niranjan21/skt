'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Expense Schema
 */
var ExpenseSchema = new Schema({
	
  
  code: {
		type: String,
		required: 'Please fill code name'
	},
  
  expenseDescription: {
		type: String,
		required: 'Please fill expenseDescription name'
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

mongoose.model('Expense', ExpenseSchema);