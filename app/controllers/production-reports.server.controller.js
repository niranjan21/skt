'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	ProductionReport = mongoose.model('ProductionReport'),
	_ = require('lodash');

/**
 * Create a Production report
 */
exports.create = function(req, res) {
	var productionReport = new ProductionReport(req.body);
	productionReport.user = req.user;

	productionReport.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productionReport);
		}
	});
};

/**
 * Show the current Production report
 */
exports.read = function(req, res) {
	res.jsonp(req.productionReport);
};

/**
 * Update a Production report
 */
exports.update = function(req, res) {
	var productionReport = req.productionReport ;

	productionReport = _.extend(productionReport , req.body);

	productionReport.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productionReport);
		}
	});
};

/**
 * Delete an Production report
 */
exports.delete = function(req, res) {
	var productionReport = req.productionReport ;

	productionReport.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productionReport);
		}
	});
};

/**
 * List of Production reports
 */
exports.list = function(req, res) { 
	ProductionReport.find().sort('-created').populate('user', 'displayName').exec(function(err, productionReports) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(productionReports);
		}
	});
};

/**
 * Production report middleware
 */
exports.productionReportByID = function(req, res, next, id) { 
	ProductionReport.findById(id).populate('user', 'displayName').exec(function(err, productionReport) {
		if (err) return next(err);
		if (! productionReport) return next(new Error('Failed to load Production report ' + id));
		req.productionReport = productionReport ;
		next();
	});
};

/**
 * Production report authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.productionReport.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
