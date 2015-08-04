'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	NeedlesInwardEntry = mongoose.model('NeedlesInwardEntry');

/**
 * Globals
 */
var user, needlesInwardEntry;

/**
 * Unit tests
 */
describe('Needles inward entry Model Unit Tests:', function() {
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
			needlesInwardEntry = new NeedlesInwardEntry({
				name: 'Needles inward entry Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return needlesInwardEntry.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			needlesInwardEntry.name = '';

			return needlesInwardEntry.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		NeedlesInwardEntry.remove().exec();
		User.remove().exec();

		done();
	});
});