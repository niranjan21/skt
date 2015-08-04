'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	BulkNeedleChangeReport = mongoose.model('BulkNeedleChangeReport'),
	_ = require('lodash');

/**
 * Create a Bulk needle change report
 */
exports.create = function(req, res) {
	var bulkNeedleChangeReport = new BulkNeedleChangeReport(req.body);
	bulkNeedleChangeReport.user = req.user;

	bulkNeedleChangeReport.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bulkNeedleChangeReport);
		}
	});
};

/**
 * Show the current Bulk needle change report
 */
exports.read = function(req, res) {
	res.jsonp(req.bulkNeedleChangeReport);
};

/**
 * Update a Bulk needle change report
 */
exports.update = function(req, res) {
	var bulkNeedleChangeReport = req.bulkNeedleChangeReport ;

	bulkNeedleChangeReport = _.extend(bulkNeedleChangeReport , req.body);

	bulkNeedleChangeReport.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bulkNeedleChangeReport);
		}
	});
};

/**
 * Delete an Bulk needle change report
 */
exports.delete = function(req, res) {
	var bulkNeedleChangeReport = req.bulkNeedleChangeReport ;

	bulkNeedleChangeReport.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bulkNeedleChangeReport);
		}
	});
};

/**
 * List of Bulk needle change reports
 */
exports.list = function(req, res) { 
	BulkNeedleChangeReport.find().sort('-created').populate('user', 'displayName').exec(function(err, bulkNeedleChangeReports) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bulkNeedleChangeReports);
		}
	});
};

/**
 * Bulk needle change report middleware
 */
exports.bulkNeedleChangeReportByID = function(req, res, next, id) { 
	BulkNeedleChangeReport.findById(id).populate('user', 'displayName').exec(function(err, bulkNeedleChangeReport) {
		if (err) return next(err);
		if (! bulkNeedleChangeReport) return next(new Error('Failed to load Bulk needle change report ' + id));
		req.bulkNeedleChangeReport = bulkNeedleChangeReport ;
		next();
	});
};

/**
 * Bulk needle change report authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.bulkNeedleChangeReport.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
