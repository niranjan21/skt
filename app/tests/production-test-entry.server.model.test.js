'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ProductionTestEntry = mongoose.model('ProductionTestEntry');

/**
 * Globals
 */
var user, productionTestEntry;

/**
 * Unit tests
 */
describe('Production test entry Model Unit Tests:', function() {
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
			productionTestEntry = new ProductionTestEntry({
				name: 'Production test entry Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return productionTestEntry.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			productionTestEntry.name = '';

			return productionTestEntry.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		ProductionTestEntry.remove().exec();
		User.remove().exec();

		done();
	});
});