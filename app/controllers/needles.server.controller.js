'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Needle = mongoose.model('Needle'),
	_ = require('lodash');

/**
 * Create a Needle
 */
exports.create = function(req, res) {
	var needle = new Needle(req.body);
	needle.user = req.user;

	needle.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(needle);
		}
	});
};

/**
 * Show the current Needle
 */
exports.read = function(req, res) {
	res.jsonp(req.needle);
};

/**
 * Update a Needle
 */
exports.update = function(req, res) {
	var needle = req.needle ;

	needle = _.extend(needle , req.body);

	needle.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(needle);
		}
	});
};

/**
 * Delete an Needle
 */
exports.delete = function(req, res) {
	var needle = req.needle ;

	needle.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(needle);
		}
	});
};

/**
 * List of Needles
 */
exports.list = function(req, res) { 
	Needle.find().sort('-created').populate('user', 'displayName').exec(function(err, needles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(needles);
		}
	});
};

/**
 * Needle middleware
 */
exports.needleByID = function(req, res, next, id) { 
	Needle.findById(id).populate('user', 'displayName').exec(function(err, needle) {
		if (err) return next(err);
		if (! needle) return next(new Error('Failed to load Needle ' + id));
		req.needle = needle ;
		next();
	});
};

/**
 * Needle authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.needle.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
