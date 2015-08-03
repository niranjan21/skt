'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Marketing = mongoose.model('Marketing'),
	_ = require('lodash');

/**
 * Create a Marketing
 */
exports.create = function(req, res) {
	var marketing = new Marketing(req.body);
	marketing.user = req.user;

	marketing.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(marketing);
		}
	});
};

/**
 * Show the current Marketing
 */
exports.read = function(req, res) {
	res.jsonp(req.marketing);
};

/**
 * Update a Marketing
 */
exports.update = function(req, res) {
	var marketing = req.marketing ;

	marketing = _.extend(marketing , req.body);

	marketing.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(marketing);
		}
	});
};

/**
 * Delete an Marketing
 */
exports.delete = function(req, res) {
	var marketing = req.marketing ;

	marketing.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(marketing);
		}
	});
};

/**
 * List of Marketings
 */
exports.list = function(req, res) { 
	Marketing.find().sort('-created').populate('user', 'displayName').exec(function(err, marketings) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(marketings);
		}
	});
};

/**
 * Marketing middleware
 */
exports.marketingByID = function(req, res, next, id) { 
	Marketing.findById(id).populate('user', 'displayName').exec(function(err, marketing) {
		if (err) return next(err);
		if (! marketing) return next(new Error('Failed to load Marketing ' + id));
		req.marketing = marketing ;
		next();
	});
};

/**
 * Marketing authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.marketing.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
