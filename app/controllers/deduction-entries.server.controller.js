'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	DeductionEntry = mongoose.model('DeductionEntry'),
	_ = require('lodash');

/**
 * Create a Deduction entry
 */
exports.create = function(req, res) {
	var deductionEntry = new DeductionEntry(req.body);
	deductionEntry.user = req.user;

	deductionEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deductionEntry);
		}
	});
};

/**
 * Show the current Deduction entry
 */
exports.read = function(req, res) {
	res.jsonp(req.deductionEntry);
};

/**
 * Update a Deduction entry
 */
exports.update = function(req, res) {
	var deductionEntry = req.deductionEntry ;

	deductionEntry = _.extend(deductionEntry , req.body);

	deductionEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deductionEntry);
		}
	});
};

/**
 * Delete an Deduction entry
 */
exports.delete = function(req, res) {
	var deductionEntry = req.deductionEntry ;

	deductionEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deductionEntry);
		}
	});
};

/**
 * List of Deduction entries
 */
exports.list = function(req, res) { 
	DeductionEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, deductionEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deductionEntries);
		}
	});
};

/**
 * Deduction entry middleware
 */
exports.deductionEntryByID = function(req, res, next, id) { 
	DeductionEntry.findById(id).populate('user', 'displayName').exec(function(err, deductionEntry) {
		if (err) return next(err);
		if (! deductionEntry) return next(new Error('Failed to load Deduction entry ' + id));
		req.deductionEntry = deductionEntry ;
		next();
	});
};

/**
 * Deduction entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.deductionEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
