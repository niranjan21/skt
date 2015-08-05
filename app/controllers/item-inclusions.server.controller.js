'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	ItemInclusion = mongoose.model('ItemInclusion'),
	_ = require('lodash');

/**
 * Create a Item inclusion
 */
exports.create = function(req, res) {
	var itemInclusion = new ItemInclusion(req.body);
	itemInclusion.user = req.user;

	itemInclusion.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(itemInclusion);
		}
	});
};

/**
 * Show the current Item inclusion
 */
exports.read = function(req, res) {
	res.jsonp(req.itemInclusion);
};

/**
 * Update a Item inclusion
 */
exports.update = function(req, res) {
	var itemInclusion = req.itemInclusion ;

	itemInclusion = _.extend(itemInclusion , req.body);

	itemInclusion.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(itemInclusion);
		}
	});
};

/**
 * Delete an Item inclusion
 */
exports.delete = function(req, res) {
	var itemInclusion = req.itemInclusion ;

	itemInclusion.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(itemInclusion);
		}
	});
};

/**
 * List of Item inclusions
 */
exports.list = function(req, res) { 
	ItemInclusion.find().sort('-created').populate('user', 'displayName').exec(function(err, itemInclusions) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(itemInclusions);
		}
	});
};

/**
 * Item inclusion middleware
 */
exports.itemInclusionByID = function(req, res, next, id) { 
	ItemInclusion.findById(id).populate('user', 'displayName').exec(function(err, itemInclusion) {
		if (err) return next(err);
		if (! itemInclusion) return next(new Error('Failed to load Item inclusion ' + id));
		req.itemInclusion = itemInclusion ;
		next();
	});
};

/**
 * Item inclusion authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.itemInclusion.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
