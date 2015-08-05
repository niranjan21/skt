'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	MachinewiseEntry = mongoose.model('MachinewiseEntry'),
	_ = require('lodash');

/**
 * Create a Machinewise entry
 */
exports.create = function(req, res) {
	var machinewiseEntry = new MachinewiseEntry(req.body);
	machinewiseEntry.user = req.user;

	machinewiseEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(machinewiseEntry);
		}
	});
};

/**
 * Show the current Machinewise entry
 */
exports.read = function(req, res) {
	res.jsonp(req.machinewiseEntry);
};

/**
 * Update a Machinewise entry
 */
exports.update = function(req, res) {
	var machinewiseEntry = req.machinewiseEntry ;

	machinewiseEntry = _.extend(machinewiseEntry , req.body);

	machinewiseEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(machinewiseEntry);
		}
	});
};

/**
 * Delete an Machinewise entry
 */
exports.delete = function(req, res) {
	var machinewiseEntry = req.machinewiseEntry ;

	machinewiseEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(machinewiseEntry);
		}
	});
};

/**
 * List of Machinewise entries
 */
exports.list = function(req, res) { 
	MachinewiseEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, machinewiseEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(machinewiseEntries);
		}
	});
};

/**
 * Machinewise entry middleware
 */
exports.machinewiseEntryByID = function(req, res, next, id) { 
	MachinewiseEntry.findById(id).populate('user', 'displayName').exec(function(err, machinewiseEntry) {
		if (err) return next(err);
		if (! machinewiseEntry) return next(new Error('Failed to load Machinewise entry ' + id));
		req.machinewiseEntry = machinewiseEntry ;
		next();
	});
};

/**
 * Machinewise entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.machinewiseEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
