'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	ProductionParameter = mongoose.model('ProductionParameter'),
	_ = require('lodash');

/**
 * Create a Production parameter
 */
exports.create = function(req, res) {
	var productionParameter = new ProductionParameter(req.body);
	productionParameter.user = req.user;

	productionParameter.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productionParameter);
		}
	});
};

/**
 * Show the current Production parameter
 */
exports.read = function(req, res) {
	res.jsonp(req.productionParameter);
};

/**
 * Update a Production parameter
 */
exports.update = function(req, res) {
	var productionParameter = req.productionParameter ;

	productionParameter = _.extend(productionParameter , req.body);

	productionParameter.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productionParameter);
		}
	});
};

/**
 * Delete an Production parameter
 */
exports.delete = function(req, res) {
	var productionParameter = req.productionParameter ;

	productionParameter.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productionParameter);
		}
	});
};

/**
 * List of Production parameters
 */
exports.list = function(req, res) { 
	ProductionParameter.find().sort('-created').populate('user', 'displayName').exec(function(err, productionParameters) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productionParameters);
		}
	});
};

/**
 * Production parameter middleware
 */
exports.productionParameterByID = function(req, res, next, id) { 
	ProductionParameter.findById(id).populate('user', 'displayName').exec(function(err, productionParameter) {
		if (err) return next(err);
		if (! productionParameter) return next(new Error('Failed to load Production parameter ' + id));
		req.productionParameter = productionParameter ;
		next();
	});
};

/**
 * Production parameter authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.productionParameter.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
