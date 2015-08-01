'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	OutwardEntry = mongoose.model('OutwardEntry');

/**
 * Globals
 */
var user, outwardEntry;

/**
 * Unit tests
 */
describe('Outward entry Model Unit Tests:', function() {
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
			outwardEntry = new OutwardEntry({
				name: 'Outward entry Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return outwardEntry.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			outwardEntry.name = '';

			return outwardEntry.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		OutwardEntry.remove().exec();
		User.remove().exec();

		done();
	});
});