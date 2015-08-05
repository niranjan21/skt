'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	RollwiseEntry = mongoose.model('RollwiseEntry'),
	_ = require('lodash');

/**
 * Create a Rollwise entry
 */
exports.create = function(req, res) {
	var rollwiseEntry = new RollwiseEntry(req.body);
	rollwiseEntry.user = req.user;

	rollwiseEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rollwiseEntry);
		}
	});
};

/**
 * Show the current Rollwise entry
 */
exports.read = function(req, res) {
	res.jsonp(req.rollwiseEntry);
};

/**
 * Update a Rollwise entry
 */
exports.update = function(req, res) {
	var rollwiseEntry = req.rollwiseEntry ;

	rollwiseEntry = _.extend(rollwiseEntry , req.body);

	rollwiseEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rollwiseEntry);
		}
	});
};

/**
 * Delete an Rollwise entry
 */
exports.delete = function(req, res) {
	var rollwiseEntry = req.rollwiseEntry ;

	rollwiseEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rollwiseEntry);
		}
	});
};

/**
 * List of Rollwise entries
 */
exports.list = function(req, res) { 
	RollwiseEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, rollwiseEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(rollwiseEntries);
		}
	});
};

/**
 * Rollwise entry middleware
 */
exports.rollwiseEntryByID = function(req, res, next, id) { 
	RollwiseEntry.findById(id).populate('user', 'displayName').exec(function(err, rollwiseEntry) {
		if (err) return next(err);
		if (! rollwiseEntry) return next(new Error('Failed to load Rollwise entry ' + id));
		req.rollwiseEntry = rollwiseEntry ;
		next();
	});
};

/**
 * Rollwise entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.rollwiseEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
