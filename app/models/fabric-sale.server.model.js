'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * FabricSale Schema
 */
var FabricSaleSchema = new Schema({
	
  
  invoiceNo: {
		type: Number,
		required: 'Please fill invoiceNo name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  knitter: {
		type: String,
		required: 'Please fill knitter name'
	},
  
  party: {
		type: String,
		required: 'Please fill party name'
	},
  
  partyReference: {
		type: String,
		required: 'Please fill partyReference name'
	},
  
  sNo: {
		type: Number,
		required: 'Please fill sNo name'
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
  
  ratePerUnit: {
		type: Number,
		required: 'Please fill ratePerUnit name'
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

mongoose.model('FabricSale', FabricSaleSchema);