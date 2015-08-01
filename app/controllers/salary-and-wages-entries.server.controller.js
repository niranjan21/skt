'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	SalaryAndWagesEntry = mongoose.model('SalaryAndWagesEntry'),
	_ = require('lodash');

/**
 * Create a Salary and wages entry
 */
exports.create = function(req, res) {
	var salaryAndWagesEntry = new SalaryAndWagesEntry(req.body);
	salaryAndWagesEntry.user = req.user;

	salaryAndWagesEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(salaryAndWagesEntry);
		}
	});
};

/**
 * Show the current Salary and wages entry
 */
exports.read = function(req, res) {
	res.jsonp(req.salaryAndWagesEntry);
};

/**
 * Update a Salary and wages entry
 */
exports.update = function(req, res) {
	var salaryAndWagesEntry = req.salaryAndWagesEntry ;

	salaryAndWagesEntry = _.extend(salaryAndWagesEntry , req.body);

	salaryAndWagesEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(salaryAndWagesEntry);
		}
	});
};

/**
 * Delete an Salary and wages entry
 */
exports.delete = function(req, res) {
	var salaryAndWagesEntry = req.salaryAndWagesEntry ;

	salaryAndWagesEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(salaryAndWagesEntry);
		}
	});
};

/**
 * List of Salary and wages entries
 */
exports.list = function(req, res) { 
	SalaryAndWagesEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, salaryAndWagesEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(salaryAndWagesEntries);
		}
	});
};

/**
 * Salary and wages entry middleware
 */
exports.salaryAndWagesEntryByID = function(req, res, next, id) { 
	SalaryAndWagesEntry.findById(id).populate('user', 'displayName').exec(function(err, salaryAndWagesEntry) {
		if (err) return next(err);
		if (! salaryAndWagesEntry) return next(new Error('Failed to load Salary and wages entry ' + id));
		req.salaryAndWagesEntry = salaryAndWagesEntry ;
		next();
	});
};

/**
 * Salary and wages entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.salaryAndWagesEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
