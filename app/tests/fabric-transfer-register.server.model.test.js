'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FabricTransferRegister = mongoose.model('FabricTransferRegister');

/**
 * Globals
 */
var user, fabricTransferRegister;

/**
 * Unit tests
 */
describe('Fabric transfer register Model Unit Tests:', function() {
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
			fabricTransferRegister = new FabricTransferRegister({
				name: 'Fabric transfer register Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return fabricTransferRegister.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			fabricTransferRegister.name = '';

			return fabricTransferRegister.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		FabricTransferRegister.remove().exec();
		User.remove().exec();

		done();
	});
});