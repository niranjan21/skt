'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * GeneralItemInwardEntry Schema
 */
var GeneralItemInwardEntrySchema = new Schema({
	
  
  grnno: {
		type: Number,
		required: 'Please fill grnno name'
	},
  
  grnyear: {
		type: Number,
		required: 'Please fill grnyear name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  ourDcno: {
		type: Number,
		required: 'Please fill ourDcno name'
	},
  
  yourDcno: {
		type: Number,
		required: 'Please fill yourDcno name'
	},
  
  receivedFrom: {
		type: String,
		required: 'Please fill receivedFrom name'
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

mongoose.model('GeneralItemInwardEntry', GeneralItemInwardEntrySchema);