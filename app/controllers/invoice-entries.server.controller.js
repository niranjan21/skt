'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	InvoiceEntry = mongoose.model('InvoiceEntry'),
	_ = require('lodash');

/**
 * Create a Invoice entry
 */
exports.create = function(req, res) {
	var invoiceEntry = new InvoiceEntry(req.body);
	invoiceEntry.user = req.user;

	invoiceEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(invoiceEntry);
		}
	});
};

/**
 * Show the current Invoice entry
 */
exports.read = function(req, res) {
	res.jsonp(req.invoiceEntry);
};

/**
 * Update a Invoice entry
 */
exports.update = function(req, res) {
	var invoiceEntry = req.invoiceEntry ;

	invoiceEntry = _.extend(invoiceEntry , req.body);

	invoiceEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(invoiceEntry);
		}
	});
};

/**
 * Delete an Invoice entry
 */
exports.delete = function(req, res) {
	var invoiceEntry = req.invoiceEntry ;

	invoiceEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(invoiceEntry);
		}
	});
};

/**
 * List of Invoice entries
 */
exports.list = function(req, res) { 
	InvoiceEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, invoiceEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(invoiceEntries);
		}
	});
};

/**
 * Invoice entry middleware
 */
exports.invoiceEntryByID = function(req, res, next, id) { 
	InvoiceEntry.findById(id).populate('user', 'displayName').exec(function(err, invoiceEntry) {
		if (err) return next(err);
		if (! invoiceEntry) return next(new Error('Failed to load Invoice entry ' + id));
		req.invoiceEntry = invoiceEntry ;
		next();
	});
};

/**
 * Invoice entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.invoiceEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
