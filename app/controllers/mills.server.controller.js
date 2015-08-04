'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Mill = mongoose.model('Mill'),
	_ = require('lodash');

/**
 * Create a Mill
 */
exports.create = function(req, res) {
	var mill = new Mill(req.body);
	mill.user = req.user;

	mill.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mill);
		}
	});
};

/**
 * Show the current Mill
 */
exports.read = function(req, res) {
	res.jsonp(req.mill);
};

/**
 * Update a Mill
 */
exports.update = function(req, res) {
	var mill = req.mill ;

	mill = _.extend(mill , req.body);

	mill.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mill);
		}
	});
};

/**
 * Delete an Mill
 */
exports.delete = function(req, res) {
	var mill = req.mill ;

	mill.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mill);
		}
	});
};

/**
 * List of Mills
 */
exports.list = function(req, res) { 
	Mill.find().sort('-created').populate('user', 'displayName').exec(function(err, mills) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mills);
		}
	});
};

/**
 * Mill middleware
 */
exports.millByID = function(req, res, next, id) { 
	Mill.findById(id).populate('user', 'displayName').exec(function(err, mill) {
		if (err) return next(err);
		if (! mill) return next(new Error('Failed to load Mill ' + id));
		req.mill = mill ;
		next();
	});
};

/**
 * Mill authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.mill.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
