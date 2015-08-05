'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	YarnDelivery = mongoose.model('YarnDelivery'),
	_ = require('lodash');

/**
 * Create a Yarn delivery
 */
exports.create = function(req, res) {
	var yarnDelivery = new YarnDelivery(req.body);
	yarnDelivery.user = req.user;

	yarnDelivery.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnDelivery);
		}
	});
};

/**
 * Show the current Yarn delivery
 */
exports.read = function(req, res) {
	res.jsonp(req.yarnDelivery);
};

/**
 * Update a Yarn delivery
 */
exports.update = function(req, res) {
	var yarnDelivery = req.yarnDelivery ;

	yarnDelivery = _.extend(yarnDelivery , req.body);

	yarnDelivery.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnDelivery);
		}
	});
};

/**
 * Delete an Yarn delivery
 */
exports.delete = function(req, res) {
	var yarnDelivery = req.yarnDelivery ;

	yarnDelivery.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnDelivery);
		}
	});
};

/**
 * List of Yarn deliveries
 */
exports.list = function(req, res) { 
	YarnDelivery.find().sort('-created').populate('user', 'displayName').exec(function(err, yarnDeliveries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnDeliveries);
		}
	});
};

/**
 * Yarn delivery middleware
 */
exports.yarnDeliveryByID = function(req, res, next, id) { 
	YarnDelivery.findById(id).populate('user', 'displayName').exec(function(err, yarnDelivery) {
		if (err) return next(err);
		if (! yarnDelivery) return next(new Error('Failed to load Yarn delivery ' + id));
		req.yarnDelivery = yarnDelivery ;
		next();
	});
};

/**
 * Yarn delivery authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.yarnDelivery.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
