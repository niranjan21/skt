'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	ShiftEntry = mongoose.model('ShiftEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, shiftEntry;

/**
 * Shift entry routes tests
 */
describe('Shift entry CRUD tests', function() {
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

		// Save a user to the test db and create new Shift entry
		user.save(function() {
			shiftEntry = {
				name: 'Shift entry Name'
			};

			done();
		});
	});

	it('should be able to save Shift entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Shift entry
				agent.post('/shift-entries')
					.send(shiftEntry)
					.expect(200)
					.end(function(shiftEntrySaveErr, shiftEntrySaveRes) {
						// Handle Shift entry save error
						if (shiftEntrySaveErr) done(shiftEntrySaveErr);

						// Get a list of Shift entries
						agent.get('/shift-entries')
							.end(function(shiftEntriesGetErr, shiftEntriesGetRes) {
								// Handle Shift entry save error
								if (shiftEntriesGetErr) done(shiftEntriesGetErr);

								// Get Shift entries list
								var shiftEntries = shiftEntriesGetRes.body;

								// Set assertions
								(shiftEntries[0].user._id).should.equal(userId);
								(shiftEntries[0].name).should.match('Shift entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Shift entry instance if not logged in', function(done) {
		agent.post('/shift-entries')
			.send(shiftEntry)
			.expect(401)
			.end(function(shiftEntrySaveErr, shiftEntrySaveRes) {
				// Call the assertion callback
				done(shiftEntrySaveErr);
			});
	});

	it('should not be able to save Shift entry instance if no name is provided', function(done) {
		// Invalidate name field
		shiftEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Shift entry
				agent.post('/shift-entries')
					.send(shiftEntry)
					.expect(400)
					.end(function(shiftEntrySaveErr, shiftEntrySaveRes) {
						// Set message assertion
						(shiftEntrySaveRes.body.message).should.match('Please fill Shift entry name');
						
						// Handle Shift entry save error
						done(shiftEntrySaveErr);
					});
			});
	});

	it('should be able to update Shift entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Shift entry
				agent.post('/shift-entries')
					.send(shiftEntry)
					.expect(200)
					.end(function(shiftEntrySaveErr, shiftEntrySaveRes) {
						// Handle Shift entry save error
						if (shiftEntrySaveErr) done(shiftEntrySaveErr);

						// Update Shift entry name
						shiftEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Shift entry
						agent.put('/shift-entries/' + shiftEntrySaveRes.body._id)
							.send(shiftEntry)
							.expect(200)
							.end(function(shiftEntryUpdateErr, shiftEntryUpdateRes) {
								// Handle Shift entry update error
								if (shiftEntryUpdateErr) done(shiftEntryUpdateErr);

								// Set assertions
								(shiftEntryUpdateRes.body._id).should.equal(shiftEntrySaveRes.body._id);
								(shiftEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Shift entries if not signed in', function(done) {
		// Create new Shift entry model instance
		var shiftEntryObj = new ShiftEntry(shiftEntry);

		// Save the Shift entry
		shiftEntryObj.save(function() {
			// Request Shift entries
			request(app).get('/shift-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Shift entry if not signed in', function(done) {
		// Create new Shift entry model instance
		var shiftEntryObj = new ShiftEntry(shiftEntry);

		// Save the Shift entry
		shiftEntryObj.save(function() {
			request(app).get('/shift-entries/' + shiftEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', shiftEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Shift entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Shift entry
				agent.post('/shift-entries')
					.send(shiftEntry)
					.expect(200)
					.end(function(shiftEntrySaveErr, shiftEntrySaveRes) {
						// Handle Shift entry save error
						if (shiftEntrySaveErr) done(shiftEntrySaveErr);

						// Delete existing Shift entry
						agent.delete('/shift-entries/' + shiftEntrySaveRes.body._id)
							.send(shiftEntry)
							.expect(200)
							.end(function(shiftEntryDeleteErr, shiftEntryDeleteRes) {
								// Handle Shift entry error error
								if (shiftEntryDeleteErr) done(shiftEntryDeleteErr);

								// Set assertions
								(shiftEntryDeleteRes.body._id).should.equal(shiftEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Shift entry instance if not signed in', function(done) {
		// Set Shift entry user 
		shiftEntry.user = user;

		// Create new Shift entry model instance
		var shiftEntryObj = new ShiftEntry(shiftEntry);

		// Save the Shift entry
		shiftEntryObj.save(function() {
			// Try deleting Shift entry
			request(app).delete('/shift-entries/' + shiftEntryObj._id)
			.expect(401)
			.end(function(shiftEntryDeleteErr, shiftEntryDeleteRes) {
				// Set message assertion
				(shiftEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Shift entry error error
				done(shiftEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		ShiftEntry.remove().exec();
		done();
	});
});