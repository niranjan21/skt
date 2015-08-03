'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	LeaveMaster = mongoose.model('LeaveMaster');

/**
 * Globals
 */
var user, leaveMaster;

/**
 * Unit tests
 */
describe('Leave master Model Unit Tests:', function() {
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
			leaveMaster = new LeaveMaster({
				name: 'Leave master Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return leaveMaster.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			leaveMaster.name = '';

			return leaveMaster.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		LeaveMaster.remove().exec();
		User.remove().exec();

		done();
	});
});