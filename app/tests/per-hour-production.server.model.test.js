'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	PerHourProduction = mongoose.model('PerHourProduction');

/**
 * Globals
 */
var user, perHourProduction;

/**
 * Unit tests
 */
describe('Per hour production Model Unit Tests:', function() {
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
			perHourProduction = new PerHourProduction({
				name: 'Per hour production Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return perHourProduction.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			perHourProduction.name = '';

			return perHourProduction.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		PerHourProduction.remove().exec();
		User.remove().exec();

		done();
	});
});