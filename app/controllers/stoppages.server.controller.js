'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Stoppage = mongoose.model('Stoppage'),
	_ = require('lodash');

/**
 * Create a Stoppage
 */
exports.create = function(req, res) {
	var stoppage = new Stoppage(req.body);
	stoppage.user = req.user;

	stoppage.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(stoppage);
		}
	});
};

/**
 * Show the current Stoppage
 */
exports.read = function(req, res) {
	res.jsonp(req.stoppage);
};

/**
 * Update a Stoppage
 */
exports.update = function(req, res) {
	var stoppage = req.stoppage ;

	stoppage = _.extend(stoppage , req.body);

	stoppage.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(stoppage);
		}
	});
};

/**
 * Delete an Stoppage
 */
exports.delete = function(req, res) {
	var stoppage = req.stoppage ;

	stoppage.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(stoppage);
		}
	});
};

/**
 * List of Stoppages
 */
exports.list = function(req, res) { 
	Stoppage.find().sort('-created').populate('user', 'displayName').exec(function(err, stoppages) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(stoppages);
		}
	});
};

/**
 * Stoppage middleware
 */
exports.stoppageByID = function(req, res, next, id) { 
	Stoppage.findById(id).populate('user', 'displayName').exec(function(err, stoppage) {
		if (err) return next(err);
		if (! stoppage) return next(new Error('Failed to load Stoppage ' + id));
		req.stoppage = stoppage ;
		next();
	});
};

/**
 * Stoppage authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.stoppage.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
