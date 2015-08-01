'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	PaymentEntry = mongoose.model('PaymentEntry'),
	_ = require('lodash');

/**
 * Create a Payment entry
 */
exports.create = function(req, res) {
	var paymentEntry = new PaymentEntry(req.body);
	paymentEntry.user = req.user;

	paymentEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(paymentEntry);
		}
	});
};

/**
 * Show the current Payment entry
 */
exports.read = function(req, res) {
	res.jsonp(req.paymentEntry);
};

/**
 * Update a Payment entry
 */
exports.update = function(req, res) {
	var paymentEntry = req.paymentEntry ;

	paymentEntry = _.extend(paymentEntry , req.body);

	paymentEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(paymentEntry);
		}
	});
};

/**
 * Delete an Payment entry
 */
exports.delete = function(req, res) {
	var paymentEntry = req.paymentEntry ;

	paymentEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(paymentEntry);
		}
	});
};

/**
 * List of Payment entries
 */
exports.list = function(req, res) { 
	PaymentEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, paymentEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(paymentEntries);
		}
	});
};

/**
 * Payment entry middleware
 */
exports.paymentEntryByID = function(req, res, next, id) { 
	PaymentEntry.findById(id).populate('user', 'displayName').exec(function(err, paymentEntry) {
		if (err) return next(err);
		if (! paymentEntry) return next(new Error('Failed to load Payment entry ' + id));
		req.paymentEntry = paymentEntry ;
		next();
	});
};

/**
 * Payment entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.paymentEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
