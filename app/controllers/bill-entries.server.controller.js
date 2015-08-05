'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	BillEntry = mongoose.model('BillEntry'),
	_ = require('lodash');

/**
 * Create a Bill entry
 */
exports.create = function(req, res) {
	var billEntry = new BillEntry(req.body);
	billEntry.user = req.user;

	billEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(billEntry);
		}
	});
};

/**
 * Show the current Bill entry
 */
exports.read = function(req, res) {
	res.jsonp(req.billEntry);
};

/**
 * Update a Bill entry
 */
exports.update = function(req, res) {
	var billEntry = req.billEntry ;

	billEntry = _.extend(billEntry , req.body);

	billEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(billEntry);
		}
	});
};

/**
 * Delete an Bill entry
 */
exports.delete = function(req, res) {
	var billEntry = req.billEntry ;

	billEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(billEntry);
		}
	});
};

/**
 * List of Bill entries
 */
exports.list = function(req, res) { 
	BillEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, billEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(billEntries);
		}
	});
};

/**
 * Bill entry middleware
 */
exports.billEntryByID = function(req, res, next, id) { 
	BillEntry.findById(id).populate('user', 'displayName').exec(function(err, billEntry) {
		if (err) return next(err);
		if (! billEntry) return next(new Error('Failed to load Bill entry ' + id));
		req.billEntry = billEntry ;
		next();
	});
};

/**
 * Bill entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.billEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
