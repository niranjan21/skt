'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	FabricRequirementInwardEntry = mongoose.model('FabricRequirementInwardEntry'),
	_ = require('lodash');

/**
 * Create a Fabric requirement inward entry
 */
exports.create = function(req, res) {
	var fabricRequirementInwardEntry = new FabricRequirementInwardEntry(req.body);
	fabricRequirementInwardEntry.user = req.user;

	fabricRequirementInwardEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricRequirementInwardEntry);
		}
	});
};

/**
 * Show the current Fabric requirement inward entry
 */
exports.read = function(req, res) {
	res.jsonp(req.fabricRequirementInwardEntry);
};

/**
 * Update a Fabric requirement inward entry
 */
exports.update = function(req, res) {
	var fabricRequirementInwardEntry = req.fabricRequirementInwardEntry ;

	fabricRequirementInwardEntry = _.extend(fabricRequirementInwardEntry , req.body);

	fabricRequirementInwardEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricRequirementInwardEntry);
		}
	});
};

/**
 * Delete an Fabric requirement inward entry
 */
exports.delete = function(req, res) {
	var fabricRequirementInwardEntry = req.fabricRequirementInwardEntry ;

	fabricRequirementInwardEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricRequirementInwardEntry);
		}
	});
};

/**
 * List of Fabric requirement inward entries
 */
exports.list = function(req, res) { 
	FabricRequirementInwardEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, fabricRequirementInwardEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricRequirementInwardEntries);
		}
	});
};

/**
 * Fabric requirement inward entry middleware
 */
exports.fabricRequirementInwardEntryByID = function(req, res, next, id) { 
	FabricRequirementInwardEntry.findById(id).populate('user', 'displayName').exec(function(err, fabricRequirementInwardEntry) {
		if (err) return next(err);
		if (! fabricRequirementInwardEntry) return next(new Error('Failed to load Fabric requirement inward entry ' + id));
		req.fabricRequirementInwardEntry = fabricRequirementInwardEntry ;
		next();
	});
};

/**
 * Fabric requirement inward entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.fabricRequirementInwardEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
