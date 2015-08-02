'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	FabricTransfer = mongoose.model('FabricTransfer'),
	_ = require('lodash');

/**
 * Create a Fabric transfer
 */
exports.create = function(req, res) {
	var fabricTransfer = new FabricTransfer(req.body);
	fabricTransfer.user = req.user;

	fabricTransfer.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricTransfer);
		}
	});
};

/**
 * Show the current Fabric transfer
 */
exports.read = function(req, res) {
	res.jsonp(req.fabricTransfer);
};

/**
 * Update a Fabric transfer
 */
exports.update = function(req, res) {
	var fabricTransfer = req.fabricTransfer ;

	fabricTransfer = _.extend(fabricTransfer , req.body);

	fabricTransfer.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricTransfer);
		}
	});
};

/**
 * Delete an Fabric transfer
 */
exports.delete = function(req, res) {
	var fabricTransfer = req.fabricTransfer ;

	fabricTransfer.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricTransfer);
		}
	});
};

/**
 * List of Fabric transfers
 */
exports.list = function(req, res) { 
	FabricTransfer.find().sort('-created').populate('user', 'displayName').exec(function(err, fabricTransfers) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricTransfers);
		}
	});
};

/**
 * Fabric transfer middleware
 */
exports.fabricTransferByID = function(req, res, next, id) { 
	FabricTransfer.findById(id).populate('user', 'displayName').exec(function(err, fabricTransfer) {
		if (err) return next(err);
		if (! fabricTransfer) return next(new Error('Failed to load Fabric transfer ' + id));
		req.fabricTransfer = fabricTransfer ;
		next();
	});
};

/**
 * Fabric transfer authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.fabricTransfer.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
