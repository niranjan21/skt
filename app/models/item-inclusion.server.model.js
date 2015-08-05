'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * ItemInclusion Schema
 */
var ItemInclusionSchema = new Schema({
	
  
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
  
  orderNo: {
		type: String,
		required: 'Please fill orderNo name'
	},
  
  sNo: {
		type: Number,
		required: 'Please fill sNo name'
	},
  
  itemDescription: {
		type: String,
		required: 'Please fill itemDescription name'
	},
  
  bags: {
		type: Number,
		required: 'Please fill bags name'
	},
  
  netKgs: {
		type: Number,
		required: 'Please fill netKgs name'
	},
  
  grossKgs: {
		type: Number,
		required: 'Please fill grossKgs name'
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

mongoose.model('ItemInclusion', ItemInclusionSchema);