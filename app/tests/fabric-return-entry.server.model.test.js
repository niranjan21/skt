'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FabricReturnEntry = mongoose.model('FabricReturnEntry');

/**
 * Globals
 */
var user, fabricReturnEntry;

/**
 * Unit tests
 */
describe('Fabric return entry Model Unit Tests:', function() {
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
			fabricReturnEntry = new FabricReturnEntry({
				name: 'Fabric return entry Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return fabricReturnEntry.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			fabricReturnEntry.name = '';

			return fabricReturnEntry.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		FabricReturnEntry.remove().exec();
		User.remove().exec();

		done();
	});
});