'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	YarnReturn = mongoose.model('YarnReturn'),
	_ = require('lodash');

/**
 * Create a Yarn return
 */
exports.create = function(req, res) {
	var yarnReturn = new YarnReturn(req.body);
	yarnReturn.user = req.user;

	yarnReturn.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnReturn);
		}
	});
};

/**
 * Show the current Yarn return
 */
exports.read = function(req, res) {
	res.jsonp(req.yarnReturn);
};

/**
 * Update a Yarn return
 */
exports.update = function(req, res) {
	var yarnReturn = req.yarnReturn ;

	yarnReturn = _.extend(yarnReturn , req.body);

	yarnReturn.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnReturn);
		}
	});
};

/**
 * Delete an Yarn return
 */
exports.delete = function(req, res) {
	var yarnReturn = req.yarnReturn ;

	yarnReturn.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnReturn);
		}
	});
};

/**
 * List of Yarn returns
 */
exports.list = function(req, res) { 
	YarnReturn.find().sort('-created').populate('user', 'displayName').exec(function(err, yarnReturns) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(yarnReturns);
		}
	});
};

/**
 * Yarn return middleware
 */
exports.yarnReturnByID = function(req, res, next, id) { 
	YarnReturn.findById(id).populate('user', 'displayName').exec(function(err, yarnReturn) {
		if (err) return next(err);
		if (! yarnReturn) return next(new Error('Failed to load Yarn return ' + id));
		req.yarnReturn = yarnReturn ;
		next();
	});
};

/**
 * Yarn return authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.yarnReturn.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
