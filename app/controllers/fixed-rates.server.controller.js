'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	FixedRate = mongoose.model('FixedRate'),
	_ = require('lodash');

/**
 * Create a Fixed rate
 */
exports.create = function(req, res) {
	var fixedRate = new FixedRate(req.body);
	fixedRate.user = req.user;

	fixedRate.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fixedRate);
		}
	});
};

/**
 * Show the current Fixed rate
 */
exports.read = function(req, res) {
	res.jsonp(req.fixedRate);
};

/**
 * Update a Fixed rate
 */
exports.update = function(req, res) {
	var fixedRate = req.fixedRate ;

	fixedRate = _.extend(fixedRate , req.body);

	fixedRate.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fixedRate);
		}
	});
};

/**
 * Delete an Fixed rate
 */
exports.delete = function(req, res) {
	var fixedRate = req.fixedRate ;

	fixedRate.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fixedRate);
		}
	});
};

/**
 * List of Fixed rates
 */
exports.list = function(req, res) { 
	FixedRate.find().sort('-created').populate('user', 'displayName').exec(function(err, fixedRates) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fixedRates);
		}
	});
};

/**
 * Fixed rate middleware
 */
exports.fixedRateByID = function(req, res, next, id) { 
	FixedRate.findById(id).populate('user', 'displayName').exec(function(err, fixedRate) {
		if (err) return next(err);
		if (! fixedRate) return next(new Error('Failed to load Fixed rate ' + id));
		req.fixedRate = fixedRate ;
		next();
	});
};

/**
 * Fixed rate authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.fixedRate.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
