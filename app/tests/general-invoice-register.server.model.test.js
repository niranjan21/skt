'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	GeneralInvoiceRegister = mongoose.model('GeneralInvoiceRegister');

/**
 * Globals
 */
var user, generalInvoiceRegister;

/**
 * Unit tests
 */
describe('General invoice register Model Unit Tests:', function() {
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
			generalInvoiceRegister = new GeneralInvoiceRegister({
				name: 'General invoice register Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return generalInvoiceRegister.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			generalInvoiceRegister.name = '';

			return generalInvoiceRegister.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		GeneralInvoiceRegister.remove().exec();
		User.remove().exec();

		done();
	});
});