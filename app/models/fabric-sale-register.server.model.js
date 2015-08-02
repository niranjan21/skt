'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * FabricSaleRegister Schema
 */
var FabricSaleRegisterSchema = new Schema({
	
  
  invoiceNo: {
		type: Number,
		required: 'Please fill invoiceNo name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  party: {
		type: String,
		required: 'Please fill party name'
	},
  
  partyReference: {
		type: String,
		required: 'Please fill partyReference name'
	},
  
  fabric: {
		type: String,
		required: 'Please fill fabric name'
	},
  
  count: {
		type: String,
		required: 'Please fill count name'
	},
  
  gsm: {
		type: Number,
		required: 'Please fill gsm name'
	},
  
  dia: {
		type: Number,
		required: 'Please fill dia name'
	},
  
  rolls: {
		type: Number,
		required: 'Please fill rolls name'
	},
  
  kgs: {
		type: Number,
		required: 'Please fill kgs name'
	},
  
  rate: {
		type: Number,
		required: 'Please fill rate name'
	},
  
  amount: {
		type: Number,
		required: 'Please fill amount name'
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

mongoose.model('FabricSaleRegister', FabricSaleRegisterSchema);