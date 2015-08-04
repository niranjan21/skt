'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * NeedlesInwardEntry Schema
 */
var NeedlesInwardEntrySchema = new Schema({
	
  
  invoiceNo: {
		type: String,
		required: 'Please fill invoiceNo name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  deliveryChalanNo: {
		type: String,
		required: 'Please fill deliveryChalanNo name'
	},
  
  localorImport: {
		type: String,
		required: 'Please fill localorImport name'
	},
  
  party: {
		type: String,
		required: 'Please fill party name'
	},
  
  knitter: {
		type: String,
		required: 'Please fill knitter name'
	},
  
  sno: {
		type: Number,
		required: 'Please fill sno name'
	},
  
  typeofNeedle: {
		type: String,
		required: 'Please fill typeofNeedle name'
	},
  
  stock: {
		type: String,
		required: 'Please fill stock name'
	},
  
  received: {
		type: String,
		required: 'Please fill received name'
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

mongoose.model('NeedlesInwardEntry', NeedlesInwardEntrySchema);