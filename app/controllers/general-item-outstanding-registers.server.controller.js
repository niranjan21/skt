'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	GeneralItemOutstandingRegister = mongoose.model('GeneralItemOutstandingRegister'),
	_ = require('lodash');

/**
 * Create a General item outstanding register
 */
exports.create = function(req, res) {
	var generalItemOutstandingRegister = new GeneralItemOutstandingRegister(req.body);
	generalItemOutstandingRegister.user = req.user;

	generalItemOutstandingRegister.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalItemOutstandingRegister);
		}
	});
};

/**
 * Show the current General item outstanding register
 */
exports.read = function(req, res) {
	res.jsonp(req.generalItemOutstandingRegister);
};

/**
 * Update a General item outstanding register
 */
exports.update = function(req, res) {
	var generalItemOutstandingRegister = req.generalItemOutstandingRegister ;

	generalItemOutstandingRegister = _.extend(generalItemOutstandingRegister , req.body);

	generalItemOutstandingRegister.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalItemOutstandingRegister);
		}
	});
};

/**
 * Delete an General item outstanding register
 */
exports.delete = function(req, res) {
	var generalItemOutstandingRegister = req.generalItemOutstandingRegister ;

	generalItemOutstandingRegister.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalItemOutstandingRegister);
		}
	});
};

/**
 * List of General item outstanding registers
 */
exports.list = function(req, res) { 
	GeneralItemOutstandingRegister.find().sort('-created').populate('user', 'displayName').exec(function(err, generalItemOutstandingRegisters) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalItemOutstandingRegisters);
		}
	});
};

/**
 * General item outstanding register middleware
 */
exports.generalItemOutstandingRegisterByID = function(req, res, next, id) { 
	GeneralItemOutstandingRegister.findById(id).populate('user', 'displayName').exec(function(err, generalItemOutstandingRegister) {
		if (err) return next(err);
		if (! generalItemOutstandingRegister) return next(new Error('Failed to load General item outstanding register ' + id));
		req.generalItemOutstandingRegister = generalItemOutstandingRegister ;
		next();
	});
};

/**
 * General item outstanding register authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.generalItemOutstandingRegister.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
