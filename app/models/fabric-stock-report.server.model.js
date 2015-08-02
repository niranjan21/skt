'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * FabricStockReport Schema
 */
var FabricStockReportSchema = new Schema({
	
  
  sNo: {
		type: Number,
		required: 'Please fill sNo name'
	},
  
  fabric: {
		type: String,
		required: 'Please fill fabric name'
	},
  
  count: {
		type: String,
		required: 'Please fill count name'
	},
  
  gsm: {
		type: Number,
		required: 'Please fill gsm name'
	},
  
  dia: {
		type: Number,
		required: 'Please fill dia name'
	},
  
  rolls: {
		type: Number,
		required: 'Please fill rolls name'
	},
  
  kgs: {
		type: Number,
		required: 'Please fill kgs name'
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

mongoose.model('FabricStockReport', FabricStockReportSchema);