'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	YarnReturnEntry = mongoose.model('YarnReturnEntry');

/**
 * Globals
 */
var user, yarnReturnEntry;

/**
 * Unit tests
 */
describe('Yarn return entry Model Unit Tests:', function() {
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
			yarnReturnEntry = new YarnReturnEntry({
				name: 'Yarn return entry Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return yarnReturnEntry.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			yarnReturnEntry.name = '';

			return yarnReturnEntry.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		YarnReturnEntry.remove().exec();
		User.remove().exec();

		done();
	});
});