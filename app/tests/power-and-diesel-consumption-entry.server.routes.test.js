'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	PowerAndDieselConsumptionEntry = mongoose.model('PowerAndDieselConsumptionEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, powerAndDieselConsumptionEntry;

/**
 * Power and diesel consumption entry routes tests
 */
describe('Power and diesel consumption entry CRUD tests', function() {
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

		// Save a user to the test db and create new Power and diesel consumption entry
		user.save(function() {
			powerAndDieselConsumptionEntry = {
				name: 'Power and diesel consumption entry Name'
			};

			done();
		});
	});

	it('should be able to save Power and diesel consumption entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Power and diesel consumption entry
				agent.post('/power-and-diesel-consumption-entries')
					.send(powerAndDieselConsumptionEntry)
					.expect(200)
					.end(function(powerAndDieselConsumptionEntrySaveErr, powerAndDieselConsumptionEntrySaveRes) {
						// Handle Power and diesel consumption entry save error
						if (powerAndDieselConsumptionEntrySaveErr) done(powerAndDieselConsumptionEntrySaveErr);

						// Get a list of Power and diesel consumption entries
						agent.get('/power-and-diesel-consumption-entries')
							.end(function(powerAndDieselConsumptionEntriesGetErr, powerAndDieselConsumptionEntriesGetRes) {
								// Handle Power and diesel consumption entry save error
								if (powerAndDieselConsumptionEntriesGetErr) done(powerAndDieselConsumptionEntriesGetErr);

								// Get Power and diesel consumption entries list
								var powerAndDieselConsumptionEntries = powerAndDieselConsumptionEntriesGetRes.body;

								// Set assertions
								(powerAndDieselConsumptionEntries[0].user._id).should.equal(userId);
								(powerAndDieselConsumptionEntries[0].name).should.match('Power and diesel consumption entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Power and diesel consumption entry instance if not logged in', function(done) {
		agent.post('/power-and-diesel-consumption-entries')
			.send(powerAndDieselConsumptionEntry)
			.expect(401)
			.end(function(powerAndDieselConsumptionEntrySaveErr, powerAndDieselConsumptionEntrySaveRes) {
				// Call the assertion callback
				done(powerAndDieselConsumptionEntrySaveErr);
			});
	});

	it('should not be able to save Power and diesel consumption entry instance if no name is provided', function(done) {
		// Invalidate name field
		powerAndDieselConsumptionEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Power and diesel consumption entry
				agent.post('/power-and-diesel-consumption-entries')
					.send(powerAndDieselConsumptionEntry)
					.expect(400)
					.end(function(powerAndDieselConsumptionEntrySaveErr, powerAndDieselConsumptionEntrySaveRes) {
						// Set message assertion
						(powerAndDieselConsumptionEntrySaveRes.body.message).should.match('Please fill Power and diesel consumption entry name');
						
						// Handle Power and diesel consumption entry save error
						done(powerAndDieselConsumptionEntrySaveErr);
					});
			});
	});

	it('should be able to update Power and diesel consumption entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Power and diesel consumption entry
				agent.post('/power-and-diesel-consumption-entries')
					.send(powerAndDieselConsumptionEntry)
					.expect(200)
					.end(function(powerAndDieselConsumptionEntrySaveErr, powerAndDieselConsumptionEntrySaveRes) {
						// Handle Power and diesel consumption entry save error
						if (powerAndDieselConsumptionEntrySaveErr) done(powerAndDieselConsumptionEntrySaveErr);

						// Update Power and diesel consumption entry name
						powerAndDieselConsumptionEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Power and diesel consumption entry
						agent.put('/power-and-diesel-consumption-entries/' + powerAndDieselConsumptionEntrySaveRes.body._id)
							.send(powerAndDieselConsumptionEntry)
							.expect(200)
							.end(function(powerAndDieselConsumptionEntryUpdateErr, powerAndDieselConsumptionEntryUpdateRes) {
								// Handle Power and diesel consumption entry update error
								if (powerAndDieselConsumptionEntryUpdateErr) done(powerAndDieselConsumptionEntryUpdateErr);

								// Set assertions
								(powerAndDieselConsumptionEntryUpdateRes.body._id).should.equal(powerAndDieselConsumptionEntrySaveRes.body._id);
								(powerAndDieselConsumptionEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Power and diesel consumption entries if not signed in', function(done) {
		// Create new Power and diesel consumption entry model instance
		var powerAndDieselConsumptionEntryObj = new PowerAndDieselConsumptionEntry(powerAndDieselConsumptionEntry);

		// Save the Power and diesel consumption entry
		powerAndDieselConsumptionEntryObj.save(function() {
			// Request Power and diesel consumption entries
			request(app).get('/power-and-diesel-consumption-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Power and diesel consumption entry if not signed in', function(done) {
		// Create new Power and diesel consumption entry model instance
		var powerAndDieselConsumptionEntryObj = new PowerAndDieselConsumptionEntry(powerAndDieselConsumptionEntry);

		// Save the Power and diesel consumption entry
		powerAndDieselConsumptionEntryObj.save(function() {
			request(app).get('/power-and-diesel-consumption-entries/' + powerAndDieselConsumptionEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', powerAndDieselConsumptionEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Power and diesel consumption entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Power and diesel consumption entry
				agent.post('/power-and-diesel-consumption-entries')
					.send(powerAndDieselConsumptionEntry)
					.expect(200)
					.end(function(powerAndDieselConsumptionEntrySaveErr, powerAndDieselConsumptionEntrySaveRes) {
						// Handle Power and diesel consumption entry save error
						if (powerAndDieselConsumptionEntrySaveErr) done(powerAndDieselConsumptionEntrySaveErr);

						// Delete existing Power and diesel consumption entry
						agent.delete('/power-and-diesel-consumption-entries/' + powerAndDieselConsumptionEntrySaveRes.body._id)
							.send(powerAndDieselConsumptionEntry)
							.expect(200)
							.end(function(powerAndDieselConsumptionEntryDeleteErr, powerAndDieselConsumptionEntryDeleteRes) {
								// Handle Power and diesel consumption entry error error
								if (powerAndDieselConsumptionEntryDeleteErr) done(powerAndDieselConsumptionEntryDeleteErr);

								// Set assertions
								(powerAndDieselConsumptionEntryDeleteRes.body._id).should.equal(powerAndDieselConsumptionEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Power and diesel consumption entry instance if not signed in', function(done) {
		// Set Power and diesel consumption entry user 
		powerAndDieselConsumptionEntry.user = user;

		// Create new Power and diesel consumption entry model instance
		var powerAndDieselConsumptionEntryObj = new PowerAndDieselConsumptionEntry(powerAndDieselConsumptionEntry);

		// Save the Power and diesel consumption entry
		powerAndDieselConsumptionEntryObj.save(function() {
			// Try deleting Power and diesel consumption entry
			request(app).delete('/power-and-diesel-consumption-entries/' + powerAndDieselConsumptionEntryObj._id)
			.expect(401)
			.end(function(powerAndDieselConsumptionEntryDeleteErr, powerAndDieselConsumptionEntryDeleteRes) {
				// Set message assertion
				(powerAndDieselConsumptionEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Power and diesel consumption entry error error
				done(powerAndDieselConsumptionEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		PowerAndDieselConsumptionEntry.remove().exec();
		done();
	});
});