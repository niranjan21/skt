'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	DiaList = mongoose.model('DiaList'),
	_ = require('lodash');

/**
 * Create a Dia list
 */
exports.create = function(req, res) {
	var diaList = new DiaList(req.body);
	diaList.user = req.user;

	diaList.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(diaList);
		}
	});
};

/**
 * Show the current Dia list
 */
exports.read = function(req, res) {
	res.jsonp(req.diaList);
};

/**
 * Update a Dia list
 */
exports.update = function(req, res) {
	var diaList = req.diaList ;

	diaList = _.extend(diaList , req.body);

	diaList.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(diaList);
		}
	});
};

/**
 * Delete an Dia list
 */
exports.delete = function(req, res) {
	var diaList = req.diaList ;

	diaList.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(diaList);
		}
	});
};

/**
 * List of Dia lists
 */
exports.list = function(req, res) { 
	DiaList.find().sort('-created').populate('user', 'displayName').exec(function(err, diaLists) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(diaLists);
		}
	});
};

/**
 * Dia list middleware
 */
exports.diaListByID = function(req, res, next, id) { 
	DiaList.findById(id).populate('user', 'displayName').exec(function(err, diaList) {
		if (err) return next(err);
		if (! diaList) return next(new Error('Failed to load Dia list ' + id));
		req.diaList = diaList ;
		next();
	});
};

/**
 * Dia list authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.diaList.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
