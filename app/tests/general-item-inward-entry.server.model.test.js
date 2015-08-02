'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	GeneralItemInwardEntry = mongoose.model('GeneralItemInwardEntry');

/**
 * Globals
 */
var user, generalItemInwardEntry;

/**
 * Unit tests
 */
describe('General item inward entry Model Unit Tests:', function() {
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
			generalItemInwardEntry = new GeneralItemInwardEntry({
				name: 'General item inward entry Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return generalItemInwardEntry.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			generalItemInwardEntry.name = '';

			return generalItemInwardEntry.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		GeneralItemInwardEntry.remove().exec();
		User.remove().exec();

		done();
	});
});