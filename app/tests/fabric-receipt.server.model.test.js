'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FabricReceipt = mongoose.model('FabricReceipt');

/**
 * Globals
 */
var user, fabricReceipt;

/**
 * Unit tests
 */
describe('Fabric receipt Model Unit Tests:', function() {
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
			fabricReceipt = new FabricReceipt({
				name: 'Fabric receipt Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return fabricReceipt.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			fabricReceipt.name = '';

			return fabricReceipt.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		FabricReceipt.remove().exec();
		User.remove().exec();

		done();
	});
});