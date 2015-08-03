'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * InvoiceEntry Schema
 */
var InvoiceEntrySchema = new Schema({
	
  
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
  
  ourDcno: {
		type: Number,
		required: 'Please fill ourDcno name'
	},
  
  preparedBy: {
		type: String,
		required: 'Please fill preparedBy name'
	},
  
  verifiedBy: {
		type: String,
		required: 'Please fill verifiedBy name'
	},
  
  authorisedBy: {
		type: String,
		required: 'Please fill authorisedBy name'
	},
  
  sNo: {
		type: Number,
		required: 'Please fill sNo name'
	},
  
  descriptionofGoods: {
		type: String,
		required: 'Please fill descriptionofGoods name'
	},
  
  rolls: {
		type: Number,
		required: 'Please fill rolls name'
	},
  
  quantityinKgs: {
		type: Number,
		required: 'Please fill quantityinKgs name'
	},
  
  ratePerUnit: {
		type: Number,
		required: 'Please fill ratePerUnit name'
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

mongoose.model('InvoiceEntry', InvoiceEntrySchema);