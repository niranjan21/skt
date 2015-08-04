'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * PerHourProduction Schema
 */
var PerHourProductionSchema = new Schema({
	
  
  dia: {
		type: Number,
		required: 'Please fill dia name'
	},
  
  count: {
		type: String,
		required: 'Please fill count name'
	},
  
  perHourProductionKgs: {
		type: Number,
		required: 'Please fill perHourProductionKgs name'
	},
  
  shift: {
		type: String,
		required: 'Please fill shift name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
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

mongoose.model('PerHourProduction', PerHourProductionSchema);