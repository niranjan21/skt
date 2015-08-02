'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	GeneralTestReport = mongoose.model('GeneralTestReport');

/**
 * Globals
 */
var user, generalTestReport;

/**
 * Unit tests
 */
describe('General test report Model Unit Tests:', function() {
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
			generalTestReport = new GeneralTestReport({
				name: 'General test report Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return generalTestReport.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			generalTestReport.name = '';

			return generalTestReport.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		GeneralTestReport.remove().exec();
		User.remove().exec();

		done();
	});
});