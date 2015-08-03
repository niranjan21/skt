'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	CountMaster = mongoose.model('CountMaster'),
	_ = require('lodash');

/**
 * Create a Count master
 */
exports.create = function(req, res) {
	var countMaster = new CountMaster(req.body);
	countMaster.user = req.user;

	countMaster.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(countMaster);
		}
	});
};

/**
 * Show the current Count master
 */
exports.read = function(req, res) {
	res.jsonp(req.countMaster);
};

/**
 * Update a Count master
 */
exports.update = function(req, res) {
	var countMaster = req.countMaster ;

	countMaster = _.extend(countMaster , req.body);

	countMaster.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(countMaster);
		}
	});
};

/**
 * Delete an Count master
 */
exports.delete = function(req, res) {
	var countMaster = req.countMaster ;

	countMaster.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(countMaster);
		}
	});
};

/**
 * List of Count masters
 */
exports.list = function(req, res) { 
	CountMaster.find().sort('-created').populate('user', 'displayName').exec(function(err, countMasters) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(countMasters);
		}
	});
};

/**
 * Count master middleware
 */
exports.countMasterByID = function(req, res, next, id) { 
	CountMaster.findById(id).populate('user', 'displayName').exec(function(err, countMaster) {
		if (err) return next(err);
		if (! countMaster) return next(new Error('Failed to load Count master ' + id));
		req.countMaster = countMaster ;
		next();
	});
};

/**
 * Count master authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.countMaster.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
