'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	FabricGroup = mongoose.model('FabricGroup'),
	_ = require('lodash');

/**
 * Create a Fabric group
 */
exports.create = function(req, res) {
	var fabricGroup = new FabricGroup(req.body);
	fabricGroup.user = req.user;

	fabricGroup.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricGroup);
		}
	});
};

/**
 * Show the current Fabric group
 */
exports.read = function(req, res) {
	res.jsonp(req.fabricGroup);
};

/**
 * Update a Fabric group
 */
exports.update = function(req, res) {
	var fabricGroup = req.fabricGroup ;

	fabricGroup = _.extend(fabricGroup , req.body);

	fabricGroup.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricGroup);
		}
	});
};

/**
 * Delete an Fabric group
 */
exports.delete = function(req, res) {
	var fabricGroup = req.fabricGroup ;

	fabricGroup.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricGroup);
		}
	});
};

/**
 * List of Fabric groups
 */
exports.list = function(req, res) { 
	FabricGroup.find().sort('-created').populate('user', 'displayName').exec(function(err, fabricGroups) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricGroups);
		}
	});
};

/**
 * Fabric group middleware
 */
exports.fabricGroupByID = function(req, res, next, id) { 
	FabricGroup.findById(id).populate('user', 'displayName').exec(function(err, fabricGroup) {
		if (err) return next(err);
		if (! fabricGroup) return next(new Error('Failed to load Fabric group ' + id));
		req.fabricGroup = fabricGroup ;
		next();
	});
};

/**
 * Fabric group authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.fabricGroup.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
