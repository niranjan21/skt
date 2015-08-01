'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FabricItemMaster = mongoose.model('FabricItemMaster');

/**
 * Globals
 */
var user, fabricItemMaster;

/**
 * Unit tests
 */
describe('Fabric item master Model Unit Tests:', function() {
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
			fabricItemMaster = new FabricItemMaster({
				name: 'Fabric item master Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return fabricItemMaster.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			fabricItemMaster.name = '';

			return fabricItemMaster.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		FabricItemMaster.remove().exec();
		User.remove().exec();

		done();
	});
});