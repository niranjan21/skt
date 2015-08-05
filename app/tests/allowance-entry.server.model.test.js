'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	AllowanceEntry = mongoose.model('AllowanceEntry');

/**
 * Globals
 */
var user, allowanceEntry;

/**
 * Unit tests
 */
describe('Allowance entry Model Unit Tests:', function() {
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
			allowanceEntry = new AllowanceEntry({
				name: 'Allowance entry Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return allowanceEntry.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			allowanceEntry.name = '';

			return allowanceEntry.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		AllowanceEntry.remove().exec();
		User.remove().exec();

		done();
	});
});