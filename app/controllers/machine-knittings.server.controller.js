'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	MachineKnitting = mongoose.model('MachineKnitting'),
	_ = require('lodash');

/**
 * Create a Machine knitting
 */
exports.create = function(req, res) {
	var machineKnitting = new MachineKnitting(req.body);
	machineKnitting.user = req.user;

	machineKnitting.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(machineKnitting);
		}
	});
};

/**
 * Show the current Machine knitting
 */
exports.read = function(req, res) {
	res.jsonp(req.machineKnitting);
};

/**
 * Update a Machine knitting
 */
exports.update = function(req, res) {
	var machineKnitting = req.machineKnitting ;

	machineKnitting = _.extend(machineKnitting , req.body);

	machineKnitting.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(machineKnitting);
		}
	});
};

/**
 * Delete an Machine knitting
 */
exports.delete = function(req, res) {
	var machineKnitting = req.machineKnitting ;

	machineKnitting.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(machineKnitting);
		}
	});
};

/**
 * List of Machine knittings
 */
exports.list = function(req, res) { 
	MachineKnitting.find().sort('-created').populate('user', 'displayName').exec(function(err, machineKnittings) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(machineKnittings);
		}
	});
};

/**
 * Machine knitting middleware
 */
exports.machineKnittingByID = function(req, res, next, id) { 
	MachineKnitting.findById(id).populate('user', 'displayName').exec(function(err, machineKnitting) {
		if (err) return next(err);
		if (! machineKnitting) return next(new Error('Failed to load Machine knitting ' + id));
		req.machineKnitting = machineKnitting ;
		next();
	});
};

/**
 * Machine knitting authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.machineKnitting.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
