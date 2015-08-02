'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * DirectInwardEntry Schema
 */
var DirectInwardEntrySchema = new Schema({
	
  
  knitter: {
		type: String,
		required: 'Please fill knitter name'
	},
  
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
  
  inwardFrom: {
		type: String,
		required: 'Please fill inwardFrom name'
	},
  
  returnable: {
		type: String,
		required: 'Please fill returnable name'
	},
  
  nonReturnable: {
		type: String,
		required: 'Please fill nonReturnable name'
	},
  
  ourReference: {
		type: String,
		required: 'Please fill ourReference name'
	},
  
  partyReference: {
		type: String,
		required: 'Please fill partyReference name'
	},
  
  vehicle: {
		type: String,
		required: 'Please fill vehicle name'
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

mongoose.model('DirectInwardEntry', DirectInwardEntrySchema);