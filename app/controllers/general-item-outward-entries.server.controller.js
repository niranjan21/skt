'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	GeneralItemOutwardEntry = mongoose.model('GeneralItemOutwardEntry'),
	_ = require('lodash');

/**
 * Create a General item outward entry
 */
exports.create = function(req, res) {
	var generalItemOutwardEntry = new GeneralItemOutwardEntry(req.body);
	generalItemOutwardEntry.user = req.user;

	generalItemOutwardEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalItemOutwardEntry);
		}
	});
};

/**
 * Show the current General item outward entry
 */
exports.read = function(req, res) {
	res.jsonp(req.generalItemOutwardEntry);
};

/**
 * Update a General item outward entry
 */
exports.update = function(req, res) {
	var generalItemOutwardEntry = req.generalItemOutwardEntry ;

	generalItemOutwardEntry = _.extend(generalItemOutwardEntry , req.body);

	generalItemOutwardEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalItemOutwardEntry);
		}
	});
};

/**
 * Delete an General item outward entry
 */
exports.delete = function(req, res) {
	var generalItemOutwardEntry = req.generalItemOutwardEntry ;

	generalItemOutwardEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalItemOutwardEntry);
		}
	});
};

/**
 * List of General item outward entries
 */
exports.list = function(req, res) { 
	GeneralItemOutwardEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, generalItemOutwardEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalItemOutwardEntries);
		}
	});
};

/**
 * General item outward entry middleware
 */
exports.generalItemOutwardEntryByID = function(req, res, next, id) { 
	GeneralItemOutwardEntry.findById(id).populate('user', 'displayName').exec(function(err, generalItemOutwardEntry) {
		if (err) return next(err);
		if (! generalItemOutwardEntry) return next(new Error('Failed to load General item outward entry ' + id));
		req.generalItemOutwardEntry = generalItemOutwardEntry ;
		next();
	});
};

/**
 * General item outward entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.generalItemOutwardEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
