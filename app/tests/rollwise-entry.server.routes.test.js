'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	RollwiseEntry = mongoose.model('RollwiseEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, rollwiseEntry;

/**
 * Rollwise entry routes tests
 */
describe('Rollwise entry CRUD tests', function() {
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

		// Save a user to the test db and create new Rollwise entry
		user.save(function() {
			rollwiseEntry = {
				name: 'Rollwise entry Name'
			};

			done();
		});
	});

	it('should be able to save Rollwise entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Rollwise entry
				agent.post('/rollwise-entries')
					.send(rollwiseEntry)
					.expect(200)
					.end(function(rollwiseEntrySaveErr, rollwiseEntrySaveRes) {
						// Handle Rollwise entry save error
						if (rollwiseEntrySaveErr) done(rollwiseEntrySaveErr);

						// Get a list of Rollwise entries
						agent.get('/rollwise-entries')
							.end(function(rollwiseEntriesGetErr, rollwiseEntriesGetRes) {
								// Handle Rollwise entry save error
								if (rollwiseEntriesGetErr) done(rollwiseEntriesGetErr);

								// Get Rollwise entries list
								var rollwiseEntries = rollwiseEntriesGetRes.body;

								// Set assertions
								(rollwiseEntries[0].user._id).should.equal(userId);
								(rollwiseEntries[0].name).should.match('Rollwise entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Rollwise entry instance if not logged in', function(done) {
		agent.post('/rollwise-entries')
			.send(rollwiseEntry)
			.expect(401)
			.end(function(rollwiseEntrySaveErr, rollwiseEntrySaveRes) {
				// Call the assertion callback
				done(rollwiseEntrySaveErr);
			});
	});

	it('should not be able to save Rollwise entry instance if no name is provided', function(done) {
		// Invalidate name field
		rollwiseEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Rollwise entry
				agent.post('/rollwise-entries')
					.send(rollwiseEntry)
					.expect(400)
					.end(function(rollwiseEntrySaveErr, rollwiseEntrySaveRes) {
						// Set message assertion
						(rollwiseEntrySaveRes.body.message).should.match('Please fill Rollwise entry name');
						
						// Handle Rollwise entry save error
						done(rollwiseEntrySaveErr);
					});
			});
	});

	it('should be able to update Rollwise entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Rollwise entry
				agent.post('/rollwise-entries')
					.send(rollwiseEntry)
					.expect(200)
					.end(function(rollwiseEntrySaveErr, rollwiseEntrySaveRes) {
						// Handle Rollwise entry save error
						if (rollwiseEntrySaveErr) done(rollwiseEntrySaveErr);

						// Update Rollwise entry name
						rollwiseEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Rollwise entry
						agent.put('/rollwise-entries/' + rollwiseEntrySaveRes.body._id)
							.send(rollwiseEntry)
							.expect(200)
							.end(function(rollwiseEntryUpdateErr, rollwiseEntryUpdateRes) {
								// Handle Rollwise entry update error
								if (rollwiseEntryUpdateErr) done(rollwiseEntryUpdateErr);

								// Set assertions
								(rollwiseEntryUpdateRes.body._id).should.equal(rollwiseEntrySaveRes.body._id);
								(rollwiseEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Rollwise entries if not signed in', function(done) {
		// Create new Rollwise entry model instance
		var rollwiseEntryObj = new RollwiseEntry(rollwiseEntry);

		// Save the Rollwise entry
		rollwiseEntryObj.save(function() {
			// Request Rollwise entries
			request(app).get('/rollwise-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Rollwise entry if not signed in', function(done) {
		// Create new Rollwise entry model instance
		var rollwiseEntryObj = new RollwiseEntry(rollwiseEntry);

		// Save the Rollwise entry
		rollwiseEntryObj.save(function() {
			request(app).get('/rollwise-entries/' + rollwiseEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', rollwiseEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Rollwise entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Rollwise entry
				agent.post('/rollwise-entries')
					.send(rollwiseEntry)
					.expect(200)
					.end(function(rollwiseEntrySaveErr, rollwiseEntrySaveRes) {
						// Handle Rollwise entry save error
						if (rollwiseEntrySaveErr) done(rollwiseEntrySaveErr);

						// Delete existing Rollwise entry
						agent.delete('/rollwise-entries/' + rollwiseEntrySaveRes.body._id)
							.send(rollwiseEntry)
							.expect(200)
							.end(function(rollwiseEntryDeleteErr, rollwiseEntryDeleteRes) {
								// Handle Rollwise entry error error
								if (rollwiseEntryDeleteErr) done(rollwiseEntryDeleteErr);

								// Set assertions
								(rollwiseEntryDeleteRes.body._id).should.equal(rollwiseEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Rollwise entry instance if not signed in', function(done) {
		// Set Rollwise entry user 
		rollwiseEntry.user = user;

		// Create new Rollwise entry model instance
		var rollwiseEntryObj = new RollwiseEntry(rollwiseEntry);

		// Save the Rollwise entry
		rollwiseEntryObj.save(function() {
			// Try deleting Rollwise entry
			request(app).delete('/rollwise-entries/' + rollwiseEntryObj._id)
			.expect(401)
			.end(function(rollwiseEntryDeleteErr, rollwiseEntryDeleteRes) {
				// Set message assertion
				(rollwiseEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Rollwise entry error error
				done(rollwiseEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		RollwiseEntry.remove().exec();
		done();
	});
});