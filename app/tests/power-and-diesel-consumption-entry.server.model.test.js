'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	PowerAndDieselConsumptionEntry = mongoose.model('PowerAndDieselConsumptionEntry');

/**
 * Globals
 */
var user, powerAndDieselConsumptionEntry;

/**
 * Unit tests
 */
describe('Power and diesel consumption entry Model Unit Tests:', function() {
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
			powerAndDieselConsumptionEntry = new PowerAndDieselConsumptionEntry({
				name: 'Power and diesel consumption entry Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return powerAndDieselConsumptionEntry.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			powerAndDieselConsumptionEntry.name = '';

			return powerAndDieselConsumptionEntry.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		PowerAndDieselConsumptionEntry.remove().exec();
		User.remove().exec();

		done();
	});
});