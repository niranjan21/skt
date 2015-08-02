'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FabricSaleRegister = mongoose.model('FabricSaleRegister');

/**
 * Globals
 */
var user, fabricSaleRegister;

/**
 * Unit tests
 */
describe('Fabric sale register Model Unit Tests:', function() {
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
			fabricSaleRegister = new FabricSaleRegister({
				name: 'Fabric sale register Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return fabricSaleRegister.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			fabricSaleRegister.name = '';

			return fabricSaleRegister.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		FabricSaleRegister.remove().exec();
		User.remove().exec();

		done();
	});
});