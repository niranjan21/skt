'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	JobPartialCompletion = mongoose.model('JobPartialCompletion'),
	_ = require('lodash');

/**
 * Create a Job partial completion
 */
exports.create = function(req, res) {
	var jobPartialCompletion = new JobPartialCompletion(req.body);
	jobPartialCompletion.user = req.user;

	jobPartialCompletion.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(jobPartialCompletion);
		}
	});
};

/**
 * Show the current Job partial completion
 */
exports.read = function(req, res) {
	res.jsonp(req.jobPartialCompletion);
};

/**
 * Update a Job partial completion
 */
exports.update = function(req, res) {
	var jobPartialCompletion = req.jobPartialCompletion ;

	jobPartialCompletion = _.extend(jobPartialCompletion , req.body);

	jobPartialCompletion.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(jobPartialCompletion);
		}
	});
};

/**
 * Delete an Job partial completion
 */
exports.delete = function(req, res) {
	var jobPartialCompletion = req.jobPartialCompletion ;

	jobPartialCompletion.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(jobPartialCompletion);
		}
	});
};

/**
 * List of Job partial completions
 */
exports.list = function(req, res) { 
	JobPartialCompletion.find().sort('-created').populate('user', 'displayName').exec(function(err, jobPartialCompletions) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(jobPartialCompletions);
		}
	});
};

/**
 * Job partial completion middleware
 */
exports.jobPartialCompletionByID = function(req, res, next, id) { 
	JobPartialCompletion.findById(id).populate('user', 'displayName').exec(function(err, jobPartialCompletion) {
		if (err) return next(err);
		if (! jobPartialCompletion) return next(new Error('Failed to load Job partial completion ' + id));
		req.jobPartialCompletion = jobPartialCompletion ;
		next();
	});
};

/**
 * Job partial completion authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.jobPartialCompletion.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
