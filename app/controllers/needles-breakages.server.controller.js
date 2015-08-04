'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	NeedlesBreakage = mongoose.model('NeedlesBreakage'),
	_ = require('lodash');

/**
 * Create a Needles breakage
 */
exports.create = function(req, res) {
	var needlesBreakage = new NeedlesBreakage(req.body);
	needlesBreakage.user = req.user;

	needlesBreakage.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(needlesBreakage);
		}
	});
};

/**
 * Show the current Needles breakage
 */
exports.read = function(req, res) {
	res.jsonp(req.needlesBreakage);
};

/**
 * Update a Needles breakage
 */
exports.update = function(req, res) {
	var needlesBreakage = req.needlesBreakage ;

	needlesBreakage = _.extend(needlesBreakage , req.body);

	needlesBreakage.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(needlesBreakage);
		}
	});
};

/**
 * Delete an Needles breakage
 */
exports.delete = function(req, res) {
	var needlesBreakage = req.needlesBreakage ;

	needlesBreakage.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(needlesBreakage);
		}
	});
};

/**
 * List of Needles breakages
 */
exports.list = function(req, res) { 
	NeedlesBreakage.find().sort('-created').populate('user', 'displayName').exec(function(err, needlesBreakages) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(needlesBreakages);
		}
	});
};

/**
 * Needles breakage middleware
 */
exports.needlesBreakageByID = function(req, res, next, id) { 
	NeedlesBreakage.findById(id).populate('user', 'displayName').exec(function(err, needlesBreakage) {
		if (err) return next(err);
		if (! needlesBreakage) return next(new Error('Failed to load Needles breakage ' + id));
		req.needlesBreakage = needlesBreakage ;
		next();
	});
};

/**
 * Needles breakage authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.needlesBreakage.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
