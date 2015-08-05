'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ItemInclusion = mongoose.model('ItemInclusion');

/**
 * Globals
 */
var user, itemInclusion;

/**
 * Unit tests
 */
describe('Item inclusion Model Unit Tests:', function() {
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
			itemInclusion = new ItemInclusion({
				name: 'Item inclusion Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return itemInclusion.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			itemInclusion.name = '';

			return itemInclusion.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		ItemInclusion.remove().exec();
		User.remove().exec();

		done();
	});
});