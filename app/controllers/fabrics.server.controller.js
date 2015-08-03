'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Fabric = mongoose.model('Fabric'),
	_ = require('lodash');

/**
 * Create a Fabric
 */
exports.create = function(req, res) {
	var fabric = new Fabric(req.body);
	fabric.user = req.user;

	fabric.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabric);
		}
	});
};

/**
 * Show the current Fabric
 */
exports.read = function(req, res) {
	res.jsonp(req.fabric);
};

/**
 * Update a Fabric
 */
exports.update = function(req, res) {
	var fabric = req.fabric ;

	fabric = _.extend(fabric , req.body);

	fabric.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabric);
		}
	});
};

/**
 * Delete an Fabric
 */
exports.delete = function(req, res) {
	var fabric = req.fabric ;

	fabric.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabric);
		}
	});
};

/**
 * List of Fabrics
 */
exports.list = function(req, res) { 
	Fabric.find().sort('-created').populate('user', 'displayName').exec(function(err, fabrics) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabrics);
		}
	});
};

/**
 * Fabric middleware
 */
exports.fabricByID = function(req, res, next, id) { 
	Fabric.findById(id).populate('user', 'displayName').exec(function(err, fabric) {
		if (err) return next(err);
		if (! fabric) return next(new Error('Failed to load Fabric ' + id));
		req.fabric = fabric ;
		next();
	});
};

/**
 * Fabric authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.fabric.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
