'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	FabricItemMaster = mongoose.model('FabricItemMaster'),
	_ = require('lodash');

/**
 * Create a Fabric item master
 */
exports.create = function(req, res) {
	var fabricItemMaster = new FabricItemMaster(req.body);
	fabricItemMaster.user = req.user;

	fabricItemMaster.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricItemMaster);
		}
	});
};

/**
 * Show the current Fabric item master
 */
exports.read = function(req, res) {
	res.jsonp(req.fabricItemMaster);
};

/**
 * Update a Fabric item master
 */
exports.update = function(req, res) {
	var fabricItemMaster = req.fabricItemMaster ;

	fabricItemMaster = _.extend(fabricItemMaster , req.body);

	fabricItemMaster.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricItemMaster);
		}
	});
};

/**
 * Delete an Fabric item master
 */
exports.delete = function(req, res) {
	var fabricItemMaster = req.fabricItemMaster ;

	fabricItemMaster.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricItemMaster);
		}
	});
};

/**
 * List of Fabric item masters
 */
exports.list = function(req, res) { 
	FabricItemMaster.find().sort('-created').populate('user', 'displayName').exec(function(err, fabricItemMasters) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricItemMasters);
		}
	});
};

/**
 * Fabric item master middleware
 */
exports.fabricItemMasterByID = function(req, res, next, id) { 
	FabricItemMaster.findById(id).populate('user', 'displayName').exec(function(err, fabricItemMaster) {
		if (err) return next(err);
		if (! fabricItemMaster) return next(new Error('Failed to load Fabric item master ' + id));
		req.fabricItemMaster = fabricItemMaster ;
		next();
	});
};

/**
 * Fabric item master authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.fabricItemMaster.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
