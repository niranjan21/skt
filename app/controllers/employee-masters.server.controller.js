'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	EmployeeMaster = mongoose.model('EmployeeMaster'),
	_ = require('lodash');

/**
 * Create a Employee master
 */
exports.create = function(req, res) {
	var employeeMaster = new EmployeeMaster(req.body);
	employeeMaster.user = req.user;

	employeeMaster.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(employeeMaster);
		}
	});
};

/**
 * Show the current Employee master
 */
exports.read = function(req, res) {
	res.jsonp(req.employeeMaster);
};

/**
 * Update a Employee master
 */
exports.update = function(req, res) {
	var employeeMaster = req.employeeMaster ;

	employeeMaster = _.extend(employeeMaster , req.body);

	employeeMaster.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(employeeMaster);
		}
	});
};

/**
 * Delete an Employee master
 */
exports.delete = function(req, res) {
	var employeeMaster = req.employeeMaster ;

	employeeMaster.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(employeeMaster);
		}
	});
};

/**
 * List of Employee masters
 */
exports.list = function(req, res) { 
	EmployeeMaster.find().sort('-created').populate('user', 'displayName').exec(function(err, employeeMasters) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(employeeMasters);
		}
	});
};

/**
 * Employee master middleware
 */
exports.employeeMasterByID = function(req, res, next, id) { 
	EmployeeMaster.findById(id).populate('user', 'displayName').exec(function(err, employeeMaster) {
		if (err) return next(err);
		if (! employeeMaster) return next(new Error('Failed to load Employee master ' + id));
		req.employeeMaster = employeeMaster ;
		next();
	});
};

/**
 * Employee master authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.employeeMaster.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
