'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	PerHourProduction = mongoose.model('PerHourProduction'),
	_ = require('lodash');

/**
 * Create a Per hour production
 */
exports.create = function(req, res) {
	var perHourProduction = new PerHourProduction(req.body);
	perHourProduction.user = req.user;

	perHourProduction.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(perHourProduction);
		}
	});
};

/**
 * Show the current Per hour production
 */
exports.read = function(req, res) {
	res.jsonp(req.perHourProduction);
};

/**
 * Update a Per hour production
 */
exports.update = function(req, res) {
	var perHourProduction = req.perHourProduction ;

	perHourProduction = _.extend(perHourProduction , req.body);

	perHourProduction.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(perHourProduction);
		}
	});
};

/**
 * Delete an Per hour production
 */
exports.delete = function(req, res) {
	var perHourProduction = req.perHourProduction ;

	perHourProduction.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(perHourProduction);
		}
	});
};

/**
 * List of Per hour productions
 */
exports.list = function(req, res) { 
	PerHourProduction.find().sort('-created').populate('user', 'displayName').exec(function(err, perHourProductions) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(perHourProductions);
		}
	});
};

/**
 * Per hour production middleware
 */
exports.perHourProductionByID = function(req, res, next, id) { 
	PerHourProduction.findById(id).populate('user', 'displayName').exec(function(err, perHourProduction) {
		if (err) return next(err);
		if (! perHourProduction) return next(new Error('Failed to load Per hour production ' + id));
		req.perHourProduction = perHourProduction ;
		next();
	});
};

/**
 * Per hour production authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.perHourProduction.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
