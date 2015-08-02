'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	FabricTransferRegister = mongoose.model('FabricTransferRegister'),
	_ = require('lodash');

/**
 * Create a Fabric transfer register
 */
exports.create = function(req, res) {
	var fabricTransferRegister = new FabricTransferRegister(req.body);
	fabricTransferRegister.user = req.user;

	fabricTransferRegister.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricTransferRegister);
		}
	});
};

/**
 * Show the current Fabric transfer register
 */
exports.read = function(req, res) {
	res.jsonp(req.fabricTransferRegister);
};

/**
 * Update a Fabric transfer register
 */
exports.update = function(req, res) {
	var fabricTransferRegister = req.fabricTransferRegister ;

	fabricTransferRegister = _.extend(fabricTransferRegister , req.body);

	fabricTransferRegister.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricTransferRegister);
		}
	});
};

/**
 * Delete an Fabric transfer register
 */
exports.delete = function(req, res) {
	var fabricTransferRegister = req.fabricTransferRegister ;

	fabricTransferRegister.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricTransferRegister);
		}
	});
};

/**
 * List of Fabric transfer registers
 */
exports.list = function(req, res) { 
	FabricTransferRegister.find().sort('-created').populate('user', 'displayName').exec(function(err, fabricTransferRegisters) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricTransferRegisters);
		}
	});
};

/**
 * Fabric transfer register middleware
 */
exports.fabricTransferRegisterByID = function(req, res, next, id) { 
	FabricTransferRegister.findById(id).populate('user', 'displayName').exec(function(err, fabricTransferRegister) {
		if (err) return next(err);
		if (! fabricTransferRegister) return next(new Error('Failed to load Fabric transfer register ' + id));
		req.fabricTransferRegister = fabricTransferRegister ;
		next();
	});
};

/**
 * Fabric transfer register authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.fabricTransferRegister.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
