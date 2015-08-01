'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	DeliveryEntry = mongoose.model('DeliveryEntry'),
	_ = require('lodash');

/**
 * Create a Delivery entry
 */
exports.create = function(req, res) {
	var deliveryEntry = new DeliveryEntry(req.body);
	deliveryEntry.user = req.user;

	deliveryEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deliveryEntry);
		}
	});
};

/**
 * Show the current Delivery entry
 */
exports.read = function(req, res) {
	res.jsonp(req.deliveryEntry);
};

/**
 * Update a Delivery entry
 */
exports.update = function(req, res) {
	var deliveryEntry = req.deliveryEntry ;

	deliveryEntry = _.extend(deliveryEntry , req.body);

	deliveryEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deliveryEntry);
		}
	});
};

/**
 * Delete an Delivery entry
 */
exports.delete = function(req, res) {
	var deliveryEntry = req.deliveryEntry ;

	deliveryEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deliveryEntry);
		}
	});
};

/**
 * List of Delivery entries
 */
exports.list = function(req, res) { 
	DeliveryEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, deliveryEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deliveryEntries);
		}
	});
};

/**
 * Delivery entry middleware
 */
exports.deliveryEntryByID = function(req, res, next, id) { 
	DeliveryEntry.findById(id).populate('user', 'displayName').exec(function(err, deliveryEntry) {
		if (err) return next(err);
		if (! deliveryEntry) return next(new Error('Failed to load Delivery entry ' + id));
		req.deliveryEntry = deliveryEntry ;
		next();
	});
};

/**
 * Delivery entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.deliveryEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
