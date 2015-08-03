'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	InvoiceEntry = mongoose.model('InvoiceEntry');

/**
 * Globals
 */
var user, invoiceEntry;

/**
 * Unit tests
 */
describe('Invoice entry Model Unit Tests:', function() {
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
			invoiceEntry = new InvoiceEntry({
				name: 'Invoice entry Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return invoiceEntry.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			invoiceEntry.name = '';

			return invoiceEntry.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		InvoiceEntry.remove().exec();
		User.remove().exec();

		done();
	});
});