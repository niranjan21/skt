'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * ProductionTestEntry Schema
 */
var ProductionTestEntrySchema = new Schema({
	
  
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
  
  count: {
		type: String,
		required: 'Please fill count name'
	},
  
  mill: {
		type: String,
		required: 'Please fill mill name'
	},
  
  numberofCones: {
		type: Number,
		required: 'Please fill numberofCones name'
	},
  
  grossWeight: {
		type: Number,
		required: 'Please fill grossWeight name'
	},
  
  netWeight: {
		type: Number,
		required: 'Please fill netWeight name'
	},
  
  fabricProduced: {
		type: Number,
		required: 'Please fill fabricProduced name'
	},
  
  balanceYarnNetWeight: {
		type: Number,
		required: 'Please fill balanceYarnNetWeight name'
	},
  
  shortageKgs: {
		type: Number,
		required: 'Please fill shortageKgs name'
	},
  
  inPercentage: {
		type: String,
		required: 'Please fill inPercentage name'
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

mongoose.model('ProductionTestEntry', ProductionTestEntrySchema);