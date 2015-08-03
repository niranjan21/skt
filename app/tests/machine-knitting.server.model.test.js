'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	MachineKnitting = mongoose.model('MachineKnitting');

/**
 * Globals
 */
var user, machineKnitting;

/**
 * Unit tests
 */
describe('Machine knitting Model Unit Tests:', function() {
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
			machineKnitting = new MachineKnitting({
				name: 'Machine knitting Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return machineKnitting.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			machineKnitting.name = '';

			return machineKnitting.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		MachineKnitting.remove().exec();
		User.remove().exec();

		done();
	});
});