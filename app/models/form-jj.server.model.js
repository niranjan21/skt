'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * FormJj Schema
 */
var FormJjSchema = new Schema({
	
  
  sNo: {
		type: Number,
		required: 'Please fill sNo name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  party: {
		type: String,
		required: 'Please fill party name'
	},
  
  concern: {
		type: String,
		required: 'Please fill concern name'
	},
  
  place: {
		type: String,
		required: 'Please fill place name'
	},
  
  attn: {
		type: String,
		required: 'Please fill attn name'
	},
  
  quantityOfWeight: {
		type: Number,
		required: 'Please fill quantityOfWeight name'
	},
  
  valueOfGoods: {
		type: Number,
		required: 'Please fill valueOfGoods name'
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

mongoose.model('FormJj', FormJjSchema);