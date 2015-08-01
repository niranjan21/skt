'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * FabricItemMaster Schema
 */
var FabricItemMasterSchema = new Schema({
	
  
  fabric: {
		type: String,
		required: 'Please fill fabric name'
	},
  
  count: {
		type: String,
		required: 'Please fill count name'
	},
  
  dia: {
		type: Number,
		required: 'Please fill dia name'
	},
  
  gsm: {
		type: Number,
		required: 'Please fill gsm name'
	},
  
  openingRolls: {
		type: Number,
		required: 'Please fill openingRolls name'
	},
  
  openingKgs: {
		type: Number,
		required: 'Please fill openingKgs name'
	},
  
  ratePerKg: {
		type: Number,
		required: 'Please fill ratePerKg name'
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

mongoose.model('FabricItemMaster', FabricItemMasterSchema);