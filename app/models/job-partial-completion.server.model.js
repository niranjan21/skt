'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * JobPartialCompletion Schema
 */
var JobPartialCompletionSchema = new Schema({
	
  
  jobNo: {
		type: String,
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
  
  expectedDeliveryDate: {
		type: Date,
		required: 'Please fill expectedDeliveryDate name'
	},
  
  orderNo: {
		type: String,
		required: 'Please fill orderNo name'
	},
  
  marketingBy: {
		type: String,
		required: 'Please fill marketingBy name'
	},
  
  sNo: {
		type: Number,
		required: 'Please fill sNo name'
	},
  
  design: {
		type: String,
		required: 'Please fill design name'
	},
  
  colour: {
		type: String,
		required: 'Please fill colour name'
	},
  
  rate: {
		type: Number,
		required: 'Please fill rate name'
	},
  
  dIA: {
		type: Number,
		required: 'Please fill dIA name'
	},
  
  requiredQty: {
		type: Number,
		required: 'Please fill requiredQty name'
	},
  
  closedOrOpen: {
		type: String,
		required: 'Please fill closedOrOpen name'
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

mongoose.model('JobPartialCompletion', JobPartialCompletionSchema);