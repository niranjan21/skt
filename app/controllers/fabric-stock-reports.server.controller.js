'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	FabricStockReport = mongoose.model('FabricStockReport'),
	_ = require('lodash');

/**
 * Create a Fabric stock report
 */
exports.create = function(req, res) {
	var fabricStockReport = new FabricStockReport(req.body);
	fabricStockReport.user = req.user;

	fabricStockReport.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricStockReport);
		}
	});
};

/**
 * Show the current Fabric stock report
 */
exports.read = function(req, res) {
	res.jsonp(req.fabricStockReport);
};

/**
 * Update a Fabric stock report
 */
exports.update = function(req, res) {
	var fabricStockReport = req.fabricStockReport ;

	fabricStockReport = _.extend(fabricStockReport , req.body);

	fabricStockReport.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricStockReport);
		}
	});
};

/**
 * Delete an Fabric stock report
 */
exports.delete = function(req, res) {
	var fabricStockReport = req.fabricStockReport ;

	fabricStockReport.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricStockReport);
		}
	});
};

/**
 * List of Fabric stock reports
 */
exports.list = function(req, res) { 
	FabricStockReport.find().sort('-created').populate('user', 'displayName').exec(function(err, fabricStockReports) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricStockReports);
		}
	});
};

/**
 * Fabric stock report middleware
 */
exports.fabricStockReportByID = function(req, res, next, id) { 
	FabricStockReport.findById(id).populate('user', 'displayName').exec(function(err, fabricStockReport) {
		if (err) return next(err);
		if (! fabricStockReport) return next(new Error('Failed to load Fabric stock report ' + id));
		req.fabricStockReport = fabricStockReport ;
		next();
	});
};

/**
 * Fabric stock report authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.fabricStockReport.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
