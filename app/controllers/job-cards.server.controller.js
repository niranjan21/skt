'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	JobCard = mongoose.model('JobCard'),
	_ = require('lodash');

/**
 * Create a Job card
 */
exports.create = function(req, res) {
	var jobCard = new JobCard(req.body);
	jobCard.user = req.user;

	jobCard.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(jobCard);
		}
	});
};

/**
 * Show the current Job card
 */
exports.read = function(req, res) {
	res.jsonp(req.jobCard);
};

/**
 * Update a Job card
 */
exports.update = function(req, res) {
	var jobCard = req.jobCard ;

	jobCard = _.extend(jobCard , req.body);

	jobCard.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(jobCard);
		}
	});
};

/**
 * Delete an Job card
 */
exports.delete = function(req, res) {
	var jobCard = req.jobCard ;

	jobCard.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(jobCard);
		}
	});
};

/**
 * List of Job cards
 */
exports.list = function(req, res) { 
	JobCard.find().sort('-created').populate('user', 'displayName').exec(function(err, jobCards) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(jobCards);
		}
	});
};

/**
 * Job card middleware
 */
exports.jobCardByID = function(req, res, next, id) { 
	JobCard.findById(id).populate('user', 'displayName').exec(function(err, jobCard) {
		if (err) return next(err);
		if (! jobCard) return next(new Error('Failed to load Job card ' + id));
		req.jobCard = jobCard ;
		next();
	});
};

/**
 * Job card authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.jobCard.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
