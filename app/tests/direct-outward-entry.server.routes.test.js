'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	DirectOutwardEntry = mongoose.model('DirectOutwardEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, directOutwardEntry;

/**
 * Direct outward entry routes tests
 */
describe('Direct outward entry CRUD tests', function() {
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

		// Save a user to the test db and create new Direct outward entry
		user.save(function() {
			directOutwardEntry = {
				name: 'Direct outward entry Name'
			};

			done();
		});
	});

	it('should be able to save Direct outward entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Direct outward entry
				agent.post('/direct-outward-entries')
					.send(directOutwardEntry)
					.expect(200)
					.end(function(directOutwardEntrySaveErr, directOutwardEntrySaveRes) {
						// Handle Direct outward entry save error
						if (directOutwardEntrySaveErr) done(directOutwardEntrySaveErr);

						// Get a list of Direct outward entries
						agent.get('/direct-outward-entries')
							.end(function(directOutwardEntriesGetErr, directOutwardEntriesGetRes) {
								// Handle Direct outward entry save error
								if (directOutwardEntriesGetErr) done(directOutwardEntriesGetErr);

								// Get Direct outward entries list
								var directOutwardEntries = directOutwardEntriesGetRes.body;

								// Set assertions
								(directOutwardEntries[0].user._id).should.equal(userId);
								(directOutwardEntries[0].name).should.match('Direct outward entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Direct outward entry instance if not logged in', function(done) {
		agent.post('/direct-outward-entries')
			.send(directOutwardEntry)
			.expect(401)
			.end(function(directOutwardEntrySaveErr, directOutwardEntrySaveRes) {
				// Call the assertion callback
				done(directOutwardEntrySaveErr);
			});
	});

	it('should not be able to save Direct outward entry instance if no name is provided', function(done) {
		// Invalidate name field
		directOutwardEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Direct outward entry
				agent.post('/direct-outward-entries')
					.send(directOutwardEntry)
					.expect(400)
					.end(function(directOutwardEntrySaveErr, directOutwardEntrySaveRes) {
						// Set message assertion
						(directOutwardEntrySaveRes.body.message).should.match('Please fill Direct outward entry name');
						
						// Handle Direct outward entry save error
						done(directOutwardEntrySaveErr);
					});
			});
	});

	it('should be able to update Direct outward entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Direct outward entry
				agent.post('/direct-outward-entries')
					.send(directOutwardEntry)
					.expect(200)
					.end(function(directOutwardEntrySaveErr, directOutwardEntrySaveRes) {
						// Handle Direct outward entry save error
						if (directOutwardEntrySaveErr) done(directOutwardEntrySaveErr);

						// Update Direct outward entry name
						directOutwardEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Direct outward entry
						agent.put('/direct-outward-entries/' + directOutwardEntrySaveRes.body._id)
							.send(directOutwardEntry)
							.expect(200)
							.end(function(directOutwardEntryUpdateErr, directOutwardEntryUpdateRes) {
								// Handle Direct outward entry update error
								if (directOutwardEntryUpdateErr) done(directOutwardEntryUpdateErr);

								// Set assertions
								(directOutwardEntryUpdateRes.body._id).should.equal(directOutwardEntrySaveRes.body._id);
								(directOutwardEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Direct outward entries if not signed in', function(done) {
		// Create new Direct outward entry model instance
		var directOutwardEntryObj = new DirectOutwardEntry(directOutwardEntry);

		// Save the Direct outward entry
		directOutwardEntryObj.save(function() {
			// Request Direct outward entries
			request(app).get('/direct-outward-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Direct outward entry if not signed in', function(done) {
		// Create new Direct outward entry model instance
		var directOutwardEntryObj = new DirectOutwardEntry(directOutwardEntry);

		// Save the Direct outward entry
		directOutwardEntryObj.save(function() {
			request(app).get('/direct-outward-entries/' + directOutwardEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', directOutwardEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Direct outward entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Direct outward entry
				agent.post('/direct-outward-entries')
					.send(directOutwardEntry)
					.expect(200)
					.end(function(directOutwardEntrySaveErr, directOutwardEntrySaveRes) {
						// Handle Direct outward entry save error
						if (directOutwardEntrySaveErr) done(directOutwardEntrySaveErr);

						// Delete existing Direct outward entry
						agent.delete('/direct-outward-entries/' + directOutwardEntrySaveRes.body._id)
							.send(directOutwardEntry)
							.expect(200)
							.end(function(directOutwardEntryDeleteErr, directOutwardEntryDeleteRes) {
								// Handle Direct outward entry error error
								if (directOutwardEntryDeleteErr) done(directOutwardEntryDeleteErr);

								// Set assertions
								(directOutwardEntryDeleteRes.body._id).should.equal(directOutwardEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Direct outward entry instance if not signed in', function(done) {
		// Set Direct outward entry user 
		directOutwardEntry.user = user;

		// Create new Direct outward entry model instance
		var directOutwardEntryObj = new DirectOutwardEntry(directOutwardEntry);

		// Save the Direct outward entry
		directOutwardEntryObj.save(function() {
			// Try deleting Direct outward entry
			request(app).delete('/direct-outward-entries/' + directOutwardEntryObj._id)
			.expect(401)
			.end(function(directOutwardEntryDeleteErr, directOutwardEntryDeleteRes) {
				// Set message assertion
				(directOutwardEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Direct outward entry error error
				done(directOutwardEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		DirectOutwardEntry.remove().exec();
		done();
	});
});