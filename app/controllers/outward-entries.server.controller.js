'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	OutwardEntry = mongoose.model('OutwardEntry'),
	_ = require('lodash');

/**
 * Create a Outward entry
 */
exports.create = function(req, res) {
	var outwardEntry = new OutwardEntry(req.body);
	outwardEntry.user = req.user;

	outwardEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(outwardEntry);
		}
	});
};

/**
 * Show the current Outward entry
 */
exports.read = function(req, res) {
	res.jsonp(req.outwardEntry);
};

/**
 * Update a Outward entry
 */
exports.update = function(req, res) {
	var outwardEntry = req.outwardEntry ;

	outwardEntry = _.extend(outwardEntry , req.body);

	outwardEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(outwardEntry);
		}
	});
};

/**
 * Delete an Outward entry
 */
exports.delete = function(req, res) {
	var outwardEntry = req.outwardEntry ;

	outwardEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(outwardEntry);
		}
	});
};

/**
 * List of Outward entries
 */
exports.list = function(req, res) { 
	OutwardEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, outwardEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(outwardEntries);
		}
	});
};

/**
 * Outward entry middleware
 */
exports.outwardEntryByID = function(req, res, next, id) { 
	OutwardEntry.findById(id).populate('user', 'displayName').exec(function(err, outwardEntry) {
		if (err) return next(err);
		if (! outwardEntry) return next(new Error('Failed to load Outward entry ' + id));
		req.outwardEntry = outwardEntry ;
		next();
	});
};

/**
 * Outward entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.outwardEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
