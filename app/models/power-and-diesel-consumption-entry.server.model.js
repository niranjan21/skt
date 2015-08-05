'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * PowerAndDieselConsumptionEntry Schema
 */
var PowerAndDieselConsumptionEntrySchema = new Schema({
	
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  powerConsumptionUnits: {
		type: Number,
		required: 'Please fill powerConsumptionUnits name'
	},
  
  amount: {
		type: Number,
		required: 'Please fill amount name'
	},
  
  dieselConsumptionLitres: {
		type: Number,
		required: 'Please fill dieselConsumptionLitres name'
	},
  
  value: {
		type: Number,
		required: 'Please fill value name'
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

mongoose.model('PowerAndDieselConsumptionEntry', PowerAndDieselConsumptionEntrySchema);