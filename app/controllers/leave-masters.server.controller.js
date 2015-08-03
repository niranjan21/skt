'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	LeaveMaster = mongoose.model('LeaveMaster'),
	_ = require('lodash');

/**
 * Create a Leave master
 */
exports.create = function(req, res) {
	var leaveMaster = new LeaveMaster(req.body);
	leaveMaster.user = req.user;

	leaveMaster.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(leaveMaster);
		}
	});
};

/**
 * Show the current Leave master
 */
exports.read = function(req, res) {
	res.jsonp(req.leaveMaster);
};

/**
 * Update a Leave master
 */
exports.update = function(req, res) {
	var leaveMaster = req.leaveMaster ;

	leaveMaster = _.extend(leaveMaster , req.body);

	leaveMaster.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(leaveMaster);
		}
	});
};

/**
 * Delete an Leave master
 */
exports.delete = function(req, res) {
	var leaveMaster = req.leaveMaster ;

	leaveMaster.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(leaveMaster);
		}
	});
};

/**
 * List of Leave masters
 */
exports.list = function(req, res) { 
	LeaveMaster.find().sort('-created').populate('user', 'displayName').exec(function(err, leaveMasters) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(leaveMasters);
		}
	});
};

/**
 * Leave master middleware
 */
exports.leaveMasterByID = function(req, res, next, id) { 
	LeaveMaster.findById(id).populate('user', 'displayName').exec(function(err, leaveMaster) {
		if (err) return next(err);
		if (! leaveMaster) return next(new Error('Failed to load Leave master ' + id));
		req.leaveMaster = leaveMaster ;
		next();
	});
};

/**
 * Leave master authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.leaveMaster.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
