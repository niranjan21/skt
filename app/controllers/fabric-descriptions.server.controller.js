'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	FabricDescription = mongoose.model('FabricDescription'),
	_ = require('lodash');

/**
 * Create a Fabric description
 */
exports.create = function(req, res) {
	var fabricDescription = new FabricDescription(req.body);
	fabricDescription.user = req.user;

	fabricDescription.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricDescription);
		}
	});
};

/**
 * Show the current Fabric description
 */
exports.read = function(req, res) {
	res.jsonp(req.fabricDescription);
};

/**
 * Update a Fabric description
 */
exports.update = function(req, res) {
	var fabricDescription = req.fabricDescription ;

	fabricDescription = _.extend(fabricDescription , req.body);

	fabricDescription.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricDescription);
		}
	});
};

/**
 * Delete an Fabric description
 */
exports.delete = function(req, res) {
	var fabricDescription = req.fabricDescription ;

	fabricDescription.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricDescription);
		}
	});
};

/**
 * List of Fabric descriptions
 */
exports.list = function(req, res) { 
	FabricDescription.find().sort('-created').populate('user', 'displayName').exec(function(err, fabricDescriptions) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricDescriptions);
		}
	});
};

/**
 * Fabric description middleware
 */
exports.fabricDescriptionByID = function(req, res, next, id) { 
	FabricDescription.findById(id).populate('user', 'displayName').exec(function(err, fabricDescription) {
		if (err) return next(err);
		if (! fabricDescription) return next(new Error('Failed to load Fabric description ' + id));
		req.fabricDescription = fabricDescription ;
		next();
	});
};

/**
 * Fabric description authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.fabricDescription.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
