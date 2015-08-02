'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	GeneralItemOutwardRegister = mongoose.model('GeneralItemOutwardRegister');

/**
 * Globals
 */
var user, generalItemOutwardRegister;

/**
 * Unit tests
 */
describe('General item outward register Model Unit Tests:', function() {
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
			generalItemOutwardRegister = new GeneralItemOutwardRegister({
				name: 'General item outward register Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return generalItemOutwardRegister.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			generalItemOutwardRegister.name = '';

			return generalItemOutwardRegister.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		GeneralItemOutwardRegister.remove().exec();
		User.remove().exec();

		done();
	});
});