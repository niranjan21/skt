'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	PartyAllot = mongoose.model('PartyAllot'),
	_ = require('lodash');

/**
 * Create a Party allot
 */
exports.create = function(req, res) {
	var partyAllot = new PartyAllot(req.body);
	partyAllot.user = req.user;

	partyAllot.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(partyAllot);
		}
	});
};

/**
 * Show the current Party allot
 */
exports.read = function(req, res) {
	res.jsonp(req.partyAllot);
};

/**
 * Update a Party allot
 */
exports.update = function(req, res) {
	var partyAllot = req.partyAllot ;

	partyAllot = _.extend(partyAllot , req.body);

	partyAllot.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(partyAllot);
		}
	});
};

/**
 * Delete an Party allot
 */
exports.delete = function(req, res) {
	var partyAllot = req.partyAllot ;

	partyAllot.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(partyAllot);
		}
	});
};

/**
 * List of Party allots
 */
exports.list = function(req, res) { 
	PartyAllot.find().sort('-created').populate('user', 'displayName').exec(function(err, partyAllots) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(partyAllots);
		}
	});
};

/**
 * Party allot middleware
 */
exports.partyAllotByID = function(req, res, next, id) { 
	PartyAllot.findById(id).populate('user', 'displayName').exec(function(err, partyAllot) {
		if (err) return next(err);
		if (! partyAllot) return next(new Error('Failed to load Party allot ' + id));
		req.partyAllot = partyAllot ;
		next();
	});
};

/**
 * Party allot authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.partyAllot.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
