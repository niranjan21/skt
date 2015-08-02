'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	DirectInwardEntry = mongoose.model('DirectInwardEntry');

/**
 * Globals
 */
var user, directInwardEntry;

/**
 * Unit tests
 */
describe('Direct inward entry Model Unit Tests:', function() {
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
			directInwardEntry = new DirectInwardEntry({
				name: 'Direct inward entry Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return directInwardEntry.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			directInwardEntry.name = '';

			return directInwardEntry.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		DirectInwardEntry.remove().exec();
		User.remove().exec();

		done();
	});
});