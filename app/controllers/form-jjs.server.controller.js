'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	FormJj = mongoose.model('FormJj'),
	_ = require('lodash');

/**
 * Create a Form jj
 */
exports.create = function(req, res) {
	var formJj = new FormJj(req.body);
	formJj.user = req.user;

	formJj.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(formJj);
		}
	});
};

/**
 * Show the current Form jj
 */
exports.read = function(req, res) {
	res.jsonp(req.formJj);
};

/**
 * Update a Form jj
 */
exports.update = function(req, res) {
	var formJj = req.formJj ;

	formJj = _.extend(formJj , req.body);

	formJj.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(formJj);
		}
	});
};

/**
 * Delete an Form jj
 */
exports.delete = function(req, res) {
	var formJj = req.formJj ;

	formJj.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(formJj);
		}
	});
};

/**
 * List of Form jjs
 */
exports.list = function(req, res) { 
	FormJj.find().sort('-created').populate('user', 'displayName').exec(function(err, formJjs) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(formJjs);
		}
	});
};

/**
 * Form jj middleware
 */
exports.formJjByID = function(req, res, next, id) { 
	FormJj.findById(id).populate('user', 'displayName').exec(function(err, formJj) {
		if (err) return next(err);
		if (! formJj) return next(new Error('Failed to load Form jj ' + id));
		req.formJj = formJj ;
		next();
	});
};

/**
 * Form jj authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.formJj.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
