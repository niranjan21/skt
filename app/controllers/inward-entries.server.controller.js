'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	InwardEntry = mongoose.model('InwardEntry'),
	_ = require('lodash');

/**
 * Create a Inward entry
 */
exports.create = function(req, res) {
	var inwardEntry = new InwardEntry(req.body);
	inwardEntry.user = req.user;

	inwardEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(inwardEntry);
		}
	});
};

/**
 * Show the current Inward entry
 */
exports.read = function(req, res) {
	res.jsonp(req.inwardEntry);
};

/**
 * Update a Inward entry
 */
exports.update = function(req, res) {
	var inwardEntry = req.inwardEntry ;

	inwardEntry = _.extend(inwardEntry , req.body);

	inwardEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(inwardEntry);
		}
	});
};

/**
 * Delete an Inward entry
 */
exports.delete = function(req, res) {
	var inwardEntry = req.inwardEntry ;

	inwardEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(inwardEntry);
		}
	});
};

/**
 * List of Inward entries
 */
exports.list = function(req, res) { 
	InwardEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, inwardEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(inwardEntries);
		}
	});
};

/**
 * Inward entry middleware
 */
exports.inwardEntryByID = function(req, res, next, id) { 
	InwardEntry.findById(id).populate('user', 'displayName').exec(function(err, inwardEntry) {
		if (err) return next(err);
		if (! inwardEntry) return next(new Error('Failed to load Inward entry ' + id));
		req.inwardEntry = inwardEntry ;
		next();
	});
};

/**
 * Inward entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.inwardEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
