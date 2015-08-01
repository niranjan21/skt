'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	StoppagesEntry = mongoose.model('StoppagesEntry'),
	_ = require('lodash');

/**
 * Create a Stoppages entry
 */
exports.create = function(req, res) {
	var stoppagesEntry = new StoppagesEntry(req.body);
	stoppagesEntry.user = req.user;

	stoppagesEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(stoppagesEntry);
		}
	});
};

/**
 * Show the current Stoppages entry
 */
exports.read = function(req, res) {
	res.jsonp(req.stoppagesEntry);
};

/**
 * Update a Stoppages entry
 */
exports.update = function(req, res) {
	var stoppagesEntry = req.stoppagesEntry ;

	stoppagesEntry = _.extend(stoppagesEntry , req.body);

	stoppagesEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(stoppagesEntry);
		}
	});
};

/**
 * Delete an Stoppages entry
 */
exports.delete = function(req, res) {
	var stoppagesEntry = req.stoppagesEntry ;

	stoppagesEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(stoppagesEntry);
		}
	});
};

/**
 * List of Stoppages entries
 */
exports.list = function(req, res) { 
	StoppagesEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, stoppagesEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(stoppagesEntries);
		}
	});
};

/**
 * Stoppages entry middleware
 */
exports.stoppagesEntryByID = function(req, res, next, id) { 
	StoppagesEntry.findById(id).populate('user', 'displayName').exec(function(err, stoppagesEntry) {
		if (err) return next(err);
		if (! stoppagesEntry) return next(new Error('Failed to load Stoppages entry ' + id));
		req.stoppagesEntry = stoppagesEntry ;
		next();
	});
};

/**
 * Stoppages entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.stoppagesEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
