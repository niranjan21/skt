'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * BulkNeedleChangeReport Schema
 */
var BulkNeedleChangeReportSchema = new Schema({
	
  
  machineNumber: {
		type: String,
		required: 'Please fill machineNumber name'
	},
  
  machineMake: {
		type: String,
		required: 'Please fill machineMake name'
	},
  
  dia: {
		type: String,
		required: 'Please fill dia name'
	},
  
  lastBulkNeedlechangedDate: {
		type: Date,
		required: 'Please fill lastBulkNeedlechangedDate name'
	},
  
  allowedProductionQuantity: {
		type: Number,
		required: 'Please fill allowedProductionQuantity name'
	},
  
  actualProductionQuantity: {
		type: Number,
		required: 'Please fill actualProductionQuantity name'
	},
  
  balanceQty: {
		type: Number,
		required: 'Please fill balanceQty name'
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

mongoose.model('BulkNeedleChangeReport', BulkNeedleChangeReportSchema);