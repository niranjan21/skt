'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	GeneralTestReport = mongoose.model('GeneralTestReport'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, generalTestReport;

/**
 * General test report routes tests
 */
describe('General test report CRUD tests', function() {
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

		// Save a user to the test db and create new General test report
		user.save(function() {
			generalTestReport = {
				name: 'General test report Name'
			};

			done();
		});
	});

	it('should be able to save General test report instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General test report
				agent.post('/general-test-reports')
					.send(generalTestReport)
					.expect(200)
					.end(function(generalTestReportSaveErr, generalTestReportSaveRes) {
						// Handle General test report save error
						if (generalTestReportSaveErr) done(generalTestReportSaveErr);

						// Get a list of General test reports
						agent.get('/general-test-reports')
							.end(function(generalTestReportsGetErr, generalTestReportsGetRes) {
								// Handle General test report save error
								if (generalTestReportsGetErr) done(generalTestReportsGetErr);

								// Get General test reports list
								var generalTestReports = generalTestReportsGetRes.body;

								// Set assertions
								(generalTestReports[0].user._id).should.equal(userId);
								(generalTestReports[0].name).should.match('General test report Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save General test report instance if not logged in', function(done) {
		agent.post('/general-test-reports')
			.send(generalTestReport)
			.expect(401)
			.end(function(generalTestReportSaveErr, generalTestReportSaveRes) {
				// Call the assertion callback
				done(generalTestReportSaveErr);
			});
	});

	it('should not be able to save General test report instance if no name is provided', function(done) {
		// Invalidate name field
		generalTestReport.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General test report
				agent.post('/general-test-reports')
					.send(generalTestReport)
					.expect(400)
					.end(function(generalTestReportSaveErr, generalTestReportSaveRes) {
						// Set message assertion
						(generalTestReportSaveRes.body.message).should.match('Please fill General test report name');
						
						// Handle General test report save error
						done(generalTestReportSaveErr);
					});
			});
	});

	it('should be able to update General test report instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General test report
				agent.post('/general-test-reports')
					.send(generalTestReport)
					.expect(200)
					.end(function(generalTestReportSaveErr, generalTestReportSaveRes) {
						// Handle General test report save error
						if (generalTestReportSaveErr) done(generalTestReportSaveErr);

						// Update General test report name
						generalTestReport.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing General test report
						agent.put('/general-test-reports/' + generalTestReportSaveRes.body._id)
							.send(generalTestReport)
							.expect(200)
							.end(function(generalTestReportUpdateErr, generalTestReportUpdateRes) {
								// Handle General test report update error
								if (generalTestReportUpdateErr) done(generalTestReportUpdateErr);

								// Set assertions
								(generalTestReportUpdateRes.body._id).should.equal(generalTestReportSaveRes.body._id);
								(generalTestReportUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of General test reports if not signed in', function(done) {
		// Create new General test report model instance
		var generalTestReportObj = new GeneralTestReport(generalTestReport);

		// Save the General test report
		generalTestReportObj.save(function() {
			// Request General test reports
			request(app).get('/general-test-reports')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single General test report if not signed in', function(done) {
		// Create new General test report model instance
		var generalTestReportObj = new GeneralTestReport(generalTestReport);

		// Save the General test report
		generalTestReportObj.save(function() {
			request(app).get('/general-test-reports/' + generalTestReportObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', generalTestReport.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete General test report instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new General test report
				agent.post('/general-test-reports')
					.send(generalTestReport)
					.expect(200)
					.end(function(generalTestReportSaveErr, generalTestReportSaveRes) {
						// Handle General test report save error
						if (generalTestReportSaveErr) done(generalTestReportSaveErr);

						// Delete existing General test report
						agent.delete('/general-test-reports/' + generalTestReportSaveRes.body._id)
							.send(generalTestReport)
							.expect(200)
							.end(function(generalTestReportDeleteErr, generalTestReportDeleteRes) {
								// Handle General test report error error
								if (generalTestReportDeleteErr) done(generalTestReportDeleteErr);

								// Set assertions
								(generalTestReportDeleteRes.body._id).should.equal(generalTestReportSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete General test report instance if not signed in', function(done) {
		// Set General test report user 
		generalTestReport.user = user;

		// Create new General test report model instance
		var generalTestReportObj = new GeneralTestReport(generalTestReport);

		// Save the General test report
		generalTestReportObj.save(function() {
			// Try deleting General test report
			request(app).delete('/general-test-reports/' + generalTestReportObj._id)
			.expect(401)
			.end(function(generalTestReportDeleteErr, generalTestReportDeleteRes) {
				// Set message assertion
				(generalTestReportDeleteRes.body.message).should.match('User is not logged in');

				// Handle General test report error error
				done(generalTestReportDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		GeneralTestReport.remove().exec();
		done();
	});
});