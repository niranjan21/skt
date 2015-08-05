'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	AllowanceEntry = mongoose.model('AllowanceEntry'),
	_ = require('lodash');

/**
 * Create a Allowance entry
 */
exports.create = function(req, res) {
	var allowanceEntry = new AllowanceEntry(req.body);
	allowanceEntry.user = req.user;

	allowanceEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(allowanceEntry);
		}
	});
};

/**
 * Show the current Allowance entry
 */
exports.read = function(req, res) {
	res.jsonp(req.allowanceEntry);
};

/**
 * Update a Allowance entry
 */
exports.update = function(req, res) {
	var allowanceEntry = req.allowanceEntry ;

	allowanceEntry = _.extend(allowanceEntry , req.body);

	allowanceEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(allowanceEntry);
		}
	});
};

/**
 * Delete an Allowance entry
 */
exports.delete = function(req, res) {
	var allowanceEntry = req.allowanceEntry ;

	allowanceEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(allowanceEntry);
		}
	});
};

/**
 * List of Allowance entries
 */
exports.list = function(req, res) { 
	AllowanceEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, allowanceEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(allowanceEntries);
		}
	});
};

/**
 * Allowance entry middleware
 */
exports.allowanceEntryByID = function(req, res, next, id) { 
	AllowanceEntry.findById(id).populate('user', 'displayName').exec(function(err, allowanceEntry) {
		if (err) return next(err);
		if (! allowanceEntry) return next(new Error('Failed to load Allowance entry ' + id));
		req.allowanceEntry = allowanceEntry ;
		next();
	});
};

/**
 * Allowance entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.allowanceEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
