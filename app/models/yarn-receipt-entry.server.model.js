'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * YarnReceiptEntry Schema
 */
var YarnReceiptEntrySchema = new Schema({
	
  
  jobNo: {
		type: Number,
		required: 'Please fill jobNo name'
	},
  
  jobDate: {
		type: Date,
		required: 'Please fill jobDate name'
	},
  
  party: {
		type: String,
		required: 'Please fill party name'
	},
  
  expectedDeliveryDate: {
		type: Date,
		required: 'Please fill expectedDeliveryDate name'
	},
  
  order: {
		type: String,
		required: 'Please fill order name'
	},
  
  sample: {
		type: String,
		required: 'Please fill sample name'
	},
  
  orderNo: {
		type: Number,
		required: 'Please fill orderNo name'
	},
  
  marketingBy: {
		type: String,
		required: 'Please fill marketingBy name'
	},
  
  knitter: {
		type: String,
		required: 'Please fill knitter name'
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
  
  partyDeliveryChalanNo: {
		type: Number,
		required: 'Please fill partyDeliveryChalanNo name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  receivedVehicleNo: {
		type: Number,
		required: 'Please fill receivedVehicleNo name'
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
  
  sNo: {
		type: Number,
		required: 'Please fill sNo name'
	},
  
  yarnDescription: {
		type: String,
		required: 'Please fill yarnDescription name'
	},
  
  cones: {
		type: Number,
		required: 'Please fill cones name'
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
  
  
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('YarnReceiptEntry', YarnReceiptEntrySchema);