'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	RollQualityControlEntry = mongoose.model('RollQualityControlEntry');

/**
 * Globals
 */
var user, rollQualityControlEntry;

/**
 * Unit tests
 */
describe('Roll quality control entry Model Unit Tests:', function() {
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
			rollQualityControlEntry = new RollQualityControlEntry({
				name: 'Roll quality control entry Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return rollQualityControlEntry.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			rollQualityControlEntry.name = '';

			return rollQualityControlEntry.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		RollQualityControlEntry.remove().exec();
		User.remove().exec();

		done();
	});
});