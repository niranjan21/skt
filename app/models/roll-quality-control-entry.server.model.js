'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * RollQualityControlEntry Schema
 */
var RollQualityControlEntrySchema = new Schema({
	
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  shift: {
		type: String,
		required: 'Please fill shift name'
	},
  
  machineNo: {
		type: String,
		required: 'Please fill machineNo name'
	},
  
  dia: {
		type: Number,
		required: 'Please fill dia name'
	},
  
  make: {
		type: String,
		required: 'Please fill make name'
	},
  
  sNo: {
		type: Number,
		required: 'Please fill sNo name'
	},
  
  jobNo: {
		type: String,
		required: 'Please fill jobNo name'
	},
  
  party: {
		type: String,
		required: 'Please fill party name'
	},
  
  fabric: {
		type: String,
		required: 'Please fill fabric name'
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

mongoose.model('RollQualityControlEntry', RollQualityControlEntrySchema);