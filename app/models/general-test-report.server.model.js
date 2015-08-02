'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * GeneralTestReport Schema
 */
var GeneralTestReportSchema = new Schema({
	
  
  from: {
		type: String,
		required: 'Please fill from name'
	},
  
  to: {
		type: String,
		required: 'Please fill to name'
	},
  
  reportNo: {
		type: Number,
		required: 'Please fill reportNo name'
	},
  
  jobNo: {
		type: Number,
		required: 'Please fill jobNo name'
	},
  
  partyOrderReference: {
		type: String,
		required: 'Please fill partyOrderReference name'
	},
  
  approvedSignatory: {
		type: String,
		required: 'Please fill approvedSignatory name'
	},
  
  authorisedSignatory: {
		type: String,
		required: 'Please fill authorisedSignatory name'
	},
  
  count: {
		type: String,
		required: 'Please fill count name'
	},
  
  mill: {
		type: String,
		required: 'Please fill mill name'
	},
  
  noofCones: {
		type: Number,
		required: 'Please fill noofCones name'
	},
  
  grossWtinCone: {
		type: Number,
		required: 'Please fill grossWtinCone name'
	},
  
  grossWtinKithan: {
		type: Number,
		required: 'Please fill grossWtinKithan name'
	},
  
  netWtinKgs: {
		type: Number,
		required: 'Please fill netWtinKgs name'
	},
  
  fabricProduced: {
		type: String,
		required: 'Please fill fabricProduced name'
	},
  
  balanceYarnNetWeight: {
		type: Number,
		required: 'Please fill balanceYarnNetWeight name'
	},
  
  shortageinKgs: {
		type: Number,
		required: 'Please fill shortageinKgs name'
	},
  
  lossinpercentage: {
		type: Number,
		required: 'Please fill lossinpercentage name'
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

mongoose.model('GeneralTestReport', GeneralTestReportSchema);