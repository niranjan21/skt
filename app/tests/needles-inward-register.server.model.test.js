'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	NeedlesInwardRegister = mongoose.model('NeedlesInwardRegister');

/**
 * Globals
 */
var user, needlesInwardRegister;

/**
 * Unit tests
 */
describe('Needles inward register Model Unit Tests:', function() {
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
			needlesInwardRegister = new NeedlesInwardRegister({
				name: 'Needles inward register Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return needlesInwardRegister.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			needlesInwardRegister.name = '';

			return needlesInwardRegister.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		NeedlesInwardRegister.remove().exec();
		User.remove().exec();

		done();
	});
});