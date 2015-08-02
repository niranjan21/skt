'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	GeneralItemInwardEntry = mongoose.model('GeneralItemInwardEntry'),
	_ = require('lodash');

/**
 * Create a General item inward entry
 */
exports.create = function(req, res) {
	var generalItemInwardEntry = new GeneralItemInwardEntry(req.body);
	generalItemInwardEntry.user = req.user;

	generalItemInwardEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalItemInwardEntry);
		}
	});
};

/**
 * Show the current General item inward entry
 */
exports.read = function(req, res) {
	res.jsonp(req.generalItemInwardEntry);
};

/**
 * Update a General item inward entry
 */
exports.update = function(req, res) {
	var generalItemInwardEntry = req.generalItemInwardEntry ;

	generalItemInwardEntry = _.extend(generalItemInwardEntry , req.body);

	generalItemInwardEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalItemInwardEntry);
		}
	});
};

/**
 * Delete an General item inward entry
 */
exports.delete = function(req, res) {
	var generalItemInwardEntry = req.generalItemInwardEntry ;

	generalItemInwardEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalItemInwardEntry);
		}
	});
};

/**
 * List of General item inward entries
 */
exports.list = function(req, res) { 
	GeneralItemInwardEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, generalItemInwardEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalItemInwardEntries);
		}
	});
};

/**
 * General item inward entry middleware
 */
exports.generalItemInwardEntryByID = function(req, res, next, id) { 
	GeneralItemInwardEntry.findById(id).populate('user', 'displayName').exec(function(err, generalItemInwardEntry) {
		if (err) return next(err);
		if (! generalItemInwardEntry) return next(new Error('Failed to load General item inward entry ' + id));
		req.generalItemInwardEntry = generalItemInwardEntry ;
		next();
	});
};

/**
 * General item inward entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.generalItemInwardEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
