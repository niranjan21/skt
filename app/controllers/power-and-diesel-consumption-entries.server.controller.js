'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	PowerAndDieselConsumptionEntry = mongoose.model('PowerAndDieselConsumptionEntry'),
	_ = require('lodash');

/**
 * Create a Power and diesel consumption entry
 */
exports.create = function(req, res) {
	var powerAndDieselConsumptionEntry = new PowerAndDieselConsumptionEntry(req.body);
	powerAndDieselConsumptionEntry.user = req.user;

	powerAndDieselConsumptionEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(powerAndDieselConsumptionEntry);
		}
	});
};

/**
 * Show the current Power and diesel consumption entry
 */
exports.read = function(req, res) {
	res.jsonp(req.powerAndDieselConsumptionEntry);
};

/**
 * Update a Power and diesel consumption entry
 */
exports.update = function(req, res) {
	var powerAndDieselConsumptionEntry = req.powerAndDieselConsumptionEntry ;

	powerAndDieselConsumptionEntry = _.extend(powerAndDieselConsumptionEntry , req.body);

	powerAndDieselConsumptionEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(powerAndDieselConsumptionEntry);
		}
	});
};

/**
 * Delete an Power and diesel consumption entry
 */
exports.delete = function(req, res) {
	var powerAndDieselConsumptionEntry = req.powerAndDieselConsumptionEntry ;

	powerAndDieselConsumptionEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(powerAndDieselConsumptionEntry);
		}
	});
};

/**
 * List of Power and diesel consumption entries
 */
exports.list = function(req, res) { 
	PowerAndDieselConsumptionEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, powerAndDieselConsumptionEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(powerAndDieselConsumptionEntries);
		}
	});
};

/**
 * Power and diesel consumption entry middleware
 */
exports.powerAndDieselConsumptionEntryByID = function(req, res, next, id) { 
	PowerAndDieselConsumptionEntry.findById(id).populate('user', 'displayName').exec(function(err, powerAndDieselConsumptionEntry) {
		if (err) return next(err);
		if (! powerAndDieselConsumptionEntry) return next(new Error('Failed to load Power and diesel consumption entry ' + id));
		req.powerAndDieselConsumptionEntry = powerAndDieselConsumptionEntry ;
		next();
	});
};

/**
 * Power and diesel consumption entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.powerAndDieselConsumptionEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
