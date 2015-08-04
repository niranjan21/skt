'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	PartyAllot = mongoose.model('PartyAllot');

/**
 * Globals
 */
var user, partyAllot;

/**
 * Unit tests
 */
describe('Party allot Model Unit Tests:', function() {
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
			partyAllot = new PartyAllot({
				name: 'Party allot Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return partyAllot.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			partyAllot.name = '';

			return partyAllot.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		PartyAllot.remove().exec();
		User.remove().exec();

		done();
	});
});