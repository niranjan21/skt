'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	YarnDescription = mongoose.model('YarnDescription');

/**
 * Globals
 */
var user, yarnDescription;

/**
 * Unit tests
 */
describe('Yarn description Model Unit Tests:', function() {
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
			yarnDescription = new YarnDescription({
				name: 'Yarn description Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return yarnDescription.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			yarnDescription.name = '';

			return yarnDescription.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		YarnDescription.remove().exec();
		User.remove().exec();

		done();
	});
});