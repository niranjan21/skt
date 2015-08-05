'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	ProductionRemarksEntry = mongoose.model('ProductionRemarksEntry'),
	_ = require('lodash');

/**
 * Create a Production remarks entry
 */
exports.create = function(req, res) {
	var productionRemarksEntry = new ProductionRemarksEntry(req.body);
	productionRemarksEntry.user = req.user;

	productionRemarksEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productionRemarksEntry);
		}
	});
};

/**
 * Show the current Production remarks entry
 */
exports.read = function(req, res) {
	res.jsonp(req.productionRemarksEntry);
};

/**
 * Update a Production remarks entry
 */
exports.update = function(req, res) {
	var productionRemarksEntry = req.productionRemarksEntry ;

	productionRemarksEntry = _.extend(productionRemarksEntry , req.body);

	productionRemarksEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productionRemarksEntry);
		}
	});
};

/**
 * Delete an Production remarks entry
 */
exports.delete = function(req, res) {
	var productionRemarksEntry = req.productionRemarksEntry ;

	productionRemarksEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productionRemarksEntry);
		}
	});
};

/**
 * List of Production remarks entries
 */
exports.list = function(req, res) { 
	ProductionRemarksEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, productionRemarksEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productionRemarksEntries);
		}
	});
};

/**
 * Production remarks entry middleware
 */
exports.productionRemarksEntryByID = function(req, res, next, id) { 
	ProductionRemarksEntry.findById(id).populate('user', 'displayName').exec(function(err, productionRemarksEntry) {
		if (err) return next(err);
		if (! productionRemarksEntry) return next(new Error('Failed to load Production remarks entry ' + id));
		req.productionRemarksEntry = productionRemarksEntry ;
		next();
	});
};

/**
 * Production remarks entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.productionRemarksEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
