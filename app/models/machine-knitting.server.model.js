'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * MachineKnitting Schema
 */
var MachineKnittingSchema = new Schema({
	
  
  knitter: {
		type: String,
		required: 'Please fill knitter name'
	},
  
  machineCode: {
		type: String,
		required: 'Please fill machineCode name'
	},
  
  machineMake: {
		type: String,
		required: 'Please fill machineMake name'
	},
  
  dia: {
		type: Number,
		required: 'Please fill dia name'
	},
  
  mark: {
		type: String,
		required: 'Please fill mark name'
	},
  
  productionPerDay: {
		type: Number,
		required: 'Please fill productionPerDay name'
	},
  
  index: {
		type: String,
		required: 'Please fill index name'
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

mongoose.model('MachineKnitting', MachineKnittingSchema);