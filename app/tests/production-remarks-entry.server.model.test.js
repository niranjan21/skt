'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ProductionRemarksEntry = mongoose.model('ProductionRemarksEntry');

/**
 * Globals
 */
var user, productionRemarksEntry;

/**
 * Unit tests
 */
describe('Production remarks entry Model Unit Tests:', function() {
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
			productionRemarksEntry = new ProductionRemarksEntry({
				name: 'Production remarks entry Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return productionRemarksEntry.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			productionRemarksEntry.name = '';

			return productionRemarksEntry.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		ProductionRemarksEntry.remove().exec();
		User.remove().exec();

		done();
	});
});