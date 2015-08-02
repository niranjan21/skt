'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	GeneralItemOutwardEntry = mongoose.model('GeneralItemOutwardEntry');

/**
 * Globals
 */
var user, generalItemOutwardEntry;

/**
 * Unit tests
 */
describe('General item outward entry Model Unit Tests:', function() {
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
			generalItemOutwardEntry = new GeneralItemOutwardEntry({
				name: 'General item outward entry Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return generalItemOutwardEntry.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			generalItemOutwardEntry.name = '';

			return generalItemOutwardEntry.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		GeneralItemOutwardEntry.remove().exec();
		User.remove().exec();

		done();
	});
});