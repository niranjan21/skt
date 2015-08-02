'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	GeneralTestReport = mongoose.model('GeneralTestReport'),
	_ = require('lodash');

/**
 * Create a General test report
 */
exports.create = function(req, res) {
	var generalTestReport = new GeneralTestReport(req.body);
	generalTestReport.user = req.user;

	generalTestReport.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalTestReport);
		}
	});
};

/**
 * Show the current General test report
 */
exports.read = function(req, res) {
	res.jsonp(req.generalTestReport);
};

/**
 * Update a General test report
 */
exports.update = function(req, res) {
	var generalTestReport = req.generalTestReport ;

	generalTestReport = _.extend(generalTestReport , req.body);

	generalTestReport.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalTestReport);
		}
	});
};

/**
 * Delete an General test report
 */
exports.delete = function(req, res) {
	var generalTestReport = req.generalTestReport ;

	generalTestReport.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalTestReport);
		}
	});
};

/**
 * List of General test reports
 */
exports.list = function(req, res) { 
	GeneralTestReport.find().sort('-created').populate('user', 'displayName').exec(function(err, generalTestReports) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalTestReports);
		}
	});
};

/**
 * General test report middleware
 */
exports.generalTestReportByID = function(req, res, next, id) { 
	GeneralTestReport.findById(id).populate('user', 'displayName').exec(function(err, generalTestReport) {
		if (err) return next(err);
		if (! generalTestReport) return next(new Error('Failed to load General test report ' + id));
		req.generalTestReport = generalTestReport ;
		next();
	});
};

/**
 * General test report authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.generalTestReport.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
