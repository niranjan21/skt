'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	PaymentEntry = mongoose.model('PaymentEntry');

/**
 * Globals
 */
var user, paymentEntry;

/**
 * Unit tests
 */
describe('Payment entry Model Unit Tests:', function() {
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
			paymentEntry = new PaymentEntry({
				name: 'Payment entry Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return paymentEntry.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			paymentEntry.name = '';

			return paymentEntry.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		PaymentEntry.remove().exec();
		User.remove().exec();

		done();
	});
});