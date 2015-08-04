'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * PartyMaster Schema
 */
var PartyMasterSchema = new Schema({
	
  
  code: {
		type: String,
		required: 'Please fill code name'
	},
  
  nameoftheCompany: {
		type: String,
		required: 'Please fill nameoftheCompany name'
	},
  
  address: {
		type: String,
		required: 'Please fill address name'
	},
  
  contactPerson: {
		type: String,
		required: 'Please fill contactPerson name'
	},
  
  phoneNo: {
		type: Number,
		required: 'Please fill phoneNo name'
	},
  
  tin: {
		type: String,
		required: 'Please fill tin name'
	},
  
  cst: {
		type: String,
		required: 'Please fill cst name'
	},
  
  pan: {
		type: String,
		required: 'Please fill pan name'
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

mongoose.model('PartyMaster', PartyMasterSchema);