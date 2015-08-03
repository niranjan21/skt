'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * EmployeeMaster Schema
 */
var EmployeeMasterSchema = new Schema({
	
  
  code: {
		type: String,
		required: 'Please fill code name'
	},
  
  name: {
		type: String,
		required: 'Please fill name name'
	},
  
  address: {
		type: String,
		required: 'Please fill address name'
	},
  
  basicPay: {
		type: Number,
		required: 'Please fill basicPay name'
	},
  
  pfbasic: {
		type: Number,
		required: 'Please fill pfbasic name'
	},
  
  da: {
		type: Number,
		required: 'Please fill da name'
	},
  
  travelAllowance: {
		type: Number,
		required: 'Please fill travelAllowance name'
	},
  
  teaAllowance: {
		type: Number,
		required: 'Please fill teaAllowance name'
	},
  
  sundayAllowance: {
		type: Number,
		required: 'Please fill sundayAllowance name'
	},
  
  pf: {
		type: Number,
		required: 'Please fill pf name'
	},
  
  esi: {
		type: Number,
		required: 'Please fill esi name'
	},
  
  leaveWage: {
		type: Number,
		required: 'Please fill leaveWage name'
	},
  
  pieceShiftWeek: {
		type: Number,
		required: 'Please fill pieceShiftWeek name'
	},
  
  joiningDate: {
		type: Date,
		required: 'Please fill joiningDate name'
	},
  
  resignDate: {
		type: Date,
		required: 'Please fill resignDate name'
	},
  
  addlWagePerShift: {
		type: Number,
		required: 'Please fill addlWagePerShift name'
	},
  
  allowancePerShift: {
		type: Number,
		required: 'Please fill allowancePerShift name'
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

mongoose.model('EmployeeMaster', EmployeeMasterSchema);