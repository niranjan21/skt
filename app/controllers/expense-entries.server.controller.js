'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	ExpenseEntry = mongoose.model('ExpenseEntry'),
	_ = require('lodash');

/**
 * Create a Expense entry
 */
exports.create = function(req, res) {
	var expenseEntry = new ExpenseEntry(req.body);
	expenseEntry.user = req.user;

	expenseEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(expenseEntry);
		}
	});
};

/**
 * Show the current Expense entry
 */
exports.read = function(req, res) {
	res.jsonp(req.expenseEntry);
};

/**
 * Update a Expense entry
 */
exports.update = function(req, res) {
	var expenseEntry = req.expenseEntry ;

	expenseEntry = _.extend(expenseEntry , req.body);

	expenseEntry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(expenseEntry);
		}
	});
};

/**
 * Delete an Expense entry
 */
exports.delete = function(req, res) {
	var expenseEntry = req.expenseEntry ;

	expenseEntry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(expenseEntry);
		}
	});
};

/**
 * List of Expense entries
 */
exports.list = function(req, res) { 
	ExpenseEntry.find().sort('-created').populate('user', 'displayName').exec(function(err, expenseEntries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(expenseEntries);
		}
	});
};

/**
 * Expense entry middleware
 */
exports.expenseEntryByID = function(req, res, next, id) { 
	ExpenseEntry.findById(id).populate('user', 'displayName').exec(function(err, expenseEntry) {
		if (err) return next(err);
		if (! expenseEntry) return next(new Error('Failed to load Expense entry ' + id));
		req.expenseEntry = expenseEntry ;
		next();
	});
};

/**
 * Expense entry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.expenseEntry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
