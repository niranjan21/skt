'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	FabricReceipt = mongoose.model('FabricReceipt'),
	_ = require('lodash');

/**
 * Create a Fabric receipt
 */
exports.create = function(req, res) {
	var fabricReceipt = new FabricReceipt(req.body);
	fabricReceipt.user = req.user;

	fabricReceipt.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricReceipt);
		}
	});
};

/**
 * Show the current Fabric receipt
 */
exports.read = function(req, res) {
	res.jsonp(req.fabricReceipt);
};

/**
 * Update a Fabric receipt
 */
exports.update = function(req, res) {
	var fabricReceipt = req.fabricReceipt ;

	fabricReceipt = _.extend(fabricReceipt , req.body);

	fabricReceipt.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricReceipt);
		}
	});
};

/**
 * Delete an Fabric receipt
 */
exports.delete = function(req, res) {
	var fabricReceipt = req.fabricReceipt ;

	fabricReceipt.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricReceipt);
		}
	});
};

/**
 * List of Fabric receipts
 */
exports.list = function(req, res) { 
	FabricReceipt.find().sort('-created').populate('user', 'displayName').exec(function(err, fabricReceipts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricReceipts);
		}
	});
};

/**
 * Fabric receipt middleware
 */
exports.fabricReceiptByID = function(req, res, next, id) { 
	FabricReceipt.findById(id).populate('user', 'displayName').exec(function(err, fabricReceipt) {
		if (err) return next(err);
		if (! fabricReceipt) return next(new Error('Failed to load Fabric receipt ' + id));
		req.fabricReceipt = fabricReceipt ;
		next();
	});
};

/**
 * Fabric receipt authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.fabricReceipt.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
