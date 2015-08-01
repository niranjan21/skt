'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	PowerConsumptionEntry = mongoose.model('PowerConsumptionEntry'),
	_ = require('lodash');

/**
 * Create a Power consumption entry
 */
exports.create = function(req, res) {
	var powerConsumptionEntry = new PowerConsumptionEntry(req.body);
	powerConsumptionEntry.user = req.user;

	powerConsumptionEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(powerConsumptionEntry);
		}
	});
};

/**
 * Show the current Power consumption entry
 */
exports.read = function(req, res) {
	res.jsonp(req.powerConsumptionEntry);
};

/**
 * Update a Power consumption entry
 */
exports.update = function(req, res) {
	var powerConsumptionEntry = req.powerConsumptionEntry ;

	powerConsumptionEntry = _.extend(powerConsumptionEntry , req.body);

	powerConsumptionEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(powerConsumptionEntry);
		}
	});
};

/**
 * Delete an Power consumption entry
 */
exports.delete = function(req, res) {
	var powerConsumptionEntry = req.powerConsumptionEntry ;

	powerConsumptionEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(powerConsumptionEntry);
		}
	});
};

/**
 * List of Power consumption entries
 */
exports.list = function(req, res) { 
	PowerConsumptionEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, powerConsumptionEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(powerConsumptionEntries);
		}
	});
};

/**
 * Power consumption entry middleware
 */
exports.powerConsumptionEntryByID = function(req, res, next, id) { 
	PowerConsumptionEntry.findById(id).populate('user', 'displayName').exec(function(err, powerConsumptionEntry) {
		if (err) return next(err);
		if (! powerConsumptionEntry) return next(new Error('Failed to load Power consumption entry ' + id));
		req.powerConsumptionEntry = powerConsumptionEntry ;
		next();
	});
};

/**
 * Power consumption entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.powerConsumptionEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
