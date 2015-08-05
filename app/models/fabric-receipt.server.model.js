'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * FabricReceipt Schema
 */
var FabricReceiptSchema = new Schema({
	
  
  jobNo: {
		type: String,
		required: 'Please fill jobNo name'
	},
  
  party: {
		type: String,
		required: 'Please fill party name'
	},
  
  partyDeliveryChallanNo: {
		type: String,
		required: 'Please fill partyDeliveryChallanNo name'
	},
  
  deliveryChallanDate: {
		type: Date,
		required: 'Please fill deliveryChallanDate name'
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
  
  balanceQtyKgs: {
		type: Number,
		required: 'Please fill balanceQtyKgs name'
	},
  
  receivedQtyRoll: {
		type: Number,
		required: 'Please fill receivedQtyRoll name'
	},
  
  receivedQtyKgs: {
		type: Number,
		required: 'Please fill receivedQtyKgs name'
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

mongoose.model('FabricReceipt', FabricReceiptSchema);