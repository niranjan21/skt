'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	GeneralItemOutstandingRegister = mongoose.model('GeneralItemOutstandingRegister');

/**
 * Globals
 */
var user, generalItemOutstandingRegister;

/**
 * Unit tests
 */
describe('General item outstanding register Model Unit Tests:', function() {
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
			generalItemOutstandingRegister = new GeneralItemOutstandingRegister({
				name: 'General item outstanding register Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return generalItemOutstandingRegister.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			generalItemOutstandingRegister.name = '';

			return generalItemOutstandingRegister.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		GeneralItemOutstandingRegister.remove().exec();
		User.remove().exec();

		done();
	});
});