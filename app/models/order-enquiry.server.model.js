'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * OrderEnquiry Schema
 */
var OrderEnquirySchema = new Schema({
	
  
  enquiryNo: {
		type: String,
		required: 'Please fill enquiryNo name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  party: {
		type: String,
		required: 'Please fill party name'
	},
  
  concern: {
		type: String,
		required: 'Please fill concern name'
	},
  
  orderReference: {
		type: String,
		required: 'Please fill orderReference name'
	},
  
  attn: {
		type: String,
		required: 'Please fill attn name'
	},
  
  fabricType: {
		type: String,
		required: 'Please fill fabricType name'
	},
  
  receiver: {
		type: String,
		required: 'Please fill receiver name'
	},
  
  counts: {
		type: String,
		required: 'Please fill counts name'
	},
  
  dia: {
		type: Number,
		required: 'Please fill dia name'
	},
  
  samplingCharges: {
		type: Number,
		required: 'Please fill samplingCharges name'
	},
  
  knittingRatePerKg: {
		type: Number,
		required: 'Please fill knittingRatePerKg name'
	},
  
  paymentTerms: {
		type: String,
		required: 'Please fill paymentTerms name'
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

mongoose.model('OrderEnquiry', OrderEnquirySchema);