'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	DirectInwardEntry = mongoose.model('DirectInwardEntry'),
	_ = require('lodash');

/**
 * Create a Direct inward entry
 */
exports.create = function(req, res) {
	var directInwardEntry = new DirectInwardEntry(req.body);
	directInwardEntry.user = req.user;

	directInwardEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(directInwardEntry);
		}
	});
};

/**
 * Show the current Direct inward entry
 */
exports.read = function(req, res) {
	res.jsonp(req.directInwardEntry);
};

/**
 * Update a Direct inward entry
 */
exports.update = function(req, res) {
	var directInwardEntry = req.directInwardEntry ;

	directInwardEntry = _.extend(directInwardEntry , req.body);

	directInwardEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(directInwardEntry);
		}
	});
};

/**
 * Delete an Direct inward entry
 */
exports.delete = function(req, res) {
	var directInwardEntry = req.directInwardEntry ;

	directInwardEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(directInwardEntry);
		}
	});
};

/**
 * List of Direct inward entries
 */
exports.list = function(req, res) { 
	DirectInwardEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, directInwardEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(directInwardEntries);
		}
	});
};

/**
 * Direct inward entry middleware
 */
exports.directInwardEntryByID = function(req, res, next, id) { 
	DirectInwardEntry.findById(id).populate('user', 'displayName').exec(function(err, directInwardEntry) {
		if (err) return next(err);
		if (! directInwardEntry) return next(new Error('Failed to load Direct inward entry ' + id));
		req.directInwardEntry = directInwardEntry ;
		next();
	});
};

/**
 * Direct inward entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.directInwardEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
