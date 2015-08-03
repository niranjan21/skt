'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	CollarSize = mongoose.model('CollarSize'),
	_ = require('lodash');

/**
 * Create a Collar size
 */
exports.create = function(req, res) {
	var collarSize = new CollarSize(req.body);
	collarSize.user = req.user;

	collarSize.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(collarSize);
		}
	});
};

/**
 * Show the current Collar size
 */
exports.read = function(req, res) {
	res.jsonp(req.collarSize);
};

/**
 * Update a Collar size
 */
exports.update = function(req, res) {
	var collarSize = req.collarSize ;

	collarSize = _.extend(collarSize , req.body);

	collarSize.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(collarSize);
		}
	});
};

/**
 * Delete an Collar size
 */
exports.delete = function(req, res) {
	var collarSize = req.collarSize ;

	collarSize.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(collarSize);
		}
	});
};

/**
 * List of Collar sizes
 */
exports.list = function(req, res) { 
	CollarSize.find().sort('-created').populate('user', 'displayName').exec(function(err, collarSizes) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(collarSizes);
		}
	});
};

/**
 * Collar size middleware
 */
exports.collarSizeByID = function(req, res, next, id) { 
	CollarSize.findById(id).populate('user', 'displayName').exec(function(err, collarSize) {
		if (err) return next(err);
		if (! collarSize) return next(new Error('Failed to load Collar size ' + id));
		req.collarSize = collarSize ;
		next();
	});
};

/**
 * Collar size authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.collarSize.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
