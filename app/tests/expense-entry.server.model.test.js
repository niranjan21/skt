'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ExpenseEntry = mongoose.model('ExpenseEntry');

/**
 * Globals
 */
var user, expenseEntry;

/**
 * Unit tests
 */
describe('Expense entry Model Unit Tests:', function() {
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
			expenseEntry = new ExpenseEntry({
				name: 'Expense entry Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return expenseEntry.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			expenseEntry.name = '';

			return expenseEntry.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		ExpenseEntry.remove().exec();
		User.remove().exec();

		done();
	});
});