'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	ProductionTestEntry = mongoose.model('ProductionTestEntry'),
	_ = require('lodash');

/**
 * Create a Production test entry
 */
exports.create = function(req, res) {
	var productionTestEntry = new ProductionTestEntry(req.body);
	productionTestEntry.user = req.user;

	productionTestEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productionTestEntry);
		}
	});
};

/**
 * Show the current Production test entry
 */
exports.read = function(req, res) {
	res.jsonp(req.productionTestEntry);
};

/**
 * Update a Production test entry
 */
exports.update = function(req, res) {
	var productionTestEntry = req.productionTestEntry ;

	productionTestEntry = _.extend(productionTestEntry , req.body);

	productionTestEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productionTestEntry);
		}
	});
};

/**
 * Delete an Production test entry
 */
exports.delete = function(req, res) {
	var productionTestEntry = req.productionTestEntry ;

	productionTestEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productionTestEntry);
		}
	});
};

/**
 * List of Production test entries
 */
exports.list = function(req, res) { 
	ProductionTestEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, productionTestEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productionTestEntries);
		}
	});
};

/**
 * Production test entry middleware
 */
exports.productionTestEntryByID = function(req, res, next, id) { 
	ProductionTestEntry.findById(id).populate('user', 'displayName').exec(function(err, productionTestEntry) {
		if (err) return next(err);
		if (! productionTestEntry) return next(new Error('Failed to load Production test entry ' + id));
		req.productionTestEntry = productionTestEntry ;
		next();
	});
};

/**
 * Production test entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.productionTestEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
