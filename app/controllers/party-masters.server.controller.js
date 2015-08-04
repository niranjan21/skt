'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	PartyMaster = mongoose.model('PartyMaster'),
	_ = require('lodash');

/**
 * Create a Party master
 */
exports.create = function(req, res) {
	var partyMaster = new PartyMaster(req.body);
	partyMaster.user = req.user;

	partyMaster.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(partyMaster);
		}
	});
};

/**
 * Show the current Party master
 */
exports.read = function(req, res) {
	res.jsonp(req.partyMaster);
};

/**
 * Update a Party master
 */
exports.update = function(req, res) {
	var partyMaster = req.partyMaster ;

	partyMaster = _.extend(partyMaster , req.body);

	partyMaster.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(partyMaster);
		}
	});
};

/**
 * Delete an Party master
 */
exports.delete = function(req, res) {
	var partyMaster = req.partyMaster ;

	partyMaster.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(partyMaster);
		}
	});
};

/**
 * List of Party masters
 */
exports.list = function(req, res) { 
	PartyMaster.find().sort('-created').populate('user', 'displayName').exec(function(err, partyMasters) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(partyMasters);
		}
	});
};

/**
 * Party master middleware
 */
exports.partyMasterByID = function(req, res, next, id) { 
	PartyMaster.findById(id).populate('user', 'displayName').exec(function(err, partyMaster) {
		if (err) return next(err);
		if (! partyMaster) return next(new Error('Failed to load Party master ' + id));
		req.partyMaster = partyMaster ;
		next();
	});
};

/**
 * Party master authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.partyMaster.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
