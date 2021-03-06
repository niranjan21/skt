'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * DeliveryEntry Schema
 */
var DeliveryEntrySchema = new Schema({
	
  
  deliveryChallanNo: {
		type: String,
		required: 'Please fill deliveryChallanNo name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  knitter: {
		type: String,
		required: 'Please fill knitter name'
	},
  
  jobNo: {
		type: String,
		required: 'Please fill jobNo name'
	},
  
  jobDate: {
		type: Date,
		required: 'Please fill jobDate name'
	},
  
  party: {
		type: String,
		required: 'Please fill party name'
	},
  
  fabric: {
		type: String,
		required: 'Please fill fabric name'
	},
  
  gsm: {
		type: Number,
		required: 'Please fill gsm name'
	},
  
  kgs: {
		type: Number,
		required: 'Please fill kgs name'
	},
  
  dia: {
		type: Number,
		required: 'Please fill dia name'
	},
  
  stockRolls: {
		type: Number,
		required: 'Please fill stockRolls name'
	},
  
  stockKgs: {
		type: Number,
		required: 'Please fill stockKgs name'
	},
  
  deliveryRolls: {
		type: Number,
		required: 'Please fill deliveryRolls name'
	},
  
  deliveryKgs: {
		type: Number,
		required: 'Please fill deliveryKgs name'
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

mongoose.model('DeliveryEntry', DeliveryEntrySchema);