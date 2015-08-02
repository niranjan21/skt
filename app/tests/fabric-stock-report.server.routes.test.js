'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	FabricStockReport = mongoose.model('FabricStockReport'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, fabricStockReport;

/**
 * Fabric stock report routes tests
 */
describe('Fabric stock report CRUD tests', function() {
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

		// Save a user to the test db and create new Fabric stock report
		user.save(function() {
			fabricStockReport = {
				name: 'Fabric stock report Name'
			};

			done();
		});
	});

	it('should be able to save Fabric stock report instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric stock report
				agent.post('/fabric-stock-reports')
					.send(fabricStockReport)
					.expect(200)
					.end(function(fabricStockReportSaveErr, fabricStockReportSaveRes) {
						// Handle Fabric stock report save error
						if (fabricStockReportSaveErr) done(fabricStockReportSaveErr);

						// Get a list of Fabric stock reports
						agent.get('/fabric-stock-reports')
							.end(function(fabricStockReportsGetErr, fabricStockReportsGetRes) {
								// Handle Fabric stock report save error
								if (fabricStockReportsGetErr) done(fabricStockReportsGetErr);

								// Get Fabric stock reports list
								var fabricStockReports = fabricStockReportsGetRes.body;

								// Set assertions
								(fabricStockReports[0].user._id).should.equal(userId);
								(fabricStockReports[0].name).should.match('Fabric stock report Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Fabric stock report instance if not logged in', function(done) {
		agent.post('/fabric-stock-reports')
			.send(fabricStockReport)
			.expect(401)
			.end(function(fabricStockReportSaveErr, fabricStockReportSaveRes) {
				// Call the assertion callback
				done(fabricStockReportSaveErr);
			});
	});

	it('should not be able to save Fabric stock report instance if no name is provided', function(done) {
		// Invalidate name field
		fabricStockReport.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric stock report
				agent.post('/fabric-stock-reports')
					.send(fabricStockReport)
					.expect(400)
					.end(function(fabricStockReportSaveErr, fabricStockReportSaveRes) {
						// Set message assertion
						(fabricStockReportSaveRes.body.message).should.match('Please fill Fabric stock report name');
						
						// Handle Fabric stock report save error
						done(fabricStockReportSaveErr);
					});
			});
	});

	it('should be able to update Fabric stock report instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric stock report
				agent.post('/fabric-stock-reports')
					.send(fabricStockReport)
					.expect(200)
					.end(function(fabricStockReportSaveErr, fabricStockReportSaveRes) {
						// Handle Fabric stock report save error
						if (fabricStockReportSaveErr) done(fabricStockReportSaveErr);

						// Update Fabric stock report name
						fabricStockReport.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Fabric stock report
						agent.put('/fabric-stock-reports/' + fabricStockReportSaveRes.body._id)
							.send(fabricStockReport)
							.expect(200)
							.end(function(fabricStockReportUpdateErr, fabricStockReportUpdateRes) {
								// Handle Fabric stock report update error
								if (fabricStockReportUpdateErr) done(fabricStockReportUpdateErr);

								// Set assertions
								(fabricStockReportUpdateRes.body._id).should.equal(fabricStockReportSaveRes.body._id);
								(fabricStockReportUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Fabric stock reports if not signed in', function(done) {
		// Create new Fabric stock report model instance
		var fabricStockReportObj = new FabricStockReport(fabricStockReport);

		// Save the Fabric stock report
		fabricStockReportObj.save(function() {
			// Request Fabric stock reports
			request(app).get('/fabric-stock-reports')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Fabric stock report if not signed in', function(done) {
		// Create new Fabric stock report model instance
		var fabricStockReportObj = new FabricStockReport(fabricStockReport);

		// Save the Fabric stock report
		fabricStockReportObj.save(function() {
			request(app).get('/fabric-stock-reports/' + fabricStockReportObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', fabricStockReport.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Fabric stock report instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Fabric stock report
				agent.post('/fabric-stock-reports')
					.send(fabricStockReport)
					.expect(200)
					.end(function(fabricStockReportSaveErr, fabricStockReportSaveRes) {
						// Handle Fabric stock report save error
						if (fabricStockReportSaveErr) done(fabricStockReportSaveErr);

						// Delete existing Fabric stock report
						agent.delete('/fabric-stock-reports/' + fabricStockReportSaveRes.body._id)
							.send(fabricStockReport)
							.expect(200)
							.end(function(fabricStockReportDeleteErr, fabricStockReportDeleteRes) {
								// Handle Fabric stock report error error
								if (fabricStockReportDeleteErr) done(fabricStockReportDeleteErr);

								// Set assertions
								(fabricStockReportDeleteRes.body._id).should.equal(fabricStockReportSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Fabric stock report instance if not signed in', function(done) {
		// Set Fabric stock report user 
		fabricStockReport.user = user;

		// Create new Fabric stock report model instance
		var fabricStockReportObj = new FabricStockReport(fabricStockReport);

		// Save the Fabric stock report
		fabricStockReportObj.save(function() {
			// Try deleting Fabric stock report
			request(app).delete('/fabric-stock-reports/' + fabricStockReportObj._id)
			.expect(401)
			.end(function(fabricStockReportDeleteErr, fabricStockReportDeleteRes) {
				// Set message assertion
				(fabricStockReportDeleteRes.body.message).should.match('User is not logged in');

				// Handle Fabric stock report error error
				done(fabricStockReportDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		FabricStockReport.remove().exec();
		done();
	});
});