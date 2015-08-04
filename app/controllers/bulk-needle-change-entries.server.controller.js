'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	BulkNeedleChangeEntry = mongoose.model('BulkNeedleChangeEntry'),
	_ = require('lodash');

/**
 * Create a Bulk needle change entry
 */
exports.create = function(req, res) {
	var bulkNeedleChangeEntry = new BulkNeedleChangeEntry(req.body);
	bulkNeedleChangeEntry.user = req.user;

	bulkNeedleChangeEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bulkNeedleChangeEntry);
		}
	});
};

/**
 * Show the current Bulk needle change entry
 */
exports.read = function(req, res) {
	res.jsonp(req.bulkNeedleChangeEntry);
};

/**
 * Update a Bulk needle change entry
 */
exports.update = function(req, res) {
	var bulkNeedleChangeEntry = req.bulkNeedleChangeEntry ;

	bulkNeedleChangeEntry = _.extend(bulkNeedleChangeEntry , req.body);

	bulkNeedleChangeEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bulkNeedleChangeEntry);
		}
	});
};

/**
 * Delete an Bulk needle change entry
 */
exports.delete = function(req, res) {
	var bulkNeedleChangeEntry = req.bulkNeedleChangeEntry ;

	bulkNeedleChangeEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bulkNeedleChangeEntry);
		}
	});
};

/**
 * List of Bulk needle change entries
 */
exports.list = function(req, res) { 
	BulkNeedleChangeEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, bulkNeedleChangeEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(bulkNeedleChangeEntries);
		}
	});
};

/**
 * Bulk needle change entry middleware
 */
exports.bulkNeedleChangeEntryByID = function(req, res, next, id) { 
	BulkNeedleChangeEntry.findById(id).populate('user', 'displayName').exec(function(err, bulkNeedleChangeEntry) {
		if (err) return next(err);
		if (! bulkNeedleChangeEntry) return next(new Error('Failed to load Bulk needle change entry ' + id));
		req.bulkNeedleChangeEntry = bulkNeedleChangeEntry ;
		next();
	});
};

/**
 * Bulk needle change entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.bulkNeedleChangeEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
