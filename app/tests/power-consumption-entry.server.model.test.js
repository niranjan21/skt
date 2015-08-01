'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	PowerConsumptionEntry = mongoose.model('PowerConsumptionEntry');

/**
 * Globals
 */
var user, powerConsumptionEntry;

/**
 * Unit tests
 */
describe('Power consumption entry Model Unit Tests:', function() {
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
			powerConsumptionEntry = new PowerConsumptionEntry({
				name: 'Power consumption entry Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return powerConsumptionEntry.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			powerConsumptionEntry.name = '';

			return powerConsumptionEntry.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		PowerConsumptionEntry.remove().exec();
		User.remove().exec();

		done();
	});
});