'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	DirectInwardEntry = mongoose.model('DirectInwardEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, directInwardEntry;

/**
 * Direct inward entry routes tests
 */
describe('Direct inward entry CRUD tests', function() {
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

		// Save a user to the test db and create new Direct inward entry
		user.save(function() {
			directInwardEntry = {
				name: 'Direct inward entry Name'
			};

			done();
		});
	});

	it('should be able to save Direct inward entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Direct inward entry
				agent.post('/direct-inward-entries')
					.send(directInwardEntry)
					.expect(200)
					.end(function(directInwardEntrySaveErr, directInwardEntrySaveRes) {
						// Handle Direct inward entry save error
						if (directInwardEntrySaveErr) done(directInwardEntrySaveErr);

						// Get a list of Direct inward entries
						agent.get('/direct-inward-entries')
							.end(function(directInwardEntriesGetErr, directInwardEntriesGetRes) {
								// Handle Direct inward entry save error
								if (directInwardEntriesGetErr) done(directInwardEntriesGetErr);

								// Get Direct inward entries list
								var directInwardEntries = directInwardEntriesGetRes.body;

								// Set assertions
								(directInwardEntries[0].user._id).should.equal(userId);
								(directInwardEntries[0].name).should.match('Direct inward entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Direct inward entry instance if not logged in', function(done) {
		agent.post('/direct-inward-entries')
			.send(directInwardEntry)
			.expect(401)
			.end(function(directInwardEntrySaveErr, directInwardEntrySaveRes) {
				// Call the assertion callback
				done(directInwardEntrySaveErr);
			});
	});

	it('should not be able to save Direct inward entry instance if no name is provided', function(done) {
		// Invalidate name field
		directInwardEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Direct inward entry
				agent.post('/direct-inward-entries')
					.send(directInwardEntry)
					.expect(400)
					.end(function(directInwardEntrySaveErr, directInwardEntrySaveRes) {
						// Set message assertion
						(directInwardEntrySaveRes.body.message).should.match('Please fill Direct inward entry name');
						
						// Handle Direct inward entry save error
						done(directInwardEntrySaveErr);
					});
			});
	});

	it('should be able to update Direct inward entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Direct inward entry
				agent.post('/direct-inward-entries')
					.send(directInwardEntry)
					.expect(200)
					.end(function(directInwardEntrySaveErr, directInwardEntrySaveRes) {
						// Handle Direct inward entry save error
						if (directInwardEntrySaveErr) done(directInwardEntrySaveErr);

						// Update Direct inward entry name
						directInwardEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Direct inward entry
						agent.put('/direct-inward-entries/' + directInwardEntrySaveRes.body._id)
							.send(directInwardEntry)
							.expect(200)
							.end(function(directInwardEntryUpdateErr, directInwardEntryUpdateRes) {
								// Handle Direct inward entry update error
								if (directInwardEntryUpdateErr) done(directInwardEntryUpdateErr);

								// Set assertions
								(directInwardEntryUpdateRes.body._id).should.equal(directInwardEntrySaveRes.body._id);
								(directInwardEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Direct inward entries if not signed in', function(done) {
		// Create new Direct inward entry model instance
		var directInwardEntryObj = new DirectInwardEntry(directInwardEntry);

		// Save the Direct inward entry
		directInwardEntryObj.save(function() {
			// Request Direct inward entries
			request(app).get('/direct-inward-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Direct inward entry if not signed in', function(done) {
		// Create new Direct inward entry model instance
		var directInwardEntryObj = new DirectInwardEntry(directInwardEntry);

		// Save the Direct inward entry
		directInwardEntryObj.save(function() {
			request(app).get('/direct-inward-entries/' + directInwardEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', directInwardEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Direct inward entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Direct inward entry
				agent.post('/direct-inward-entries')
					.send(directInwardEntry)
					.expect(200)
					.end(function(directInwardEntrySaveErr, directInwardEntrySaveRes) {
						// Handle Direct inward entry save error
						if (directInwardEntrySaveErr) done(directInwardEntrySaveErr);

						// Delete existing Direct inward entry
						agent.delete('/direct-inward-entries/' + directInwardEntrySaveRes.body._id)
							.send(directInwardEntry)
							.expect(200)
							.end(function(directInwardEntryDeleteErr, directInwardEntryDeleteRes) {
								// Handle Direct inward entry error error
								if (directInwardEntryDeleteErr) done(directInwardEntryDeleteErr);

								// Set assertions
								(directInwardEntryDeleteRes.body._id).should.equal(directInwardEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Direct inward entry instance if not signed in', function(done) {
		// Set Direct inward entry user 
		directInwardEntry.user = user;

		// Create new Direct inward entry model instance
		var directInwardEntryObj = new DirectInwardEntry(directInwardEntry);

		// Save the Direct inward entry
		directInwardEntryObj.save(function() {
			// Try deleting Direct inward entry
			request(app).delete('/direct-inward-entries/' + directInwardEntryObj._id)
			.expect(401)
			.end(function(directInwardEntryDeleteErr, directInwardEntryDeleteRes) {
				// Set message assertion
				(directInwardEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Direct inward entry error error
				done(directInwardEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		DirectInwardEntry.remove().exec();
		done();
	});
});