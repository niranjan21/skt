'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	FabricSale = mongoose.model('FabricSale'),
	_ = require('lodash');

/**
 * Create a Fabric sale
 */
exports.create = function(req, res) {
	var fabricSale = new FabricSale(req.body);
	fabricSale.user = req.user;

	fabricSale.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricSale);
		}
	});
};

/**
 * Show the current Fabric sale
 */
exports.read = function(req, res) {
	res.jsonp(req.fabricSale);
};

/**
 * Update a Fabric sale
 */
exports.update = function(req, res) {
	var fabricSale = req.fabricSale ;

	fabricSale = _.extend(fabricSale , req.body);

	fabricSale.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricSale);
		}
	});
};

/**
 * Delete an Fabric sale
 */
exports.delete = function(req, res) {
	var fabricSale = req.fabricSale ;

	fabricSale.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricSale);
		}
	});
};

/**
 * List of Fabric sales
 */
exports.list = function(req, res) { 
	FabricSale.find().sort('-created').populate('user', 'displayName').exec(function(err, fabricSales) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(fabricSales);
		}
	});
};

/**
 * Fabric sale middleware
 */
exports.fabricSaleByID = function(req, res, next, id) { 
	FabricSale.findById(id).populate('user', 'displayName').exec(function(err, fabricSale) {
		if (err) return next(err);
		if (! fabricSale) return next(new Error('Failed to load Fabric sale ' + id));
		req.fabricSale = fabricSale ;
		next();
	});
};

/**
 * Fabric sale authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.fabricSale.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
