'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FabricTransfer = mongoose.model('FabricTransfer');

/**
 * Globals
 */
var user, fabricTransfer;

/**
 * Unit tests
 */
describe('Fabric transfer Model Unit Tests:', function() {
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
			fabricTransfer = new FabricTransfer({
				name: 'Fabric transfer Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return fabricTransfer.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			fabricTransfer.name = '';

			return fabricTransfer.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		FabricTransfer.remove().exec();
		User.remove().exec();

		done();
	});
});