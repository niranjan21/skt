'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	YarnDescription = mongoose.model('YarnDescription'),
	_ = require('lodash');

/**
 * Create a Yarn description
 */
exports.create = function(req, res) {
	var yarnDescription = new YarnDescription(req.body);
	yarnDescription.user = req.user;

	yarnDescription.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnDescription);
		}
	});
};

/**
 * Show the current Yarn description
 */
exports.read = function(req, res) {
	res.jsonp(req.yarnDescription);
};

/**
 * Update a Yarn description
 */
exports.update = function(req, res) {
	var yarnDescription = req.yarnDescription ;

	yarnDescription = _.extend(yarnDescription , req.body);

	yarnDescription.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnDescription);
		}
	});
};

/**
 * Delete an Yarn description
 */
exports.delete = function(req, res) {
	var yarnDescription = req.yarnDescription ;

	yarnDescription.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnDescription);
		}
	});
};

/**
 * List of Yarn descriptions
 */
exports.list = function(req, res) { 
	YarnDescription.find().sort('-created').populate('user', 'displayName').exec(function(err, yarnDescriptions) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnDescriptions);
		}
	});
};

/**
 * Yarn description middleware
 */
exports.yarnDescriptionByID = function(req, res, next, id) { 
	YarnDescription.findById(id).populate('user', 'displayName').exec(function(err, yarnDescription) {
		if (err) return next(err);
		if (! yarnDescription) return next(new Error('Failed to load Yarn description ' + id));
		req.yarnDescription = yarnDescription ;
		next();
	});
};

/**
 * Yarn description authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.yarnDescription.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
