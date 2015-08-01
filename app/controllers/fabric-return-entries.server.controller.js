'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	FabricReturnEntry = mongoose.model('FabricReturnEntry'),
	_ = require('lodash');

/**
 * Create a Fabric return entry
 */
exports.create = function(req, res) {
	var fabricReturnEntry = new FabricReturnEntry(req.body);
	fabricReturnEntry.user = req.user;

	fabricReturnEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricReturnEntry);
		}
	});
};

/**
 * Show the current Fabric return entry
 */
exports.read = function(req, res) {
	res.jsonp(req.fabricReturnEntry);
};

/**
 * Update a Fabric return entry
 */
exports.update = function(req, res) {
	var fabricReturnEntry = req.fabricReturnEntry ;

	fabricReturnEntry = _.extend(fabricReturnEntry , req.body);

	fabricReturnEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricReturnEntry);
		}
	});
};

/**
 * Delete an Fabric return entry
 */
exports.delete = function(req, res) {
	var fabricReturnEntry = req.fabricReturnEntry ;

	fabricReturnEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricReturnEntry);
		}
	});
};

/**
 * List of Fabric return entries
 */
exports.list = function(req, res) { 
	FabricReturnEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, fabricReturnEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricReturnEntries);
		}
	});
};

/**
 * Fabric return entry middleware
 */
exports.fabricReturnEntryByID = function(req, res, next, id) { 
	FabricReturnEntry.findById(id).populate('user', 'displayName').exec(function(err, fabricReturnEntry) {
		if (err) return next(err);
		if (! fabricReturnEntry) return next(new Error('Failed to load Fabric return entry ' + id));
		req.fabricReturnEntry = fabricReturnEntry ;
		next();
	});
};

/**
 * Fabric return entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.fabricReturnEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
