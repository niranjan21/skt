'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * NeedlesInwardRegister Schema
 */
var NeedlesInwardRegisterSchema = new Schema({
	
  
  receiptNo: {
		type: String,
		required: 'Please fill receiptNo name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  party: {
		type: String,
		required: 'Please fill party name'
	},
  
  deliveryChallanNo: {
		type: String,
		required: 'Please fill deliveryChallanNo name'
	},
  
  itemDescription: {
		type: String,
		required: 'Please fill itemDescription name'
	},
  
  receivedQuantity: {
		type: Number,
		required: 'Please fill receivedQuantity name'
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

mongoose.model('NeedlesInwardRegister', NeedlesInwardRegisterSchema);