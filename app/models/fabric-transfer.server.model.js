'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * FabricTransfer Schema
 */
var FabricTransferSchema = new Schema({
	
  
  transferNo: {
		type: Number,
		required: 'Please fill transferNo name'
	},
  
  jobNo: {
		type: Number,
		required: 'Please fill jobNo name'
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
  
  transferRolls: {
		type: Number,
		required: 'Please fill transferRolls name'
	},
  
  transferKgs: {
		type: Number,
		required: 'Please fill transferKgs name'
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

mongoose.model('FabricTransfer', FabricTransferSchema);