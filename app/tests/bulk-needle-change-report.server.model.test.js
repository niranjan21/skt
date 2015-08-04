'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	BulkNeedleChangeReport = mongoose.model('BulkNeedleChangeReport');

/**
 * Globals
 */
var user, bulkNeedleChangeReport;

/**
 * Unit tests
 */
describe('Bulk needle change report Model Unit Tests:', function() {
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
			bulkNeedleChangeReport = new BulkNeedleChangeReport({
				name: 'Bulk needle change report Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return bulkNeedleChangeReport.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			bulkNeedleChangeReport.name = '';

			return bulkNeedleChangeReport.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		BulkNeedleChangeReport.remove().exec();
		User.remove().exec();

		done();
	});
});