'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	BulkNeedleChangeReport = mongoose.model('BulkNeedleChangeReport'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, bulkNeedleChangeReport;

/**
 * Bulk needle change report routes tests
 */
describe('Bulk needle change report CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Bulk needle change report
		user.save(function() {
			bulkNeedleChangeReport = {
				name: 'Bulk needle change report Name'
			};

			done();
		});
	});

	it('should be able to save Bulk needle change report instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bulk needle change report
				agent.post('/bulk-needle-change-reports')
					.send(bulkNeedleChangeReport)
					.expect(200)
					.end(function(bulkNeedleChangeReportSaveErr, bulkNeedleChangeReportSaveRes) {
						// Handle Bulk needle change report save error
						if (bulkNeedleChangeReportSaveErr) done(bulkNeedleChangeReportSaveErr);

						// Get a list of Bulk needle change reports
						agent.get('/bulk-needle-change-reports')
							.end(function(bulkNeedleChangeReportsGetErr, bulkNeedleChangeReportsGetRes) {
								// Handle Bulk needle change report save error
								if (bulkNeedleChangeReportsGetErr) done(bulkNeedleChangeReportsGetErr);

								// Get Bulk needle change reports list
								var bulkNeedleChangeReports = bulkNeedleChangeReportsGetRes.body;

								// Set assertions
								(bulkNeedleChangeReports[0].user._id).should.equal(userId);
								(bulkNeedleChangeReports[0].name).should.match('Bulk needle change report Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Bulk needle change report instance if not logged in', function(done) {
		agent.post('/bulk-needle-change-reports')
			.send(bulkNeedleChangeReport)
			.expect(401)
			.end(function(bulkNeedleChangeReportSaveErr, bulkNeedleChangeReportSaveRes) {
				// Call the assertion callback
				done(bulkNeedleChangeReportSaveErr);
			});
	});

	it('should not be able to save Bulk needle change report instance if no name is provided', function(done) {
		// Invalidate name field
		bulkNeedleChangeReport.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bulk needle change report
				agent.post('/bulk-needle-change-reports')
					.send(bulkNeedleChangeReport)
					.expect(400)
					.end(function(bulkNeedleChangeReportSaveErr, bulkNeedleChangeReportSaveRes) {
						// Set message assertion
						(bulkNeedleChangeReportSaveRes.body.message).should.match('Please fill Bulk needle change report name');
						
						// Handle Bulk needle change report save error
						done(bulkNeedleChangeReportSaveErr);
					});
			});
	});

	it('should be able to update Bulk needle change report instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bulk needle change report
				agent.post('/bulk-needle-change-reports')
					.send(bulkNeedleChangeReport)
					.expect(200)
					.end(function(bulkNeedleChangeReportSaveErr, bulkNeedleChangeReportSaveRes) {
						// Handle Bulk needle change report save error
						if (bulkNeedleChangeReportSaveErr) done(bulkNeedleChangeReportSaveErr);

						// Update Bulk needle change report name
						bulkNeedleChangeReport.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Bulk needle change report
						agent.put('/bulk-needle-change-reports/' + bulkNeedleChangeReportSaveRes.body._id)
							.send(bulkNeedleChangeReport)
							.expect(200)
							.end(function(bulkNeedleChangeReportUpdateErr, bulkNeedleChangeReportUpdateRes) {
								// Handle Bulk needle change report update error
								if (bulkNeedleChangeReportUpdateErr) done(bulkNeedleChangeReportUpdateErr);

								// Set assertions
								(bulkNeedleChangeReportUpdateRes.body._id).should.equal(bulkNeedleChangeReportSaveRes.body._id);
								(bulkNeedleChangeReportUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Bulk needle change reports if not signed in', function(done) {
		// Create new Bulk needle change report model instance
		var bulkNeedleChangeReportObj = new BulkNeedleChangeReport(bulkNeedleChangeReport);

		// Save the Bulk needle change report
		bulkNeedleChangeReportObj.save(function() {
			// Request Bulk needle change reports
			request(app).get('/bulk-needle-change-reports')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Bulk needle change report if not signed in', function(done) {
		// Create new Bulk needle change report model instance
		var bulkNeedleChangeReportObj = new BulkNeedleChangeReport(bulkNeedleChangeReport);

		// Save the Bulk needle change report
		bulkNeedleChangeReportObj.save(function() {
			request(app).get('/bulk-needle-change-reports/' + bulkNeedleChangeReportObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', bulkNeedleChangeReport.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Bulk needle change report instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Bulk needle change report
				agent.post('/bulk-needle-change-reports')
					.send(bulkNeedleChangeReport)
					.expect(200)
					.end(function(bulkNeedleChangeReportSaveErr, bulkNeedleChangeReportSaveRes) {
						// Handle Bulk needle change report save error
						if (bulkNeedleChangeReportSaveErr) done(bulkNeedleChangeReportSaveErr);

						// Delete existing Bulk needle change report
						agent.delete('/bulk-needle-change-reports/' + bulkNeedleChangeReportSaveRes.body._id)
							.send(bulkNeedleChangeReport)
							.expect(200)
							.end(function(bulkNeedleChangeReportDeleteErr, bulkNeedleChangeReportDeleteRes) {
								// Handle Bulk needle change report error error
								if (bulkNeedleChangeReportDeleteErr) done(bulkNeedleChangeReportDeleteErr);

								// Set assertions
								(bulkNeedleChangeReportDeleteRes.body._id).should.equal(bulkNeedleChangeReportSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Bulk needle change report instance if not signed in', function(done) {
		// Set Bulk needle change report user 
		bulkNeedleChangeReport.user = user;

		// Create new Bulk needle change report model instance
		var bulkNeedleChangeReportObj = new BulkNeedleChangeReport(bulkNeedleChangeReport);

		// Save the Bulk needle change report
		bulkNeedleChangeReportObj.save(function() {
			// Try deleting Bulk needle change report
			request(app).delete('/bulk-needle-change-reports/' + bulkNeedleChangeReportObj._id)
			.expect(401)
			.end(function(bulkNeedleChangeReportDeleteErr, bulkNeedleChangeReportDeleteRes) {
				// Set message assertion
				(bulkNeedleChangeReportDeleteRes.body.message).should.match('User is not logged in');

				// Handle Bulk needle change report error error
				done(bulkNeedleChangeReportDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		BulkNeedleChangeReport.remove().exec();
		done();
	});
});