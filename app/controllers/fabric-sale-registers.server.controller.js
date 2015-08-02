'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	FabricSaleRegister = mongoose.model('FabricSaleRegister'),
	_ = require('lodash');

/**
 * Create a Fabric sale register
 */
exports.create = function(req, res) {
	var fabricSaleRegister = new FabricSaleRegister(req.body);
	fabricSaleRegister.user = req.user;

	fabricSaleRegister.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricSaleRegister);
		}
	});
};

/**
 * Show the current Fabric sale register
 */
exports.read = function(req, res) {
	res.jsonp(req.fabricSaleRegister);
};

/**
 * Update a Fabric sale register
 */
exports.update = function(req, res) {
	var fabricSaleRegister = req.fabricSaleRegister ;

	fabricSaleRegister = _.extend(fabricSaleRegister , req.body);

	fabricSaleRegister.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricSaleRegister);
		}
	});
};

/**
 * Delete an Fabric sale register
 */
exports.delete = function(req, res) {
	var fabricSaleRegister = req.fabricSaleRegister ;

	fabricSaleRegister.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricSaleRegister);
		}
	});
};

/**
 * List of Fabric sale registers
 */
exports.list = function(req, res) { 
	FabricSaleRegister.find().sort('-created').populate('user', 'displayName').exec(function(err, fabricSaleRegisters) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricSaleRegisters);
		}
	});
};

/**
 * Fabric sale register middleware
 */
exports.fabricSaleRegisterByID = function(req, res, next, id) { 
	FabricSaleRegister.findById(id).populate('user', 'displayName').exec(function(err, fabricSaleRegister) {
		if (err) return next(err);
		if (! fabricSaleRegister) return next(new Error('Failed to load Fabric sale register ' + id));
		req.fabricSaleRegister = fabricSaleRegister ;
		next();
	});
};

/**
 * Fabric sale register authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.fabricSaleRegister.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
