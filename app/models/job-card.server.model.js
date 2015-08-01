'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * JobCard Schema
 */
var JobCardSchema = new Schema({
	
  
  job: {
		type: String,
		required: 'Please fill job name'
	},
  
  date: {
		type: Date,
		required: 'Please fill date name'
	},
  
  isTheJobFinished: {
		type: String,
		required: 'Please fill isTheJobFinished name'
	},
  
  remarks: {
		type: String,
		required: 'Please fill remarks name'
	},
  
  preparedBy: {
		type: String,
		required: 'Please fill preparedBy name'
	},
  
  authorisedBy: {
		type: String,
		required: 'Please fill authorisedBy name'
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

mongoose.model('JobCard', JobCardSchema);