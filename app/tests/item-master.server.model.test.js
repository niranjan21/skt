'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ItemMaster = mongoose.model('ItemMaster');

/**
 * Globals
 */
var user, itemMaster;

/**
 * Unit tests
 */
describe('Item master Model Unit Tests:', function() {
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
			itemMaster = new ItemMaster({
				name: 'Item master Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return itemMaster.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			itemMaster.name = '';

			return itemMaster.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		ItemMaster.remove().exec();
		User.remove().exec();

		done();
	});
});