'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	StoppagesEntry = mongoose.model('StoppagesEntry');

/**
 * Globals
 */
var user, stoppagesEntry;

/**
 * Unit tests
 */
describe('Stoppages entry Model Unit Tests:', function() {
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
			stoppagesEntry = new StoppagesEntry({
				name: 'Stoppages entry Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return stoppagesEntry.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			stoppagesEntry.name = '';

			return stoppagesEntry.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		StoppagesEntry.remove().exec();
		User.remove().exec();

		done();
	});
});