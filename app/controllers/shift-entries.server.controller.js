'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	ShiftEntry = mongoose.model('ShiftEntry'),
	_ = require('lodash');

/**
 * Create a Shift entry
 */
exports.create = function(req, res) {
	var shiftEntry = new ShiftEntry(req.body);
	shiftEntry.user = req.user;

	shiftEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(shiftEntry);
		}
	});
};

/**
 * Show the current Shift entry
 */
exports.read = function(req, res) {
	res.jsonp(req.shiftEntry);
};

/**
 * Update a Shift entry
 */
exports.update = function(req, res) {
	var shiftEntry = req.shiftEntry ;

	shiftEntry = _.extend(shiftEntry , req.body);

	shiftEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(shiftEntry);
		}
	});
};

/**
 * Delete an Shift entry
 */
exports.delete = function(req, res) {
	var shiftEntry = req.shiftEntry ;

	shiftEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(shiftEntry);
		}
	});
};

/**
 * List of Shift entries
 */
exports.list = function(req, res) { 
	ShiftEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, shiftEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(shiftEntries);
		}
	});
};

/**
 * Shift entry middleware
 */
exports.shiftEntryByID = function(req, res, next, id) { 
	ShiftEntry.findById(id).populate('user', 'displayName').exec(function(err, shiftEntry) {
		if (err) return next(err);
		if (! shiftEntry) return next(new Error('Failed to load Shift entry ' + id));
		req.shiftEntry = shiftEntry ;
		next();
	});
};

/**
 * Shift entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.shiftEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
