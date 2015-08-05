'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	JobPartialCompletion = mongoose.model('JobPartialCompletion');

/**
 * Globals
 */
var user, jobPartialCompletion;

/**
 * Unit tests
 */
describe('Job partial completion Model Unit Tests:', function() {
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
			jobPartialCompletion = new JobPartialCompletion({
				name: 'Job partial completion Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return jobPartialCompletion.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			jobPartialCompletion.name = '';

			return jobPartialCompletion.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		JobPartialCompletion.remove().exec();
		User.remove().exec();

		done();
	});
});