'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	B = mongoose.model('B'),
	_ = require('lodash');

/**
 * Create a B
 */
exports.create = function(req, res) {
	var b = new B(req.body);
	b.user = req.user;

	b.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(b);
		}
	});
};

/**
 * Show the current B
 */
exports.read = function(req, res) {
	res.jsonp(req.b);
};

/**
 * Update a B
 */
exports.update = function(req, res) {
	var b = req.b ;

	b = _.extend(b , req.body);

	b.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(b);
		}
	});
};

/**
 * Delete an B
 */
exports.delete = function(req, res) {
	var b = req.b ;

	b.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(b);
		}
	});
};

/**
 * List of Bs
 */
exports.list = function(req, res) { 
	B.find().sort('-created').populate('user', 'displayName').exec(function(err, bs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bs);
		}
	});
};

/**
 * B middleware
 */
exports.bByID = function(req, res, next, id) { 
	B.findById(id).populate('user', 'displayName').exec(function(err, b) {
		if (err) return next(err);
		if (! b) return next(new Error('Failed to load B ' + id));
		req.b = b ;
		next();
	});
};

/**
 * B authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.b.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
