'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * YarnReturn Schema
 */
var YarnReturnSchema = new Schema({
	
  
  jobNo: {
		type: String,
		required: 'Please fill jobNo name'
	},
  
  party: {
		type: String,
		required: 'Please fill party name'
	},
  
  partyDcno: {
		type: String,
		required: 'Please fill partyDcno name'
	},
  
  dcdate: {
		type: Date,
		required: 'Please fill dcdate name'
	},
  
  ourDeliveryChallan: {
		type: String,
		required: 'Please fill ourDeliveryChallan name'
	},
  
  sNo: {
		type: Number,
		required: 'Please fill sNo name'
	},
  
  yarnDescription: {
		type: String,
		required: 'Please fill yarnDescription name'
	},
  
  sentBags: {
		type: Number,
		required: 'Please fill sentBags name'
	},
  
  sentKgs: {
		type: Number,
		required: 'Please fill sentKgs name'
	},
  
  returnBags: {
		type: Number,
		required: 'Please fill returnBags name'
	},
  
  returnKgs: {
		type: Number,
		required: 'Please fill returnKgs name'
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

mongoose.model('YarnReturn', YarnReturnSchema);