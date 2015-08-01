'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	SalaryAndWagesEntry = mongoose.model('SalaryAndWagesEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, salaryAndWagesEntry;

/**
 * Salary and wages entry routes tests
 */
describe('Salary and wages entry CRUD tests', function() {
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

		// Save a user to the test db and create new Salary and wages entry
		user.save(function() {
			salaryAndWagesEntry = {
				name: 'Salary and wages entry Name'
			};

			done();
		});
	});

	it('should be able to save Salary and wages entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Salary and wages entry
				agent.post('/salary-and-wages-entries')
					.send(salaryAndWagesEntry)
					.expect(200)
					.end(function(salaryAndWagesEntrySaveErr, salaryAndWagesEntrySaveRes) {
						// Handle Salary and wages entry save error
						if (salaryAndWagesEntrySaveErr) done(salaryAndWagesEntrySaveErr);

						// Get a list of Salary and wages entries
						agent.get('/salary-and-wages-entries')
							.end(function(salaryAndWagesEntriesGetErr, salaryAndWagesEntriesGetRes) {
								// Handle Salary and wages entry save error
								if (salaryAndWagesEntriesGetErr) done(salaryAndWagesEntriesGetErr);

								// Get Salary and wages entries list
								var salaryAndWagesEntries = salaryAndWagesEntriesGetRes.body;

								// Set assertions
								(salaryAndWagesEntries[0].user._id).should.equal(userId);
								(salaryAndWagesEntries[0].name).should.match('Salary and wages entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Salary and wages entry instance if not logged in', function(done) {
		agent.post('/salary-and-wages-entries')
			.send(salaryAndWagesEntry)
			.expect(401)
			.end(function(salaryAndWagesEntrySaveErr, salaryAndWagesEntrySaveRes) {
				// Call the assertion callback
				done(salaryAndWagesEntrySaveErr);
			});
	});

	it('should not be able to save Salary and wages entry instance if no name is provided', function(done) {
		// Invalidate name field
		salaryAndWagesEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Salary and wages entry
				agent.post('/salary-and-wages-entries')
					.send(salaryAndWagesEntry)
					.expect(400)
					.end(function(salaryAndWagesEntrySaveErr, salaryAndWagesEntrySaveRes) {
						// Set message assertion
						(salaryAndWagesEntrySaveRes.body.message).should.match('Please fill Salary and wages entry name');
						
						// Handle Salary and wages entry save error
						done(salaryAndWagesEntrySaveErr);
					});
			});
	});

	it('should be able to update Salary and wages entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Salary and wages entry
				agent.post('/salary-and-wages-entries')
					.send(salaryAndWagesEntry)
					.expect(200)
					.end(function(salaryAndWagesEntrySaveErr, salaryAndWagesEntrySaveRes) {
						// Handle Salary and wages entry save error
						if (salaryAndWagesEntrySaveErr) done(salaryAndWagesEntrySaveErr);

						// Update Salary and wages entry name
						salaryAndWagesEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Salary and wages entry
						agent.put('/salary-and-wages-entries/' + salaryAndWagesEntrySaveRes.body._id)
							.send(salaryAndWagesEntry)
							.expect(200)
							.end(function(salaryAndWagesEntryUpdateErr, salaryAndWagesEntryUpdateRes) {
								// Handle Salary and wages entry update error
								if (salaryAndWagesEntryUpdateErr) done(salaryAndWagesEntryUpdateErr);

								// Set assertions
								(salaryAndWagesEntryUpdateRes.body._id).should.equal(salaryAndWagesEntrySaveRes.body._id);
								(salaryAndWagesEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Salary and wages entries if not signed in', function(done) {
		// Create new Salary and wages entry model instance
		var salaryAndWagesEntryObj = new SalaryAndWagesEntry(salaryAndWagesEntry);

		// Save the Salary and wages entry
		salaryAndWagesEntryObj.save(function() {
			// Request Salary and wages entries
			request(app).get('/salary-and-wages-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Salary and wages entry if not signed in', function(done) {
		// Create new Salary and wages entry model instance
		var salaryAndWagesEntryObj = new SalaryAndWagesEntry(salaryAndWagesEntry);

		// Save the Salary and wages entry
		salaryAndWagesEntryObj.save(function() {
			request(app).get('/salary-and-wages-entries/' + salaryAndWagesEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', salaryAndWagesEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Salary and wages entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Salary and wages entry
				agent.post('/salary-and-wages-entries')
					.send(salaryAndWagesEntry)
					.expect(200)
					.end(function(salaryAndWagesEntrySaveErr, salaryAndWagesEntrySaveRes) {
						// Handle Salary and wages entry save error
						if (salaryAndWagesEntrySaveErr) done(salaryAndWagesEntrySaveErr);

						// Delete existing Salary and wages entry
						agent.delete('/salary-and-wages-entries/' + salaryAndWagesEntrySaveRes.body._id)
							.send(salaryAndWagesEntry)
							.expect(200)
							.end(function(salaryAndWagesEntryDeleteErr, salaryAndWagesEntryDeleteRes) {
								// Handle Salary and wages entry error error
								if (salaryAndWagesEntryDeleteErr) done(salaryAndWagesEntryDeleteErr);

								// Set assertions
								(salaryAndWagesEntryDeleteRes.body._id).should.equal(salaryAndWagesEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Salary and wages entry instance if not signed in', function(done) {
		// Set Salary and wages entry user 
		salaryAndWagesEntry.user = user;

		// Create new Salary and wages entry model instance
		var salaryAndWagesEntryObj = new SalaryAndWagesEntry(salaryAndWagesEntry);

		// Save the Salary and wages entry
		salaryAndWagesEntryObj.save(function() {
			// Try deleting Salary and wages entry
			request(app).delete('/salary-and-wages-entries/' + salaryAndWagesEntryObj._id)
			.expect(401)
			.end(function(salaryAndWagesEntryDeleteErr, salaryAndWagesEntryDeleteRes) {
				// Set message assertion
				(salaryAndWagesEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Salary and wages entry error error
				done(salaryAndWagesEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		SalaryAndWagesEntry.remove().exec();
		done();
	});
});