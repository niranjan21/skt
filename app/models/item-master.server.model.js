'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * ItemMaster Schema
 */
var ItemMasterSchema = new Schema({
	
  
  itemCode: {
		type: String,
		required: 'Please fill itemCode name'
	},
  
  nameOfTheItem: {
		type: String,
		required: 'Please fill nameOfTheItem name'
	},
  
  uOm: {
		type: Number,
		required: 'Please fill uOm name'
	},
  
  unitRate: {
		type: Number,
		required: 'Please fill unitRate name'
	},
  
  openingBalance: {
		type: Number,
		required: 'Please fill openingBalance name'
	},
  
  type: {
		type: String,
		required: 'Please fill type name'
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

mongoose.model('ItemMaster', ItemMasterSchema);