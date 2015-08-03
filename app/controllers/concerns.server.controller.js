'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Concern = mongoose.model('Concern'),
	_ = require('lodash');

/**
 * Create a Concern
 */
exports.create = function(req, res) {
	var concern = new Concern(req.body);
	concern.user = req.user;

	concern.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(concern);
		}
	});
};

/**
 * Show the current Concern
 */
exports.read = function(req, res) {
	res.jsonp(req.concern);
};

/**
 * Update a Concern
 */
exports.update = function(req, res) {
	var concern = req.concern ;

	concern = _.extend(concern , req.body);

	concern.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(concern);
		}
	});
};

/**
 * Delete an Concern
 */
exports.delete = function(req, res) {
	var concern = req.concern ;

	concern.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(concern);
		}
	});
};

/**
 * List of Concerns
 */
exports.list = function(req, res) { 
	Concern.find().sort('-created').populate('user', 'displayName').exec(function(err, concerns) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(concerns);
		}
	});
};

/**
 * Concern middleware
 */
exports.concernByID = function(req, res, next, id) { 
	Concern.findById(id).populate('user', 'displayName').exec(function(err, concern) {
		if (err) return next(err);
		if (! concern) return next(new Error('Failed to load Concern ' + id));
		req.concern = concern ;
		next();
	});
};

/**
 * Concern authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.concern.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
