'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	GeneralInvoiceRegister = mongoose.model('GeneralInvoiceRegister'),
	_ = require('lodash');

/**
 * Create a General invoice register
 */
exports.create = function(req, res) {
	var generalInvoiceRegister = new GeneralInvoiceRegister(req.body);
	generalInvoiceRegister.user = req.user;

	generalInvoiceRegister.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalInvoiceRegister);
		}
	});
};

/**
 * Show the current General invoice register
 */
exports.read = function(req, res) {
	res.jsonp(req.generalInvoiceRegister);
};

/**
 * Update a General invoice register
 */
exports.update = function(req, res) {
	var generalInvoiceRegister = req.generalInvoiceRegister ;

	generalInvoiceRegister = _.extend(generalInvoiceRegister , req.body);

	generalInvoiceRegister.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalInvoiceRegister);
		}
	});
};

/**
 * Delete an General invoice register
 */
exports.delete = function(req, res) {
	var generalInvoiceRegister = req.generalInvoiceRegister ;

	generalInvoiceRegister.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalInvoiceRegister);
		}
	});
};

/**
 * List of General invoice registers
 */
exports.list = function(req, res) { 
	GeneralInvoiceRegister.find().sort('-created').populate('user', 'displayName').exec(function(err, generalInvoiceRegisters) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(generalInvoiceRegisters);
		}
	});
};

/**
 * General invoice register middleware
 */
exports.generalInvoiceRegisterByID = function(req, res, next, id) { 
	GeneralInvoiceRegister.findById(id).populate('user', 'displayName').exec(function(err, generalInvoiceRegister) {
		if (err) return next(err);
		if (! generalInvoiceRegister) return next(new Error('Failed to load General invoice register ' + id));
		req.generalInvoiceRegister = generalInvoiceRegister ;
		next();
	});
};

/**
 * General invoice register authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.generalInvoiceRegister.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
