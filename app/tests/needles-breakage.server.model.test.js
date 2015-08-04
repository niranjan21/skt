'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	NeedlesBreakage = mongoose.model('NeedlesBreakage');

/**
 * Globals
 */
var user, needlesBreakage;

/**
 * Unit tests
 */
describe('Needles breakage Model Unit Tests:', function() {
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
			needlesBreakage = new NeedlesBreakage({
				name: 'Needles breakage Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return needlesBreakage.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			needlesBreakage.name = '';

			return needlesBreakage.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		NeedlesBreakage.remove().exec();
		User.remove().exec();

		done();
	});
});