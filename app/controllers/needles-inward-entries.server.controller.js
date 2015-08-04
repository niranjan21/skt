'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	NeedlesInwardEntry = mongoose.model('NeedlesInwardEntry'),
	_ = require('lodash');

/**
 * Create a Needles inward entry
 */
exports.create = function(req, res) {
	var needlesInwardEntry = new NeedlesInwardEntry(req.body);
	needlesInwardEntry.user = req.user;

	needlesInwardEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(needlesInwardEntry);
		}
	});
};

/**
 * Show the current Needles inward entry
 */
exports.read = function(req, res) {
	res.jsonp(req.needlesInwardEntry);
};

/**
 * Update a Needles inward entry
 */
exports.update = function(req, res) {
	var needlesInwardEntry = req.needlesInwardEntry ;

	needlesInwardEntry = _.extend(needlesInwardEntry , req.body);

	needlesInwardEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(needlesInwardEntry);
		}
	});
};

/**
 * Delete an Needles inward entry
 */
exports.delete = function(req, res) {
	var needlesInwardEntry = req.needlesInwardEntry ;

	needlesInwardEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(needlesInwardEntry);
		}
	});
};

/**
 * List of Needles inward entries
 */
exports.list = function(req, res) { 
	NeedlesInwardEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, needlesInwardEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(needlesInwardEntries);
		}
	});
};

/**
 * Needles inward entry middleware
 */
exports.needlesInwardEntryByID = function(req, res, next, id) { 
	NeedlesInwardEntry.findById(id).populate('user', 'displayName').exec(function(err, needlesInwardEntry) {
		if (err) return next(err);
		if (! needlesInwardEntry) return next(new Error('Failed to load Needles inward entry ' + id));
		req.needlesInwardEntry = needlesInwardEntry ;
		next();
	});
};

/**
 * Needles inward entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.needlesInwardEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
