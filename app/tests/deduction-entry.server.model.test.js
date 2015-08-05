'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	DeductionEntry = mongoose.model('DeductionEntry');

/**
 * Globals
 */
var user, deductionEntry;

/**
 * Unit tests
 */
describe('Deduction entry Model Unit Tests:', function() {
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
			deductionEntry = new DeductionEntry({
				name: 'Deduction entry Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return deductionEntry.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			deductionEntry.name = '';

			return deductionEntry.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		DeductionEntry.remove().exec();
		User.remove().exec();

		done();
	});
});