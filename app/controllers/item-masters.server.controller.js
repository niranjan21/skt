'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	ItemMaster = mongoose.model('ItemMaster'),
	_ = require('lodash');

/**
 * Create a Item master
 */
exports.create = function(req, res) {
	var itemMaster = new ItemMaster(req.body);
	itemMaster.user = req.user;

	itemMaster.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(itemMaster);
		}
	});
};

/**
 * Show the current Item master
 */
exports.read = function(req, res) {
	res.jsonp(req.itemMaster);
};

/**
 * Update a Item master
 */
exports.update = function(req, res) {
	var itemMaster = req.itemMaster ;

	itemMaster = _.extend(itemMaster , req.body);

	itemMaster.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(itemMaster);
		}
	});
};

/**
 * Delete an Item master
 */
exports.delete = function(req, res) {
	var itemMaster = req.itemMaster ;

	itemMaster.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(itemMaster);
		}
	});
};

/**
 * List of Item masters
 */
exports.list = function(req, res) { 
	ItemMaster.find().sort('-created').populate('user', 'displayName').exec(function(err, itemMasters) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(itemMasters);
		}
	});
};

/**
 * Item master middleware
 */
exports.itemMasterByID = function(req, res, next, id) { 
	ItemMaster.findById(id).populate('user', 'displayName').exec(function(err, itemMaster) {
		if (err) return next(err);
		if (! itemMaster) return next(new Error('Failed to load Item master ' + id));
		req.itemMaster = itemMaster ;
		next();
	});
};

/**
 * Item master authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.itemMaster.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
