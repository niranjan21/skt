'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	StoppagesEntry = mongoose.model('StoppagesEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, stoppagesEntry;

/**
 * Stoppages entry routes tests
 */
describe('Stoppages entry CRUD tests', function() {
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

		// Save a user to the test db and create new Stoppages entry
		user.save(function() {
			stoppagesEntry = {
				name: 'Stoppages entry Name'
			};

			done();
		});
	});

	it('should be able to save Stoppages entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Stoppages entry
				agent.post('/stoppages-entries')
					.send(stoppagesEntry)
					.expect(200)
					.end(function(stoppagesEntrySaveErr, stoppagesEntrySaveRes) {
						// Handle Stoppages entry save error
						if (stoppagesEntrySaveErr) done(stoppagesEntrySaveErr);

						// Get a list of Stoppages entries
						agent.get('/stoppages-entries')
							.end(function(stoppagesEntriesGetErr, stoppagesEntriesGetRes) {
								// Handle Stoppages entry save error
								if (stoppagesEntriesGetErr) done(stoppagesEntriesGetErr);

								// Get Stoppages entries list
								var stoppagesEntries = stoppagesEntriesGetRes.body;

								// Set assertions
								(stoppagesEntries[0].user._id).should.equal(userId);
								(stoppagesEntries[0].name).should.match('Stoppages entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Stoppages entry instance if not logged in', function(done) {
		agent.post('/stoppages-entries')
			.send(stoppagesEntry)
			.expect(401)
			.end(function(stoppagesEntrySaveErr, stoppagesEntrySaveRes) {
				// Call the assertion callback
				done(stoppagesEntrySaveErr);
			});
	});

	it('should not be able to save Stoppages entry instance if no name is provided', function(done) {
		// Invalidate name field
		stoppagesEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Stoppages entry
				agent.post('/stoppages-entries')
					.send(stoppagesEntry)
					.expect(400)
					.end(function(stoppagesEntrySaveErr, stoppagesEntrySaveRes) {
						// Set message assertion
						(stoppagesEntrySaveRes.body.message).should.match('Please fill Stoppages entry name');
						
						// Handle Stoppages entry save error
						done(stoppagesEntrySaveErr);
					});
			});
	});

	it('should be able to update Stoppages entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Stoppages entry
				agent.post('/stoppages-entries')
					.send(stoppagesEntry)
					.expect(200)
					.end(function(stoppagesEntrySaveErr, stoppagesEntrySaveRes) {
						// Handle Stoppages entry save error
						if (stoppagesEntrySaveErr) done(stoppagesEntrySaveErr);

						// Update Stoppages entry name
						stoppagesEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Stoppages entry
						agent.put('/stoppages-entries/' + stoppagesEntrySaveRes.body._id)
							.send(stoppagesEntry)
							.expect(200)
							.end(function(stoppagesEntryUpdateErr, stoppagesEntryUpdateRes) {
								// Handle Stoppages entry update error
								if (stoppagesEntryUpdateErr) done(stoppagesEntryUpdateErr);

								// Set assertions
								(stoppagesEntryUpdateRes.body._id).should.equal(stoppagesEntrySaveRes.body._id);
								(stoppagesEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Stoppages entries if not signed in', function(done) {
		// Create new Stoppages entry model instance
		var stoppagesEntryObj = new StoppagesEntry(stoppagesEntry);

		// Save the Stoppages entry
		stoppagesEntryObj.save(function() {
			// Request Stoppages entries
			request(app).get('/stoppages-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Stoppages entry if not signed in', function(done) {
		// Create new Stoppages entry model instance
		var stoppagesEntryObj = new StoppagesEntry(stoppagesEntry);

		// Save the Stoppages entry
		stoppagesEntryObj.save(function() {
			request(app).get('/stoppages-entries/' + stoppagesEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', stoppagesEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Stoppages entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Stoppages entry
				agent.post('/stoppages-entries')
					.send(stoppagesEntry)
					.expect(200)
					.end(function(stoppagesEntrySaveErr, stoppagesEntrySaveRes) {
						// Handle Stoppages entry save error
						if (stoppagesEntrySaveErr) done(stoppagesEntrySaveErr);

						// Delete existing Stoppages entry
						agent.delete('/stoppages-entries/' + stoppagesEntrySaveRes.body._id)
							.send(stoppagesEntry)
							.expect(200)
							.end(function(stoppagesEntryDeleteErr, stoppagesEntryDeleteRes) {
								// Handle Stoppages entry error error
								if (stoppagesEntryDeleteErr) done(stoppagesEntryDeleteErr);

								// Set assertions
								(stoppagesEntryDeleteRes.body._id).should.equal(stoppagesEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Stoppages entry instance if not signed in', function(done) {
		// Set Stoppages entry user 
		stoppagesEntry.user = user;

		// Create new Stoppages entry model instance
		var stoppagesEntryObj = new StoppagesEntry(stoppagesEntry);

		// Save the Stoppages entry
		stoppagesEntryObj.save(function() {
			// Try deleting Stoppages entry
			request(app).delete('/stoppages-entries/' + stoppagesEntryObj._id)
			.expect(401)
			.end(function(stoppagesEntryDeleteErr, stoppagesEntryDeleteRes) {
				// Set message assertion
				(stoppagesEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Stoppages entry error error
				done(stoppagesEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		StoppagesEntry.remove().exec();
		done();
	});
});