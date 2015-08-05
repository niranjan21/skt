'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	NeedlesInwardRegister = mongoose.model('NeedlesInwardRegister'),
	_ = require('lodash');

/**
 * Create a Needles inward register
 */
exports.create = function(req, res) {
	var needlesInwardRegister = new NeedlesInwardRegister(req.body);
	needlesInwardRegister.user = req.user;

	needlesInwardRegister.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(needlesInwardRegister);
		}
	});
};

/**
 * Show the current Needles inward register
 */
exports.read = function(req, res) {
	res.jsonp(req.needlesInwardRegister);
};

/**
 * Update a Needles inward register
 */
exports.update = function(req, res) {
	var needlesInwardRegister = req.needlesInwardRegister ;

	needlesInwardRegister = _.extend(needlesInwardRegister , req.body);

	needlesInwardRegister.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(needlesInwardRegister);
		}
	});
};

/**
 * Delete an Needles inward register
 */
exports.delete = function(req, res) {
	var needlesInwardRegister = req.needlesInwardRegister ;

	needlesInwardRegister.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(needlesInwardRegister);
		}
	});
};

/**
 * List of Needles inward registers
 */
exports.list = function(req, res) { 
	NeedlesInwardRegister.find().sort('-created').populate('user', 'displayName').exec(function(err, needlesInwardRegisters) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(needlesInwardRegisters);
		}
	});
};

/**
 * Needles inward register middleware
 */
exports.needlesInwardRegisterByID = function(req, res, next, id) { 
	NeedlesInwardRegister.findById(id).populate('user', 'displayName').exec(function(err, needlesInwardRegister) {
		if (err) return next(err);
		if (! needlesInwardRegister) return next(new Error('Failed to load Needles inward register ' + id));
		req.needlesInwardRegister = needlesInwardRegister ;
		next();
	});
};

/**
 * Needles inward register authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.needlesInwardRegister.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
