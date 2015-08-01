'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FabricRequirementInwardEntry = mongoose.model('FabricRequirementInwardEntry');

/**
 * Globals
 */
var user, fabricRequirementInwardEntry;

/**
 * Unit tests
 */
describe('Fabric requirement inward entry Model Unit Tests:', function() {
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
			fabricRequirementInwardEntry = new FabricRequirementInwardEntry({
				name: 'Fabric requirement inward entry Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return fabricRequirementInwardEntry.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			fabricRequirementInwardEntry.name = '';

			return fabricRequirementInwardEntry.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		FabricRequirementInwardEntry.remove().exec();
		User.remove().exec();

		done();
	});
});