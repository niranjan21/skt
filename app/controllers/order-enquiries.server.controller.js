'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	OrderEnquiry = mongoose.model('OrderEnquiry'),
	_ = require('lodash');

/**
 * Create a Order enquiry
 */
exports.create = function(req, res) {
	var orderEnquiry = new OrderEnquiry(req.body);
	orderEnquiry.user = req.user;

	orderEnquiry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderEnquiry);
		}
	});
};

/**
 * Show the current Order enquiry
 */
exports.read = function(req, res) {
	res.jsonp(req.orderEnquiry);
};

/**
 * Update a Order enquiry
 */
exports.update = function(req, res) {
	var orderEnquiry = req.orderEnquiry ;

	orderEnquiry = _.extend(orderEnquiry , req.body);

	orderEnquiry.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderEnquiry);
		}
	});
};

/**
 * Delete an Order enquiry
 */
exports.delete = function(req, res) {
	var orderEnquiry = req.orderEnquiry ;

	orderEnquiry.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderEnquiry);
		}
	});
};

/**
 * List of Order enquiries
 */
exports.list = function(req, res) { 
	OrderEnquiry.find().sort('-created').populate('user', 'displayName').exec(function(err, orderEnquiries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(orderEnquiries);
		}
	});
};

/**
 * Order enquiry middleware
 */
exports.orderEnquiryByID = function(req, res, next, id) { 
	OrderEnquiry.findById(id).populate('user', 'displayName').exec(function(err, orderEnquiry) {
		if (err) return next(err);
		if (! orderEnquiry) return next(new Error('Failed to load Order enquiry ' + id));
		req.orderEnquiry = orderEnquiry ;
		next();
	});
};

/**
 * Order enquiry authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.orderEnquiry.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
