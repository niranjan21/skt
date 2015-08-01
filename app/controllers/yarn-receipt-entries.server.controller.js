'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	YarnReceiptEntry = mongoose.model('YarnReceiptEntry'),
	_ = require('lodash');

/**
 * Create a Yarn receipt entry
 */
exports.create = function(req, res) {
	var yarnReceiptEntry = new YarnReceiptEntry(req.body);
	yarnReceiptEntry.user = req.user;

	yarnReceiptEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnReceiptEntry);
		}
	});
};

/**
 * Show the current Yarn receipt entry
 */
exports.read = function(req, res) {
	res.jsonp(req.yarnReceiptEntry);
};

/**
 * Update a Yarn receipt entry
 */
exports.update = function(req, res) {
	var yarnReceiptEntry = req.yarnReceiptEntry ;

	yarnReceiptEntry = _.extend(yarnReceiptEntry , req.body);

	yarnReceiptEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnReceiptEntry);
		}
	});
};

/**
 * Delete an Yarn receipt entry
 */
exports.delete = function(req, res) {
	var yarnReceiptEntry = req.yarnReceiptEntry ;

	yarnReceiptEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnReceiptEntry);
		}
	});
};

/**
 * List of Yarn receipt entries
 */
exports.list = function(req, res) { 
	YarnReceiptEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, yarnReceiptEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnReceiptEntries);
		}
	});
};

/**
 * Yarn receipt entry middleware
 */
exports.yarnReceiptEntryByID = function(req, res, next, id) { 
	YarnReceiptEntry.findById(id).populate('user', 'displayName').exec(function(err, yarnReceiptEntry) {
		if (err) return next(err);
		if (! yarnReceiptEntry) return next(new Error('Failed to load Yarn receipt entry ' + id));
		req.yarnReceiptEntry = yarnReceiptEntry ;
		next();
	});
};

/**
 * Yarn receipt entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.yarnReceiptEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
