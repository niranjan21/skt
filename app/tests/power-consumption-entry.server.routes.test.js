'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	PowerConsumptionEntry = mongoose.model('PowerConsumptionEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, powerConsumptionEntry;

/**
 * Power consumption entry routes tests
 */
describe('Power consumption entry CRUD tests', function() {
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

		// Save a user to the test db and create new Power consumption entry
		user.save(function() {
			powerConsumptionEntry = {
				name: 'Power consumption entry Name'
			};

			done();
		});
	});

	it('should be able to save Power consumption entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Power consumption entry
				agent.post('/power-consumption-entries')
					.send(powerConsumptionEntry)
					.expect(200)
					.end(function(powerConsumptionEntrySaveErr, powerConsumptionEntrySaveRes) {
						// Handle Power consumption entry save error
						if (powerConsumptionEntrySaveErr) done(powerConsumptionEntrySaveErr);

						// Get a list of Power consumption entries
						agent.get('/power-consumption-entries')
							.end(function(powerConsumptionEntriesGetErr, powerConsumptionEntriesGetRes) {
								// Handle Power consumption entry save error
								if (powerConsumptionEntriesGetErr) done(powerConsumptionEntriesGetErr);

								// Get Power consumption entries list
								var powerConsumptionEntries = powerConsumptionEntriesGetRes.body;

								// Set assertions
								(powerConsumptionEntries[0].user._id).should.equal(userId);
								(powerConsumptionEntries[0].name).should.match('Power consumption entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Power consumption entry instance if not logged in', function(done) {
		agent.post('/power-consumption-entries')
			.send(powerConsumptionEntry)
			.expect(401)
			.end(function(powerConsumptionEntrySaveErr, powerConsumptionEntrySaveRes) {
				// Call the assertion callback
				done(powerConsumptionEntrySaveErr);
			});
	});

	it('should not be able to save Power consumption entry instance if no name is provided', function(done) {
		// Invalidate name field
		powerConsumptionEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Power consumption entry
				agent.post('/power-consumption-entries')
					.send(powerConsumptionEntry)
					.expect(400)
					.end(function(powerConsumptionEntrySaveErr, powerConsumptionEntrySaveRes) {
						// Set message assertion
						(powerConsumptionEntrySaveRes.body.message).should.match('Please fill Power consumption entry name');
						
						// Handle Power consumption entry save error
						done(powerConsumptionEntrySaveErr);
					});
			});
	});

	it('should be able to update Power consumption entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Power consumption entry
				agent.post('/power-consumption-entries')
					.send(powerConsumptionEntry)
					.expect(200)
					.end(function(powerConsumptionEntrySaveErr, powerConsumptionEntrySaveRes) {
						// Handle Power consumption entry save error
						if (powerConsumptionEntrySaveErr) done(powerConsumptionEntrySaveErr);

						// Update Power consumption entry name
						powerConsumptionEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Power consumption entry
						agent.put('/power-consumption-entries/' + powerConsumptionEntrySaveRes.body._id)
							.send(powerConsumptionEntry)
							.expect(200)
							.end(function(powerConsumptionEntryUpdateErr, powerConsumptionEntryUpdateRes) {
								// Handle Power consumption entry update error
								if (powerConsumptionEntryUpdateErr) done(powerConsumptionEntryUpdateErr);

								// Set assertions
								(powerConsumptionEntryUpdateRes.body._id).should.equal(powerConsumptionEntrySaveRes.body._id);
								(powerConsumptionEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Power consumption entries if not signed in', function(done) {
		// Create new Power consumption entry model instance
		var powerConsumptionEntryObj = new PowerConsumptionEntry(powerConsumptionEntry);

		// Save the Power consumption entry
		powerConsumptionEntryObj.save(function() {
			// Request Power consumption entries
			request(app).get('/power-consumption-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Power consumption entry if not signed in', function(done) {
		// Create new Power consumption entry model instance
		var powerConsumptionEntryObj = new PowerConsumptionEntry(powerConsumptionEntry);

		// Save the Power consumption entry
		powerConsumptionEntryObj.save(function() {
			request(app).get('/power-consumption-entries/' + powerConsumptionEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', powerConsumptionEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Power consumption entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Power consumption entry
				agent.post('/power-consumption-entries')
					.send(powerConsumptionEntry)
					.expect(200)
					.end(function(powerConsumptionEntrySaveErr, powerConsumptionEntrySaveRes) {
						// Handle Power consumption entry save error
						if (powerConsumptionEntrySaveErr) done(powerConsumptionEntrySaveErr);

						// Delete existing Power consumption entry
						agent.delete('/power-consumption-entries/' + powerConsumptionEntrySaveRes.body._id)
							.send(powerConsumptionEntry)
							.expect(200)
							.end(function(powerConsumptionEntryDeleteErr, powerConsumptionEntryDeleteRes) {
								// Handle Power consumption entry error error
								if (powerConsumptionEntryDeleteErr) done(powerConsumptionEntryDeleteErr);

								// Set assertions
								(powerConsumptionEntryDeleteRes.body._id).should.equal(powerConsumptionEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Power consumption entry instance if not signed in', function(done) {
		// Set Power consumption entry user 
		powerConsumptionEntry.user = user;

		// Create new Power consumption entry model instance
		var powerConsumptionEntryObj = new PowerConsumptionEntry(powerConsumptionEntry);

		// Save the Power consumption entry
		powerConsumptionEntryObj.save(function() {
			// Try deleting Power consumption entry
			request(app).delete('/power-consumption-entries/' + powerConsumptionEntryObj._id)
			.expect(401)
			.end(function(powerConsumptionEntryDeleteErr, powerConsumptionEntryDeleteRes) {
				// Set message assertion
				(powerConsumptionEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Power consumption entry error error
				done(powerConsumptionEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		PowerConsumptionEntry.remove().exec();
		done();
	});
});