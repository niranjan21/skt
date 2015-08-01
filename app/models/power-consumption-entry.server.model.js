'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * PowerConsumptionEntry Schema
 */
var PowerConsumptionEntrySchema = new Schema({
	
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  powerConsumptionUnits: {
		type: Number,
		required: 'Please fill powerConsumptionUnits name'
	},
  
  rate: {
		type: Number,
		required: 'Please fill rate name'
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

mongoose.model('PowerConsumptionEntry', PowerConsumptionEntrySchema);