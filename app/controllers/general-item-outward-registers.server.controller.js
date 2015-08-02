'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	GeneralItemOutwardRegister = mongoose.model('GeneralItemOutwardRegister'),
	_ = require('lodash');

/**
 * Create a General item outward register
 */
exports.create = function(req, res) {
	var generalItemOutwardRegister = new GeneralItemOutwardRegister(req.body);
	generalItemOutwardRegister.user = req.user;

	generalItemOutwardRegister.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalItemOutwardRegister);
		}
	});
};

/**
 * Show the current General item outward register
 */
exports.read = function(req, res) {
	res.jsonp(req.generalItemOutwardRegister);
};

/**
 * Update a General item outward register
 */
exports.update = function(req, res) {
	var generalItemOutwardRegister = req.generalItemOutwardRegister ;

	generalItemOutwardRegister = _.extend(generalItemOutwardRegister , req.body);

	generalItemOutwardRegister.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalItemOutwardRegister);
		}
	});
};

/**
 * Delete an General item outward register
 */
exports.delete = function(req, res) {
	var generalItemOutwardRegister = req.generalItemOutwardRegister ;

	generalItemOutwardRegister.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalItemOutwardRegister);
		}
	});
};

/**
 * List of General item outward registers
 */
exports.list = function(req, res) { 
	GeneralItemOutwardRegister.find().sort('-created').populate('user', 'displayName').exec(function(err, generalItemOutwardRegisters) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalItemOutwardRegisters);
		}
	});
};

/**
 * General item outward register middleware
 */
exports.generalItemOutwardRegisterByID = function(req, res, next, id) { 
	GeneralItemOutwardRegister.findById(id).populate('user', 'displayName').exec(function(err, generalItemOutwardRegister) {
		if (err) return next(err);
		if (! generalItemOutwardRegister) return next(new Error('Failed to load General item outward register ' + id));
		req.generalItemOutwardRegister = generalItemOutwardRegister ;
		next();
	});
};

/**
 * General item outward register authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.generalItemOutwardRegister.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
