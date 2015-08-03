'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Concern Schema
 */
var ConcernSchema = new Schema({
	
  
  concernName: {
		type: String,
		required: 'Please fill concernName name'
	},
  
  inshort: {
		type: String,
		required: 'Please fill inshort name'
	},
  
  address: {
		type: String,
		required: 'Please fill address name'
	},
  
  phoneNo: {
		type: Number,
		required: 'Please fill phoneNo name'
	},
  
  faxNo: {
		type: Number,
		required: 'Please fill faxNo name'
	},
  
  mobileNo: {
		type: Number,
		required: 'Please fill mobileNo name'
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
  
  esino: {
		type: String,
		required: 'Please fill esino name'
	},
  
  designation: {
		type: String,
		required: 'Please fill designation name'
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

mongoose.model('Concern', ConcernSchema);