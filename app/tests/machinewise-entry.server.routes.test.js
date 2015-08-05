'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	MachinewiseEntry = mongoose.model('MachinewiseEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, machinewiseEntry;

/**
 * Machinewise entry routes tests
 */
describe('Machinewise entry CRUD tests', function() {
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

		// Save a user to the test db and create new Machinewise entry
		user.save(function() {
			machinewiseEntry = {
				name: 'Machinewise entry Name'
			};

			done();
		});
	});

	it('should be able to save Machinewise entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Machinewise entry
				agent.post('/machinewise-entries')
					.send(machinewiseEntry)
					.expect(200)
					.end(function(machinewiseEntrySaveErr, machinewiseEntrySaveRes) {
						// Handle Machinewise entry save error
						if (machinewiseEntrySaveErr) done(machinewiseEntrySaveErr);

						// Get a list of Machinewise entries
						agent.get('/machinewise-entries')
							.end(function(machinewiseEntriesGetErr, machinewiseEntriesGetRes) {
								// Handle Machinewise entry save error
								if (machinewiseEntriesGetErr) done(machinewiseEntriesGetErr);

								// Get Machinewise entries list
								var machinewiseEntries = machinewiseEntriesGetRes.body;

								// Set assertions
								(machinewiseEntries[0].user._id).should.equal(userId);
								(machinewiseEntries[0].name).should.match('Machinewise entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Machinewise entry instance if not logged in', function(done) {
		agent.post('/machinewise-entries')
			.send(machinewiseEntry)
			.expect(401)
			.end(function(machinewiseEntrySaveErr, machinewiseEntrySaveRes) {
				// Call the assertion callback
				done(machinewiseEntrySaveErr);
			});
	});

	it('should not be able to save Machinewise entry instance if no name is provided', function(done) {
		// Invalidate name field
		machinewiseEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Machinewise entry
				agent.post('/machinewise-entries')
					.send(machinewiseEntry)
					.expect(400)
					.end(function(machinewiseEntrySaveErr, machinewiseEntrySaveRes) {
						// Set message assertion
						(machinewiseEntrySaveRes.body.message).should.match('Please fill Machinewise entry name');
						
						// Handle Machinewise entry save error
						done(machinewiseEntrySaveErr);
					});
			});
	});

	it('should be able to update Machinewise entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Machinewise entry
				agent.post('/machinewise-entries')
					.send(machinewiseEntry)
					.expect(200)
					.end(function(machinewiseEntrySaveErr, machinewiseEntrySaveRes) {
						// Handle Machinewise entry save error
						if (machinewiseEntrySaveErr) done(machinewiseEntrySaveErr);

						// Update Machinewise entry name
						machinewiseEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Machinewise entry
						agent.put('/machinewise-entries/' + machinewiseEntrySaveRes.body._id)
							.send(machinewiseEntry)
							.expect(200)
							.end(function(machinewiseEntryUpdateErr, machinewiseEntryUpdateRes) {
								// Handle Machinewise entry update error
								if (machinewiseEntryUpdateErr) done(machinewiseEntryUpdateErr);

								// Set assertions
								(machinewiseEntryUpdateRes.body._id).should.equal(machinewiseEntrySaveRes.body._id);
								(machinewiseEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Machinewise entries if not signed in', function(done) {
		// Create new Machinewise entry model instance
		var machinewiseEntryObj = new MachinewiseEntry(machinewiseEntry);

		// Save the Machinewise entry
		machinewiseEntryObj.save(function() {
			// Request Machinewise entries
			request(app).get('/machinewise-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Machinewise entry if not signed in', function(done) {
		// Create new Machinewise entry model instance
		var machinewiseEntryObj = new MachinewiseEntry(machinewiseEntry);

		// Save the Machinewise entry
		machinewiseEntryObj.save(function() {
			request(app).get('/machinewise-entries/' + machinewiseEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', machinewiseEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Machinewise entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Machinewise entry
				agent.post('/machinewise-entries')
					.send(machinewiseEntry)
					.expect(200)
					.end(function(machinewiseEntrySaveErr, machinewiseEntrySaveRes) {
						// Handle Machinewise entry save error
						if (machinewiseEntrySaveErr) done(machinewiseEntrySaveErr);

						// Delete existing Machinewise entry
						agent.delete('/machinewise-entries/' + machinewiseEntrySaveRes.body._id)
							.send(machinewiseEntry)
							.expect(200)
							.end(function(machinewiseEntryDeleteErr, machinewiseEntryDeleteRes) {
								// Handle Machinewise entry error error
								if (machinewiseEntryDeleteErr) done(machinewiseEntryDeleteErr);

								// Set assertions
								(machinewiseEntryDeleteRes.body._id).should.equal(machinewiseEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Machinewise entry instance if not signed in', function(done) {
		// Set Machinewise entry user 
		machinewiseEntry.user = user;

		// Create new Machinewise entry model instance
		var machinewiseEntryObj = new MachinewiseEntry(machinewiseEntry);

		// Save the Machinewise entry
		machinewiseEntryObj.save(function() {
			// Try deleting Machinewise entry
			request(app).delete('/machinewise-entries/' + machinewiseEntryObj._id)
			.expect(401)
			.end(function(machinewiseEntryDeleteErr, machinewiseEntryDeleteRes) {
				// Set message assertion
				(machinewiseEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Machinewise entry error error
				done(machinewiseEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		MachinewiseEntry.remove().exec();
		done();
	});
});