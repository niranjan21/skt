'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	RollQualityControlEntry = mongoose.model('RollQualityControlEntry'),
	_ = require('lodash');

/**
 * Create a Roll quality control entry
 */
exports.create = function(req, res) {
	var rollQualityControlEntry = new RollQualityControlEntry(req.body);
	rollQualityControlEntry.user = req.user;

	rollQualityControlEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rollQualityControlEntry);
		}
	});
};

/**
 * Show the current Roll quality control entry
 */
exports.read = function(req, res) {
	res.jsonp(req.rollQualityControlEntry);
};

/**
 * Update a Roll quality control entry
 */
exports.update = function(req, res) {
	var rollQualityControlEntry = req.rollQualityControlEntry ;

	rollQualityControlEntry = _.extend(rollQualityControlEntry , req.body);

	rollQualityControlEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rollQualityControlEntry);
		}
	});
};

/**
 * Delete an Roll quality control entry
 */
exports.delete = function(req, res) {
	var rollQualityControlEntry = req.rollQualityControlEntry ;

	rollQualityControlEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rollQualityControlEntry);
		}
	});
};

/**
 * List of Roll quality control entries
 */
exports.list = function(req, res) { 
	RollQualityControlEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, rollQualityControlEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rollQualityControlEntries);
		}
	});
};

/**
 * Roll quality control entry middleware
 */
exports.rollQualityControlEntryByID = function(req, res, next, id) { 
	RollQualityControlEntry.findById(id).populate('user', 'displayName').exec(function(err, rollQualityControlEntry) {
		if (err) return next(err);
		if (! rollQualityControlEntry) return next(new Error('Failed to load Roll quality control entry ' + id));
		req.rollQualityControlEntry = rollQualityControlEntry ;
		next();
	});
};

/**
 * Roll quality control entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.rollQualityControlEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
