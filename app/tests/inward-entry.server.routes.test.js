'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	InwardEntry = mongoose.model('InwardEntry'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, inwardEntry;

/**
 * Inward entry routes tests
 */
describe('Inward entry CRUD tests', function() {
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

		// Save a user to the test db and create new Inward entry
		user.save(function() {
			inwardEntry = {
				name: 'Inward entry Name'
			};

			done();
		});
	});

	it('should be able to save Inward entry instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Inward entry
				agent.post('/inward-entries')
					.send(inwardEntry)
					.expect(200)
					.end(function(inwardEntrySaveErr, inwardEntrySaveRes) {
						// Handle Inward entry save error
						if (inwardEntrySaveErr) done(inwardEntrySaveErr);

						// Get a list of Inward entries
						agent.get('/inward-entries')
							.end(function(inwardEntriesGetErr, inwardEntriesGetRes) {
								// Handle Inward entry save error
								if (inwardEntriesGetErr) done(inwardEntriesGetErr);

								// Get Inward entries list
								var inwardEntries = inwardEntriesGetRes.body;

								// Set assertions
								(inwardEntries[0].user._id).should.equal(userId);
								(inwardEntries[0].name).should.match('Inward entry Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Inward entry instance if not logged in', function(done) {
		agent.post('/inward-entries')
			.send(inwardEntry)
			.expect(401)
			.end(function(inwardEntrySaveErr, inwardEntrySaveRes) {
				// Call the assertion callback
				done(inwardEntrySaveErr);
			});
	});

	it('should not be able to save Inward entry instance if no name is provided', function(done) {
		// Invalidate name field
		inwardEntry.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Inward entry
				agent.post('/inward-entries')
					.send(inwardEntry)
					.expect(400)
					.end(function(inwardEntrySaveErr, inwardEntrySaveRes) {
						// Set message assertion
						(inwardEntrySaveRes.body.message).should.match('Please fill Inward entry name');
						
						// Handle Inward entry save error
						done(inwardEntrySaveErr);
					});
			});
	});

	it('should be able to update Inward entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Inward entry
				agent.post('/inward-entries')
					.send(inwardEntry)
					.expect(200)
					.end(function(inwardEntrySaveErr, inwardEntrySaveRes) {
						// Handle Inward entry save error
						if (inwardEntrySaveErr) done(inwardEntrySaveErr);

						// Update Inward entry name
						inwardEntry.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Inward entry
						agent.put('/inward-entries/' + inwardEntrySaveRes.body._id)
							.send(inwardEntry)
							.expect(200)
							.end(function(inwardEntryUpdateErr, inwardEntryUpdateRes) {
								// Handle Inward entry update error
								if (inwardEntryUpdateErr) done(inwardEntryUpdateErr);

								// Set assertions
								(inwardEntryUpdateRes.body._id).should.equal(inwardEntrySaveRes.body._id);
								(inwardEntryUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Inward entries if not signed in', function(done) {
		// Create new Inward entry model instance
		var inwardEntryObj = new InwardEntry(inwardEntry);

		// Save the Inward entry
		inwardEntryObj.save(function() {
			// Request Inward entries
			request(app).get('/inward-entries')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Inward entry if not signed in', function(done) {
		// Create new Inward entry model instance
		var inwardEntryObj = new InwardEntry(inwardEntry);

		// Save the Inward entry
		inwardEntryObj.save(function() {
			request(app).get('/inward-entries/' + inwardEntryObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', inwardEntry.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Inward entry instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Inward entry
				agent.post('/inward-entries')
					.send(inwardEntry)
					.expect(200)
					.end(function(inwardEntrySaveErr, inwardEntrySaveRes) {
						// Handle Inward entry save error
						if (inwardEntrySaveErr) done(inwardEntrySaveErr);

						// Delete existing Inward entry
						agent.delete('/inward-entries/' + inwardEntrySaveRes.body._id)
							.send(inwardEntry)
							.expect(200)
							.end(function(inwardEntryDeleteErr, inwardEntryDeleteRes) {
								// Handle Inward entry error error
								if (inwardEntryDeleteErr) done(inwardEntryDeleteErr);

								// Set assertions
								(inwardEntryDeleteRes.body._id).should.equal(inwardEntrySaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Inward entry instance if not signed in', function(done) {
		// Set Inward entry user 
		inwardEntry.user = user;

		// Create new Inward entry model instance
		var inwardEntryObj = new InwardEntry(inwardEntry);

		// Save the Inward entry
		inwardEntryObj.save(function() {
			// Try deleting Inward entry
			request(app).delete('/inward-entries/' + inwardEntryObj._id)
			.expect(401)
			.end(function(inwardEntryDeleteErr, inwardEntryDeleteRes) {
				// Set message assertion
				(inwardEntryDeleteRes.body.message).should.match('User is not logged in');

				// Handle Inward entry error error
				done(inwardEntryDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		InwardEntry.remove().exec();
		done();
	});
});