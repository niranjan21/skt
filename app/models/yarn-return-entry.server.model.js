'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * YarnReturnEntry Schema
 */
var YarnReturnEntrySchema = new Schema({
	
  
  returnDeliveryChalanNo: {
		type: Number,
		required: 'Please fill returnDeliveryChalanNo name'
	},
  
  returnDeliveryChalanDate: {
		type: Date,
		required: 'Please fill returnDeliveryChalanDate name'
	},
  
  jobNo: {
		type: Number,
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
  
  party: {
		type: String,
		required: 'Please fill party name'
	},
  
  partyDeliveryChalanNo: {
		type: Number,
		required: 'Please fill partyDeliveryChalanNo name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  vehicleNo: {
		type: Number,
		required: 'Please fill vehicleNo name'
	},
  
  remarks: {
		type: String,
		required: 'Please fill remarks name'
	},
  
  mistakeClotheKgs: {
		type: String,
		required: 'Please fill mistakeClotheKgs name'
	},
  
  sNo: {
		type: Number,
		required: 'Please fill sNo name'
	},
  
  yarnDescription: {
		type: String,
		required: 'Please fill yarnDescription name'
	},
  
  receivedBags: {
		type: Number,
		required: 'Please fill receivedBags name'
	},
  
  receivedWeightKgs: {
		type: Number,
		required: 'Please fill receivedWeightKgs name'
	},
  
  returnCones: {
		type: Number,
		required: 'Please fill returnCones name'
	},
  
  returnBags: {
		type: Number,
		required: 'Please fill returnBags name'
	},
  
  returnKgsNet: {
		type: Number,
		required: 'Please fill returnKgsNet name'
	},
  
  returnKgsGross: {
		type: Number,
		required: 'Please fill returnKgsGross name'
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

mongoose.model('YarnReturnEntry', YarnReturnEntrySchema);