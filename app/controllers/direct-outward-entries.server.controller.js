'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	DirectOutwardEntry = mongoose.model('DirectOutwardEntry'),
	_ = require('lodash');

/**
 * Create a Direct outward entry
 */
exports.create = function(req, res) {
	var directOutwardEntry = new DirectOutwardEntry(req.body);
	directOutwardEntry.user = req.user;

	directOutwardEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(directOutwardEntry);
		}
	});
};

/**
 * Show the current Direct outward entry
 */
exports.read = function(req, res) {
	res.jsonp(req.directOutwardEntry);
};

/**
 * Update a Direct outward entry
 */
exports.update = function(req, res) {
	var directOutwardEntry = req.directOutwardEntry ;

	directOutwardEntry = _.extend(directOutwardEntry , req.body);

	directOutwardEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(directOutwardEntry);
		}
	});
};

/**
 * Delete an Direct outward entry
 */
exports.delete = function(req, res) {
	var directOutwardEntry = req.directOutwardEntry ;

	directOutwardEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(directOutwardEntry);
		}
	});
};

/**
 * List of Direct outward entries
 */
exports.list = function(req, res) { 
	DirectOutwardEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, directOutwardEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(directOutwardEntries);
		}
	});
};

/**
 * Direct outward entry middleware
 */
exports.directOutwardEntryByID = function(req, res, next, id) { 
	DirectOutwardEntry.findById(id).populate('user', 'displayName').exec(function(err, directOutwardEntry) {
		if (err) return next(err);
		if (! directOutwardEntry) return next(new Error('Failed to load Direct outward entry ' + id));
		req.directOutwardEntry = directOutwardEntry ;
		next();
	});
};

/**
 * Direct outward entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.directOutwardEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
