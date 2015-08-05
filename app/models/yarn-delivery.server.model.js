'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * YarnDelivery Schema
 */
var YarnDeliverySchema = new Schema({
	
  
  dCNo: {
		type: String,
		required: 'Please fill dCNo name'
	},
  
  dCDate: {
		type: Date,
		required: 'Please fill dCDate name'
	},
  
  party: {
		type: String,
		required: 'Please fill party name'
	},
  
  jobNo: {
		type: String,
		required: 'Please fill jobNo name'
	},
  
  jobDate: {
		type: Date,
		required: 'Please fill jobDate name'
	},
  
  knitter: {
		type: String,
		required: 'Please fill knitter name'
	},
  
  sNo: {
		type: Number,
		required: 'Please fill sNo name'
	},
  
  description: {
		type: String,
		required: 'Please fill description name'
	},
  
  colour: {
		type: String,
		required: 'Please fill colour name'
	},
  
  code: {
		type: String,
		required: 'Please fill code name'
	},
  
  rate: {
		type: Number,
		required: 'Please fill rate name'
	},
  
  gSM: {
		type: Number,
		required: 'Please fill gSM name'
	},
  
  lLength: {
		type: Number,
		required: 'Please fill lLength name'
	},
  
  gG: {
		type: Number,
		required: 'Please fill gG name'
	},
  
  mill: {
		type: String,
		required: 'Please fill mill name'
	},
  
  count: {
		type: String,
		required: 'Please fill count name'
	},
  
  dIA: {
		type: Number,
		required: 'Please fill dIA name'
	},
  
  programmeKgs: {
		type: Number,
		required: 'Please fill programmeKgs name'
	},
  
  requiredKgs: {
		type: Number,
		required: 'Please fill requiredKgs name'
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

mongoose.model('YarnDelivery', YarnDeliverySchema);