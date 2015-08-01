'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	DeliveryEntry = mongoose.model('DeliveryEntry');

/**
 * Globals
 */
var user, deliveryEntry;

/**
 * Unit tests
 */
describe('Delivery entry Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			deliveryEntry = new DeliveryEntry({
				name: 'Delivery entry Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return deliveryEntry.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			deliveryEntry.name = '';

			return deliveryEntry.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		DeliveryEntry.remove().exec();
		User.remove().exec();

		done();
	});
});