'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ProductionReport = mongoose.model('ProductionReport'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, productionReport;

/**
 * Production report routes tests
 */
describe('Production report CRUD tests', function() {
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

		// Save a user to the test db and create new Production report
		user.save(function() {
			productionReport = {
				name: 'Production report Name'
			};

			done();
		});
	});

	it('should be able to save Production report instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Production report
				agent.post('/production-reports')
					.send(productionReport)
					.expect(200)
					.end(function(productionReportSaveErr, productionReportSaveRes) {
						// Handle Production report save error
						if (productionReportSaveErr) done(productionReportSaveErr);

						// Get a list of Production reports
						agent.get('/production-reports')
							.end(function(productionReportsGetErr, productionReportsGetRes) {
								// Handle Production report save error
								if (productionReportsGetErr) done(productionReportsGetErr);

								// Get Production reports list
								var productionReports = productionReportsGetRes.body;

								// Set assertions
								(productionReports[0].user._id).should.equal(userId);
								(productionReports[0].name).should.match('Production report Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Production report instance if not logged in', function(done) {
		agent.post('/production-reports')
			.send(productionReport)
			.expect(401)
			.end(function(productionReportSaveErr, productionReportSaveRes) {
				// Call the assertion callback
				done(productionReportSaveErr);
			});
	});

	it('should not be able to save Production report instance if no name is provided', function(done) {
		// Invalidate name field
		productionReport.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Production report
				agent.post('/production-reports')
					.send(productionReport)
					.expect(400)
					.end(function(productionReportSaveErr, productionReportSaveRes) {
						// Set message assertion
						(productionReportSaveRes.body.message).should.match('Please fill Production report name');
						
						// Handle Production report save error
						done(productionReportSaveErr);
					});
			});
	});

	it('should be able to update Production report instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Production report
				agent.post('/production-reports')
					.send(productionReport)
					.expect(200)
					.end(function(productionReportSaveErr, productionReportSaveRes) {
						// Handle Production report save error
						if (productionReportSaveErr) done(productionReportSaveErr);

						// Update Production report name
						productionReport.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Production report
						agent.put('/production-reports/' + productionReportSaveRes.body._id)
							.send(productionReport)
							.expect(200)
							.end(function(productionReportUpdateErr, productionReportUpdateRes) {
								// Handle Production report update error
								if (productionReportUpdateErr) done(productionReportUpdateErr);

								// Set assertions
								(productionReportUpdateRes.body._id).should.equal(productionReportSaveRes.body._id);
								(productionReportUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Production reports if not signed in', function(done) {
		// Create new Production report model instance
		var productionReportObj = new ProductionReport(productionReport);

		// Save the Production report
		productionReportObj.save(function() {
			// Request Production reports
			request(app).get('/production-reports')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Production report if not signed in', function(done) {
		// Create new Production report model instance
		var productionReportObj = new ProductionReport(productionReport);

		// Save the Production report
		productionReportObj.save(function() {
			request(app).get('/production-reports/' + productionReportObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', productionReport.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Production report instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Production report
				agent.post('/production-reports')
					.send(productionReport)
					.expect(200)
					.end(function(productionReportSaveErr, productionReportSaveRes) {
						// Handle Production report save error
						if (productionReportSaveErr) done(productionReportSaveErr);

						// Delete existing Production report
						agent.delete('/production-reports/' + productionReportSaveRes.body._id)
							.send(productionReport)
							.expect(200)
							.end(function(productionReportDeleteErr, productionReportDeleteRes) {
								// Handle Production report error error
								if (productionReportDeleteErr) done(productionReportDeleteErr);

								// Set assertions
								(productionReportDeleteRes.body._id).should.equal(productionReportSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Production report instance if not signed in', function(done) {
		// Set Production report user 
		productionReport.user = user;

		// Create new Production report model instance
		var productionReportObj = new ProductionReport(productionReport);

		// Save the Production report
		productionReportObj.save(function() {
			// Try deleting Production report
			request(app).delete('/production-reports/' + productionReportObj._id)
			.expect(401)
			.end(function(productionReportDeleteErr, productionReportDeleteRes) {
				// Set message assertion
				(productionReportDeleteRes.body.message).should.match('User is not logged in');

				// Handle Production report error error
				done(productionReportDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		ProductionReport.remove().exec();
		done();
	});
});