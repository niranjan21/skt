'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	SalaryAndWagesEntry = mongoose.model('SalaryAndWagesEntry');

/**
 * Globals
 */
var user, salaryAndWagesEntry;

/**
 * Unit tests
 */
describe('Salary and wages entry Model Unit Tests:', function() {
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
			salaryAndWagesEntry = new SalaryAndWagesEntry({
				name: 'Salary and wages entry Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return salaryAndWagesEntry.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			salaryAndWagesEntry.name = '';

			return salaryAndWagesEntry.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		SalaryAndWagesEntry.remove().exec();
		User.remove().exec();

		done();
	});
});