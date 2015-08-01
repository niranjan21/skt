'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	YarnReturnEntry = mongoose.model('YarnReturnEntry'),
	_ = require('lodash');

/**
 * Create a Yarn return entry
 */
exports.create = function(req, res) {
	var yarnReturnEntry = new YarnReturnEntry(req.body);
	yarnReturnEntry.user = req.user;

	yarnReturnEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnReturnEntry);
		}
	});
};

/**
 * Show the current Yarn return entry
 */
exports.read = function(req, res) {
	res.jsonp(req.yarnReturnEntry);
};

/**
 * Update a Yarn return entry
 */
exports.update = function(req, res) {
	var yarnReturnEntry = req.yarnReturnEntry ;

	yarnReturnEntry = _.extend(yarnReturnEntry , req.body);

	yarnReturnEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnReturnEntry);
		}
	});
};

/**
 * Delete an Yarn return entry
 */
exports.delete = function(req, res) {
	var yarnReturnEntry = req.yarnReturnEntry ;

	yarnReturnEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnReturnEntry);
		}
	});
};

/**
 * List of Yarn return entries
 */
exports.list = function(req, res) { 
	YarnReturnEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, yarnReturnEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnReturnEntries);
		}
	});
};

/**
 * Yarn return entry middleware
 */
exports.yarnReturnEntryByID = function(req, res, next, id) { 
	YarnReturnEntry.findById(id).populate('user', 'displayName').exec(function(err, yarnReturnEntry) {
		if (err) return next(err);
		if (! yarnReturnEntry) return next(new Error('Failed to load Yarn return entry ' + id));
		req.yarnReturnEntry = yarnReturnEntry ;
		next();
	});
};

/**
 * Yarn return entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.yarnReturnEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
